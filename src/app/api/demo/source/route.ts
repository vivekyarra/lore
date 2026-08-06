import { fail, ok } from "@/lib/http";
import { generateDemoSource } from "@/lib/media";
import { updateState } from "@/lib/store";
export async function POST() { try { const asset = await generateDemoSource(); await updateState((draft) => { if (!draft.story || draft.story.status !== "CONFIRMED") throw new Error("Confirm the story first."); draft.audit.push({ at: new Date().toISOString(), event: "DEMO_SOURCE_PREPARED", entityId: asset.assetId, metadata: asset.probe }); }); return ok(asset); } catch (error) { return fail(error); } }
