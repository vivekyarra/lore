import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { fail } from "@/lib/http";
import { createAuthorizationUrl } from "@/lib/youtube";
export async function GET() { try { const state = crypto.randomBytes(24).toString("base64url"); const response = NextResponse.redirect(createAuthorizationUrl(state)); response.cookies.set("lore_oauth_state", state, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 600, path: "/" }); return response; } catch (error) { return fail(error, 503); } }
