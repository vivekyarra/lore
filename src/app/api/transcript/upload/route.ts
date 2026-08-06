import { fail, ok } from "@/lib/http";
import { parseCaption } from "@/lib/transcript";
import { publicState, updateState } from "@/lib/store";
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("transcript");
    if (!(file instanceof File) || file.size > 2_000_000) throw new Error("Upload a VTT or SRT transcript smaller than 2 MB.");
    const lower = file.name.toLowerCase();
    if (!lower.endsWith(".vtt") && !lower.endsWith(".srt")) throw new Error("Only VTT and SRT transcripts are accepted.");
    const segments = parseCaption(await file.text());
    const state = await updateState((draft) => { if (!draft.video) throw new Error("Import a video first."); draft.video.transcript = segments; draft.video.transcriptSource = lower.endsWith(".vtt") ? "uploaded_vtt" : "uploaded_srt"; draft.video.candidate = null; draft.story = null; draft.audit.push({ at: new Date().toISOString(), event: "TRANSCRIPT_UPLOADED", entityId: draft.video.id, metadata: { cueCount: segments.length } }); });
    return ok(publicState(state));
  } catch (error) { return fail(error); }
}
