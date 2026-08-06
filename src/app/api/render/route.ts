import path from "node:path";
import { z } from "zod";
import { fail, ok } from "@/lib/http";
import { renderCallback, uploadRoot } from "@/lib/media";
import { publicState, readState, updateState } from "@/lib/store";
const schema = z.object({ assetId: z.string().uuid(), extension: z.enum([".mp4", ".mov", ".m4v"]), titleCard: z.string().min(2).max(80).default("Seven days later…"), anonymized: z.boolean().default(true) });
export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json()); const state = await readState();
    if (!state.story || state.story.status !== "CONFIRMED" || !state.video?.candidate) throw new Error("A confirmed story is required before rendering.");
    const sourcePath = path.join(uploadRoot, `${input.assetId}${input.extension}`); const comments = state.video.comments.filter((comment) => comment.selected && comment.matchDecision === "follow_up_request");
    const render = await renderCallback({ sourcePath, startMs: state.video.candidate.startMs, endMs: state.video.candidate.endMs, comments, titleCard: input.titleCard, anonymized: input.anonymized });
    const next = await updateState((draft) => { if (!draft.story) throw new Error("Story disappeared during rendering."); draft.render = render; draft.story.status = "RENDERED"; draft.audit.push({ at: new Date().toISOString(), event: "CALLBACK_RENDERED", entityId: render.id, metadata: render.validation ?? undefined }); });
    return ok(publicState(next));
  } catch (error) { return fail(error); }
}
