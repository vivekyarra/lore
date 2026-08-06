import { z } from "zod";
import { fail, ok } from "@/lib/http";
import { publicState, readState, updateState } from "@/lib/store";
import { importOwnedVideo } from "@/lib/youtube";
const schema = z.object({ url: z.string().min(1) });
export async function POST(request: Request) { try { const { url } = schema.parse(await request.json()); const current = await readState(); if (current.mode !== "live" || !current.encryptedRefreshToken || !current.channel) throw new Error("Connect a YouTube channel first."); const video = await importOwnedVideo(current.encryptedRefreshToken, current.channel.id, url); const state = await updateState((draft) => { draft.video = { ...video, transcriptSource: "uploaded_vtt", transcript: [], comments: [], candidate: null }; draft.story = null; draft.render = null; draft.replies = []; draft.audit.push({ at: new Date().toISOString(), event: "VIDEO_IMPORTED", entityId: video.youtubeVideoId }); }); return ok(publicState(state)); } catch (error) { return fail(error); } }
