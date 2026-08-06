import { fail, ok } from "@/lib/http";
import { publicState, resetDemoState } from "@/lib/store";
export async function POST() { try { return ok(publicState(await resetDemoState())); } catch (error) { return fail(error, 500); } }
