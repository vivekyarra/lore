export type StoryStatus = "PROPOSED" | "REJECTED" | "CONFIRMED" | "RENDERED" | "PUBLISHED" | "CLOSED";
export type JobStatus = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";

export type TranscriptSegment = {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
};

export type LoreComment = {
  id: string;
  youtubeCommentId: string;
  author: string;
  text: string;
  publishedAt: string;
  existingReplies: string[];
  matchDecision: "follow_up_request" | "related_but_not_request" | "unrelated";
  matchReason: string;
  selected: boolean;
  consented: boolean;
};

export type Candidate = {
  id: string;
  title: string;
  quote: string;
  startMs: number;
  endMs: number;
  candidateType: "promise" | "experiment" | "challenge" | "intended_follow_up";
  subject: string;
  condition: string | null;
  explanation: string;
  evidenceValidated: boolean;
};

export type VideoRecord = {
  id: string;
  youtubeVideoId: string;
  title: string;
  channelId: string;
  publishedAt: string;
  durationMs: number;
  thumbnailUrl: string | null;
  transcriptSource: "youtube_caption" | "uploaded_vtt" | "uploaded_srt" | "fixture";
  transcript: TranscriptSegment[];
  comments: LoreComment[];
  candidate: Candidate | null;
};

export type RenderRecord = {
  id: string;
  status: JobStatus;
  sourcePath: string;
  outputPath: string | null;
  posterPath: string | null;
  fingerprint: string;
  titleCard: string;
  anonymized: boolean;
  durationSeconds: number | null;
  validation: Record<string, string | number | boolean> | null;
  error: string | null;
  createdAt: string;
  completedAt: string | null;
};

export type ReplyRecord = {
  id: string;
  commentId: string;
  draftText: string;
  status: "PENDING" | "POSTED" | "FAILED" | "SIMULATED";
  youtubeReplyId: string | null;
  error: string | null;
};

export type LoreState = {
  version: 1;
  mode: "demo" | "live";
  connected: boolean;
  channel: { id: string; title: string; thumbnailUrl: string | null } | null;
  encryptedRefreshToken: string | null;
  grantedScope: string | null;
  video: VideoRecord | null;
  story: {
    id: string;
    status: StoryStatus;
    confirmedAt: string | null;
    followUpUrl: string | null;
    followUpVideoId: string | null;
    closedAt: string | null;
  } | null;
  render: RenderRecord | null;
  replies: ReplyRecord[];
  audit: Array<{ at: string; event: string; entityId: string; metadata?: Record<string, unknown> }>;
};
