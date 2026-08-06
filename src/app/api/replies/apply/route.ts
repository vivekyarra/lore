import { z } from "zod";
import { fail, ok } from "@/lib/http";
import { publicState, readState, updateState } from "@/lib/store";
import { postReply } from "@/lib/youtube";
const schema = z.object({ replies: z.array(z.object({ id: z.string(), draftText: z.string().min(5).max(500), approved: z.boolean() })).max(3) });
export async function POST(request: Request) {
  try {
    const { replies } = schema.parse(await request.json()); const state = await readState();
    if (!state.story || state.story.status !== "PUBLISHED") throw new Error("Attach the follow-up before applying replies.");
    for (const requested of replies.filter((item) => item.approved)) {
      const operation = state.replies.find((item) => item.id === requested.id); const comment = state.video?.comments.find((item) => item.id === operation?.commentId);
      if (!operation || !comment || operation.status !== "PENDING") continue;
      operation.draftText = requested.draftText;
      try {
        if (state.mode === "live") { if (!state.encryptedRefreshToken) throw new Error("YouTube authorization is unavailable."); operation.youtubeReplyId = await postReply(state.encryptedRefreshToken, comment.youtubeCommentId, operation.draftText); operation.status = "POSTED"; }
        else { operation.youtubeReplyId = `SIMULATED_${comment.youtubeCommentId}`; operation.status = "SIMULATED"; }
      } catch (error) { operation.status = "FAILED"; operation.error = error instanceof Error ? error.message : "Reply failed"; }
    }
    state.audit.push({ at: new Date().toISOString(), event: "REPLIES_APPLIED", entityId: state.story.id, metadata: { posted: state.replies.filter((reply) => reply.status === "POSTED").length, simulated: state.replies.filter((reply) => reply.status === "SIMULATED").length, failed: state.replies.filter((reply) => reply.status === "FAILED").length } });
    await updateState(() => state); return ok(publicState(state));
  } catch (error) { return fail(error); }
}
