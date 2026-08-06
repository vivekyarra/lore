import { fail, ok } from "@/lib/http";
import { readState } from "@/lib/store";
import { listOwnedVideos } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const state = await readState();
    if (state.mode !== "live" || !state.encryptedRefreshToken) throw new Error("Connect YouTube first.");
    return ok(await listOwnedVideos(state.encryptedRefreshToken));
  } catch (error) {
    return fail(error);
  }
}
