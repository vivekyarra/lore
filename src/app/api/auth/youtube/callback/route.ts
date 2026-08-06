import { NextRequest, NextResponse } from "next/server";
import { fail } from "@/lib/http";
import { updateState } from "@/lib/store";
import { encryptToken, exchangeAuthorizationCode, YOUTUBE_SCOPE } from "@/lib/youtube";
export async function GET(request: NextRequest) {
  try { const code = request.nextUrl.searchParams.get("code"); const state = request.nextUrl.searchParams.get("state"); const expected = request.cookies.get("lore_oauth_state")?.value; if (!code || !state || !expected || state !== expected) throw new Error("OAuth state validation failed."); const result = await exchangeAuthorizationCode(code); if (!result.tokens.refresh_token) throw new Error("Google did not return a refresh token. Revoke prior consent and reconnect."); await updateState((draft) => { draft.mode = "live"; draft.connected = true; draft.channel = result.channel; draft.encryptedRefreshToken = encryptToken(result.tokens.refresh_token!); draft.grantedScope = result.tokens.scope ?? YOUTUBE_SCOPE; draft.video = null; draft.story = null; draft.render = null; draft.replies = []; draft.audit.push({ at: new Date().toISOString(), event: "CHANNEL_CONNECTED", entityId: result.channel.id }); }); const response = NextResponse.redirect(new URL("/", request.url)); response.cookies.delete("lore_oauth_state"); return response; } catch (error) { return fail(error); }
}
