import { fail, ok } from "@/lib/http";
import { publicState, updateState } from "@/lib/store";
export async function POST() { try { const state = await updateState((draft) => { if (!draft.story || draft.story.status !== "PROPOSED") throw new Error("Only a proposed story can be rejected."); draft.story.status = "REJECTED"; draft.audit.push({ at: new Date().toISOString(), event: "STORY_REJECTED", entityId: draft.story.id }); }); return ok(publicState(state)); } catch (error) { return fail(error); } }
