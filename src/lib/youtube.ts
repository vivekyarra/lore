import crypto from "node:crypto";
import { google } from "googleapis";
import type { LoreComment, TranscriptSegment, VideoRecord } from "./types";
import { classifyComment, parseCaption } from "./transcript";
import type { Candidate } from "./types";

export const YOUTUBE_SCOPE = "https://www.googleapis.com/auth/youtube.force-ssl";

function oauthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirect = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirect) throw new Error("Google OAuth is not configured. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI.");
  return new google.auth.OAuth2(clientId, clientSecret, redirect);
}

export function createAuthorizationUrl(state: string): string {
  return oauthClient().generateAuthUrl({ access_type: "offline", prompt: "consent", scope: [YOUTUBE_SCOPE], state, include_granted_scopes: false });
}

export async function exchangeAuthorizationCode(code: string) {
  const client = oauthClient();
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
  const youtube = google.youtube({ version: "v3", auth: client });
  const channelResponse = await youtube.channels.list({ part: ["snippet", "contentDetails"], mine: true });
  const channel = channelResponse.data.items?.[0];
  if (!channel?.id) throw new Error("No creator-owned YouTube channel was returned for this account.");
  return { tokens, channel: { id: channel.id, title: channel.snippet?.title ?? "YouTube channel", thumbnailUrl: channel.snippet?.thumbnails?.default?.url ?? null } };
}

function encryptionKey(): Buffer {
  const source = process.env.TOKEN_ENCRYPTION_KEY;
  if (!source || source.length < 32) throw new Error("TOKEN_ENCRYPTION_KEY must contain at least 32 characters.");
  return crypto.createHash("sha256").update(source).digest();
}

export function encryptToken(token: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  return [iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), encrypted.toString("base64url")].join(".");
}

export function decryptToken(payload: string): string {
  const [iv, tag, data] = payload.split(".");
  if (!iv || !tag || !data) throw new Error("Stored OAuth credential is malformed.");
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(data, "base64url")), decipher.final()]).toString("utf8");
}

function authorizedYoutube(encryptedRefreshToken: string) {
  const auth = oauthClient();
  auth.setCredentials({ refresh_token: decryptToken(encryptedRefreshToken) });
  return google.youtube({ version: "v3", auth });
}

export async function listOwnedVideos(encryptedToken: string, limit = 12) {
  const youtube = authorizedYoutube(encryptedToken);
  const channels = await youtube.channels.list({ part: ["contentDetails"], mine: true });
  const uploads = channels.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error("The connected channel does not expose an uploads playlist.");
  const playlist = await youtube.playlistItems.list({ part: ["snippet", "contentDetails"], playlistId: uploads, maxResults: Math.min(limit, 50) });
  return (playlist.data.items ?? []).flatMap((item) => {
    const id = item.contentDetails?.videoId;
    if (!id) return [];
    return [{
      id,
      title: item.snippet?.title ?? "Untitled video",
      publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? null,
      thumbnailUrl: item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? null
    }];
  });
}

export function parseYouTubeVideoId(value: string): string {
  if (/^[\w-]{11}$/.test(value)) return value;
  const url = new URL(value);
  const id = url.hostname.includes("youtu.be") ? url.pathname.slice(1) : url.searchParams.get("v");
  if (!id || !/^[\w-]{11}$/.test(id)) throw new Error("Enter a valid YouTube video URL or 11-character video ID.");
  return id;
}

function durationToMs(duration: string | null | undefined): number {
  if (!duration) return 0;
  const match = duration.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/);
  if (!match) return 0;
  return Math.round((Number(match[1] ?? 0) * 86400 + Number(match[2] ?? 0) * 3600 + Number(match[3] ?? 0) * 60 + Number(match[4] ?? 0)) * 1000);
}

export async function importOwnedVideo(encryptedToken: string, channelId: string, input: string): Promise<Omit<VideoRecord, "transcript" | "comments" | "candidate" | "transcriptSource">> {
  const youtube = authorizedYoutube(encryptedToken);
  const videoId = parseYouTubeVideoId(input);
  const response = await youtube.videos.list({ part: ["snippet", "contentDetails", "status"], id: [videoId] });
  const video = response.data.items?.[0];
  if (!video?.id || video.snippet?.channelId !== channelId) throw new Error("The selected video does not belong to the authenticated creator channel.");
  return { id: `video-${crypto.randomUUID()}`, youtubeVideoId: video.id, title: video.snippet?.title ?? "Untitled video", channelId, publishedAt: video.snippet?.publishedAt ?? new Date().toISOString(), durationMs: durationToMs(video.contentDetails?.duration), thumbnailUrl: video.snippet?.thumbnails?.medium?.url ?? null };
}

export async function downloadCaption(encryptedToken: string, videoId: string, captionId?: string): Promise<TranscriptSegment[]> {
  const youtube = authorizedYoutube(encryptedToken);
  let selected = captionId;
  if (!selected) {
    const tracks = await youtube.captions.list({ part: ["snippet"], videoId });
    selected = tracks.data.items?.find((track) => track.snippet?.trackKind !== "ASR")?.id ?? tracks.data.items?.[0]?.id ?? undefined;
  }
  if (!selected) throw new Error("No creator-authorized caption track is available. Upload VTT or SRT instead.");
  const response = await youtube.captions.download({ id: selected, tfmt: "vtt" }, { responseType: "text" });
  return parseCaption(String(response.data));
}

export async function importComments(encryptedToken: string, videoId: string, candidate: Candidate, limit = 500): Promise<LoreComment[]> {
  const youtube = authorizedYoutube(encryptedToken);
  const comments: LoreComment[] = [];
  let pageToken: string | undefined;
  do {
    const response = await youtube.commentThreads.list({ part: ["snippet", "replies"], videoId, textFormat: "plainText", maxResults: 100, order: "time", pageToken });
    for (const thread of response.data.items ?? []) {
      const top = thread.snippet?.topLevelComment;
      const snippet = top?.snippet;
      if (!top?.id || !snippet?.textOriginal) continue;
      const classification = classifyComment(snippet.textOriginal, candidate);
      comments.push({ id: `comment-${crypto.randomUUID()}`, youtubeCommentId: top.id, author: snippet.authorDisplayName ?? "Viewer", text: snippet.textOriginal, publishedAt: snippet.publishedAt ?? new Date().toISOString(), existingReplies: (thread.replies?.comments ?? []).map((reply) => reply.snippet?.textOriginal ?? "").filter(Boolean), ...classification, selected: false, consented: false });
      if (comments.length >= limit) break;
    }
    pageToken = response.data.nextPageToken ?? undefined;
  } while (pageToken && comments.length < limit);
  return comments;
}

export async function verifyFollowUp(encryptedToken: string, channelId: string, input: string): Promise<{ videoId: string; url: string }> {
  const video = await importOwnedVideo(encryptedToken, channelId, input);
  return { videoId: video.youtubeVideoId, url: `https://www.youtube.com/watch?v=${video.youtubeVideoId}` };
}

export async function postReply(encryptedToken: string, parentId: string, text: string): Promise<string> {
  const youtube = authorizedYoutube(encryptedToken);
  const response = await youtube.comments.insert({ part: ["snippet"], requestBody: { snippet: { parentId, textOriginal: text } } });
  if (!response.data.id) throw new Error("YouTube did not return a reply ID.");
  return response.data.id;
}
