import { fail, ok } from "@/lib/http";
import { publicState, updateState } from "@/lib/store";
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; const body = await request.json() as { selected?: boolean };
    const state = await updateState((draft) => { const comment = draft.video?.comments.find((item) => item.id === id); if (!comment) throw new Error("Comment not found."); if (comment.matchDecision !== "follow_up_request") throw new Error("Only verified follow-up requests can be selected."); comment.selected = Boolean(body.selected); if ((draft.video?.comments.filter((item) => item.selected).length ?? 0) > 3) throw new Error("LORE v1 supports a maximum of three comment cards."); });
    return ok(publicState(state));
  } catch (error) { return fail(error); }
}
