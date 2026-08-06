import crypto from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import type { LoreComment, RenderRecord } from "./types";

const storageRoot = path.join(process.cwd(), "storage");
export const uploadRoot = path.join(storageRoot, "uploads");
export const renderRoot = path.join(storageRoot, "renders");

async function run(program: string, args: string[], timeoutMs = 120_000): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(program, args, { windowsHide: true, shell: false });
    let stdout = ""; let stderr = "";
    const timer = setTimeout(() => { child.kill("SIGKILL"); reject(new Error(`${program} exceeded its time limit.`)); }, timeoutMs);
    child.stdout.on("data", (chunk) => { stdout += String(chunk); });
    child.stderr.on("data", (chunk) => { stderr += String(chunk); });
    child.on("error", (error) => { clearTimeout(timer); reject(error); });
    child.on("close", (code) => { clearTimeout(timer); code === 0 ? resolve({ stdout, stderr }) : reject(new Error(`${program} failed (${code}): ${stderr.slice(-1200)}`)); });
  });
}

export async function probeMedia(filePath: string) {
  const { stdout } = await run("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", filePath], 30_000);
  const probe = JSON.parse(stdout) as { streams?: Array<{ codec_type?: string; codec_name?: string; width?: number; height?: number; avg_frame_rate?: string }>; format?: { duration?: string; size?: string; format_name?: string } };
  const video = probe.streams?.find((stream) => stream.codec_type === "video");
  const audio = probe.streams?.find((stream) => stream.codec_type === "audio");
  if (!video || !audio) throw new Error("Source media must contain one video stream and one audio stream.");
  return { durationSeconds: Number(probe.format?.duration ?? 0), size: Number(probe.format?.size ?? 0), format: probe.format?.format_name ?? "unknown", videoCodec: video.codec_name ?? "unknown", audioCodec: audio.codec_name ?? "unknown", width: video.width ?? 0, height: video.height ?? 0, frameRate: video.avg_frame_rate ?? "unknown" };
}

export async function generateDemoSource(): Promise<{ assetId: string; extension: ".mp4"; path: string; probe: Awaited<ReturnType<typeof probeMedia>> }> {
  await mkdir(uploadRoot, { recursive: true });
  const assetId = "00000000-0000-4000-8000-000000000002";
  const target = path.join(uploadRoot, `${assetId}.mp4`);
  try {
    const probe = await probeMedia(target);
    return { assetId, extension: ".mp4", path: target, probe };
  } catch {
    await run("ffmpeg", ["-y", "-f", "lavfi", "-i", "testsrc2=size=1280x720:rate=30:duration=26", "-f", "lavfi", "-i", "sine=frequency=220:sample_rate=48000:duration=26", "-vf", "drawbox=x=0:y=0:w=iw:h=ih:color=0x201a14@0.35:t=fill,drawtext=fontfile='" + fontPath() + "':text='Lore controlled creator source':fontcolor=0xf0c982:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest", target], 120_000);
    return { assetId, extension: ".mp4", path: target, probe: await probeMedia(target) };
  }
}

function escapeDrawText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\\'").replace(/%/g, "\\%").replace(/\n/g, " ").slice(0, 110);
}

function fontPath(): string {
  const candidate = process.env.LORE_FONT_PATH ?? (process.platform === "win32" ? "C:/Windows/Fonts/segoeui.ttf" : "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf");
  return candidate.replace(/:/g, "\\:");
}

export async function renderCallback(input: { sourcePath: string; startMs: number; endMs: number; comments: LoreComment[]; titleCard: string; anonymized: boolean }): Promise<RenderRecord> {
  await mkdir(renderRoot, { recursive: true });
  const sourceProbe = await probeMedia(input.sourcePath);
  if (input.endMs / 1000 > sourceProbe.durationSeconds + 0.25) throw new Error("The selected source timestamp is outside the uploaded file duration.");
  const selected = input.comments.slice(0, 3);
  if (!selected.length) throw new Error("Select at least one relevant comment before rendering.");
  const fingerprint = crypto.createHash("sha256").update(JSON.stringify({ hash: crypto.createHash("sha256").update(await readFile(input.sourcePath)).digest("hex"), startMs: input.startMs, endMs: input.endMs, comments: selected.map((comment) => [comment.id, comment.text]), title: input.titleCard, anonymized: input.anonymized, template: "lore-v1" })).digest("hex");
  const id = `render-${fingerprint.slice(0, 16)}`;
  const outputPath = path.join(renderRoot, `${id}.mp4`);
  const posterPath = path.join(renderRoot, `${id}.jpg`);
  const font = fontPath();
  const sourceDuration = Math.min(4, (input.endMs - input.startMs) / 1000);
  const filters = [
    `[0:v]trim=start=${input.startMs / 1000}:duration=${sourceDuration},setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2[clip]`,
    `[1:v][clip]overlay=enable='between(t,0,${sourceDuration})'[base]`,
    ...selected.map((comment, index) => {
      const y = 560 + index * 118;
      const label = input.anonymized ? `Viewer ${index + 1}` : comment.author;
      return `[${index === 0 ? "base" : `card${index}`}]drawbox=x=190:y=${y}:w=1540:h=92:color=0x1f1c18@0.94:t=fill:enable='between(t,3.2,7.2)',drawtext=fontfile='${font}':text='${escapeDrawText(label)}  ${escapeDrawText(comment.text)}':fontcolor=white:fontsize=34:x=230:y=${y + 25}:enable='between(t,3.2,7.2)'[card${index + 1}]`;
    }),
    `[card${selected.length}]drawbox=x=0:y=0:w=1920:h=1080:color=0x11100f@1:t=fill:enable='between(t,7.2,10)',drawtext=fontfile='${font}':text='${escapeDrawText(input.titleCard)}':fontcolor=0xf0c982:fontsize=84:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,7.2,9.5)'[vout]`,
    `[0:a]atrim=start=${input.startMs / 1000}:duration=${sourceDuration},asetpts=PTS-STARTPTS,loudnorm,apad=pad_dur=${10 - sourceDuration},atrim=duration=10[aout]`
  ].join(";");
  await run("ffmpeg", ["-y", "-i", input.sourcePath, "-f", "lavfi", "-i", "color=c=0x11100f:s=1920x1080:r=30:d=10", "-filter_complex", filters, "-map", "[vout]", "-map", "[aout]", "-c:v", "libx264", "-profile:v", "high", "-preset", "medium", "-crf", "18", "-r", "30", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", outputPath], 180_000);
  await run("ffmpeg", ["-y", "-ss", "8", "-i", outputPath, "-frames:v", "1", "-q:v", "2", posterPath], 30_000);
  const validation = await probeMedia(outputPath);
  if (validation.durationSeconds < 8 || validation.durationSeconds > 12 || validation.width !== 1920 || validation.height !== 1080) throw new Error("Rendered output failed duration or dimension validation.");
  return { id, status: "COMPLETED", sourcePath: input.sourcePath, outputPath, posterPath, fingerprint, titleCard: input.titleCard, anonymized: input.anonymized, durationSeconds: validation.durationSeconds, validation: { ...validation, hasVideo: true, hasAudio: true }, error: null, createdAt: new Date().toISOString(), completedAt: new Date().toISOString() };
}
