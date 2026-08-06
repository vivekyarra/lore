import type { LoreState, TranscriptSegment } from "./types";

export const DEMO_TRANSCRIPT: TranscriptSegment[] = [
  { id: "seg-1", startMs: 0, endMs: 7800, text: "This is a five hundred rupee microphone, and today is day one." },
  { id: "seg-2", startMs: 8400, endMs: 18100, text: "I'm going to use it for every recording for the next seven days. After that, I'll come back and tell you whether it is actually worth buying." },
  { id: "seg-3", startMs: 18100, endMs: 26000, text: "For now, let's hear how it sounds in this room." }
];

export function createDemoState(): LoreState {
  return {
    version: 1,
    mode: "demo",
    connected: true,
    channel: { id: "UC_LORE_CONTROLLED_DEMO", title: "Lore Controlled Channel", thumbnailUrl: null },
    encryptedRefreshToken: null,
    grantedScope: null,
    video: {
      id: "video-demo-1",
      youtubeVideoId: "LORE_DEMO_VIDEO",
      title: "I Tested a ₹500 Microphone for Seven Days — Day 1",
      channelId: "UC_LORE_CONTROLLED_DEMO",
      publishedAt: "2026-08-06T08:00:00.000Z",
      durationMs: 26000,
      thumbnailUrl: null,
      transcriptSource: "fixture",
      transcript: DEMO_TRANSCRIPT,
      comments: [
        { id: "comment-1", youtubeCommentId: "DEMO_COMMENT_1", author: "@curiouscreator", text: "How did the microphone perform after seven days?", publishedAt: "2026-08-07T08:00:00.000Z", existingReplies: [], matchDecision: "follow_up_request", matchReason: "Directly asks for the promised seven-day outcome.", selected: true, consented: true },
        { id: "comment-2", youtubeCommentId: "DEMO_COMMENT_2", author: "@soundcheck", text: "Are you still making the update?", publishedAt: "2026-08-07T09:00:00.000Z", existingReplies: [], matchDecision: "follow_up_request", matchReason: "Asks whether the promised update is still being made.", selected: true, consented: true },
        { id: "comment-3", youtubeCommentId: "DEMO_COMMENT_3", author: "@parttwo", text: "Please make part two. Did it survive?", publishedAt: "2026-08-07T10:00:00.000Z", existingReplies: [], matchDecision: "follow_up_request", matchReason: "Requests a continuation and asks for the experiment result.", selected: true, consented: true },
        { id: "comment-4", youtubeCommentId: "DEMO_COMMENT_4", author: "@studiofriend", text: "Nice lighting setup.", publishedAt: "2026-08-07T11:00:00.000Z", existingReplies: [], matchDecision: "unrelated", matchReason: "Praise unrelated to the microphone outcome or follow-up.", selected: false, consented: true }
      ],
      candidate: {
        id: "candidate-demo-1",
        title: "Seven-day microphone test",
        quote: "I'm going to use it for every recording for the next seven days. After that, I'll come back and tell you whether it is actually worth buying.",
        startMs: 8400,
        endMs: 18100,
        candidateType: "experiment",
        subject: "₹500 microphone seven-day test",
        condition: "after seven days",
        explanation: "The creator explicitly states a test interval and commits to returning with a buying verdict.",
        evidenceValidated: true
      }
    },
    story: { id: "story-demo-1", status: "PROPOSED", confirmedAt: null, followUpUrl: null, followUpVideoId: null, closedAt: null },
    render: null,
    replies: [],
    audit: [{ at: new Date().toISOString(), event: "DEMO_FIXTURE_LOADED", entityId: "story-demo-1", metadata: { disclosure: "controlled test data" } }]
  };
}
