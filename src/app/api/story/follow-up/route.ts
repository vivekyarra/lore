import { z } from "zod";
import { fail, ok } from "@/lib/http";
import { publicState, readState, updateState } from "@/lib/store";
import { parseYouTubeVideoId, verifyFollowUp } from "@/lib/youtube";
const schema = z.object({ url: z.string().min(1) });
export async function POST(request: Request) {
  try {
    const { url } = schema.parse(await request.json()); const current = await readState();
    if (!current.story || current.story.status !== "RENDERED") throw new Error("A completed callback render is required before attaching the follow-up.");
    const verified = current.mode === "live" && current.encryptedRefreshToken && current.channel ? await verifyFollowUp(current.encryptedRefreshToken, current.channel.id, url) : { videoId: parseYouTubeVideoId(url), url };
    const state = await updateState((draft) => { if (!draft.story) throw new Error("Story not found."); draft.story.followUpUrl = verified.url; draft.story.followUpVideoId = verified.videoId; draft.story.status = "PUBLISHED"; draft.replies = (draft.video?.comments ?? []).filter((comment) => comment.selected).map((comment) => ({ id: `reply-${crypto.randomUUID()}`, commentId: comment.id, draftText: `You asked for the update, and it is finally here: ${verified.url}. Thank you for keeping us accountable.`, status: "PENDING", youtubeReplyId: null, error: null })); draft.audit.push({ at: new Date().toISOString(), event: "FOLLOW_UP_ATTACHED", entityId: verified.videoId, metadata: { verifiedOwnership: draft.mode === "live" } }); });
    return ok(publicState(state));
  } catch (error) { return fail(error); }
}
