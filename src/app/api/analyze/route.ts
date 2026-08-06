import { fail, ok } from "@/lib/http";
import { classifyComment, detectCandidate } from "@/lib/transcript";
import { publicState, updateState } from "@/lib/store";
export async function POST() {
  try {
    const state = await updateState((draft) => {
      if (!draft.video?.transcript.length) throw new Error("A timestamped transcript is required.");
      const candidate = detectCandidate(draft.video.transcript);
      if (!candidate) throw new Error("We could not verify an explicit unfinished story in this transcript.");
      draft.video.candidate = candidate;
      draft.video.comments = draft.video.comments.map((comment) => ({ ...comment, ...classifyComment(comment.text, candidate), selected: false }));
      draft.story = { id: `story-${crypto.randomUUID()}`, status: "PROPOSED", confirmedAt: null, followUpUrl: null, followUpVideoId: null, closedAt: null };
      draft.audit.push({ at: new Date().toISOString(), event: "CANDIDATE_PROPOSED", entityId: candidate.id, metadata: { evidenceValidated: true } });
    });
    return ok(publicState(state));
  } catch (error) { return fail(error); }
}
