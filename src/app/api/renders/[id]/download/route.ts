import { readFile } from "node:fs/promises";
import { fail } from "@/lib/http";
import { readState } from "@/lib/store";
export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  try { const { id } = await context.params; const state = await readState(); if (state.render?.id !== id || !state.render.outputPath) throw new Error("Render not found."); const bytes = await readFile(state.render.outputPath); return new Response(new Uint8Array(bytes), { headers: { "Content-Type": "video/mp4", "Content-Disposition": `attachment; filename="lore-callback-${id}.mp4"`, "Cache-Control": "private, no-store" } }); } catch (error) { return fail(error, 404); }
}
