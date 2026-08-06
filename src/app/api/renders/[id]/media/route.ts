import { readFile } from "node:fs/promises";
import { fail } from "@/lib/http";
import { readState } from "@/lib/store";
export async function GET(_: Request, context: { params: Promise<{ id: string }> }) { try { const { id } = await context.params; const state = await readState(); if (state.render?.id !== id || !state.render.outputPath) throw new Error("Render not found."); return new Response(new Uint8Array(await readFile(state.render.outputPath)), { headers: { "Content-Type": "video/mp4", "Cache-Control": "private, no-store", "Accept-Ranges": "bytes" } }); } catch (error) { return fail(error, 404); } }
