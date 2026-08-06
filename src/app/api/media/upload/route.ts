import crypto from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fail, ok } from "@/lib/http";
import { probeMedia, uploadRoot } from "@/lib/media";
import { updateState } from "@/lib/store";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const form = await request.formData(); const file = form.get("source");
    if (!(file instanceof File) || file.size === 0 || file.size > 500 * 1024 * 1024) throw new Error("Upload source media up to 500 MB.");
    const ext = path.extname(file.name).toLowerCase(); if (!new Set([".mp4", ".mov", ".m4v"]).has(ext)) throw new Error("LORE v1 accepts MP4 or MOV source media.");
    await mkdir(uploadRoot, { recursive: true }); const id = crypto.randomUUID(); const target = path.join(uploadRoot, `${id}${ext}`); await writeFile(target, Buffer.from(await file.arrayBuffer()));
    const probe = await probeMedia(target); if (probe.durationSeconds > 3600) throw new Error("Source media exceeds the one-hour v1 limit.");
    await updateState((draft) => { if (!draft.story || draft.story.status !== "CONFIRMED") throw new Error("Confirm the story before uploading source media."); draft.audit.push({ at: new Date().toISOString(), event: "SOURCE_MEDIA_UPLOADED", entityId: id, metadata: { path: target, ...probe } }); });
    return ok({ assetId: id, path: target, probe });
  } catch (error) { return fail(error); }
}
