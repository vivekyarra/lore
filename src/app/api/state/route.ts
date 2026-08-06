import { fail, ok } from "@/lib/http";
import { publicState, readState } from "@/lib/store";
export const dynamic = "force-dynamic";
export async function GET() { try { return ok(publicState(await readState())); } catch (error) { return fail(error, 500); } }
