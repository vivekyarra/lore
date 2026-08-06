import { fail, ok } from "@/lib/http";
import { publicState, updateState } from "@/lib/store";
export async function POST() { try { const state = await updateState((draft) => { draft.connected = false; draft.channel = null; draft.encryptedRefreshToken = null; draft.grantedScope = null; draft.audit.push({ at: new Date().toISOString(), event: "CHANNEL_DISCONNECTED", entityId: "local" }); }); return ok(publicState(state)); } catch (error) { return fail(error); } }
