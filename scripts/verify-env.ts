import { spawnSync } from "node:child_process";
const requiredLive = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REDIRECT_URI", "TOKEN_ENCRYPTION_KEY"];
const media = ["ffmpeg", "ffprobe"].map((program) => ({ program, available: spawnSync(program, ["-version"], { windowsHide: true }).status === 0 }));
const liveMissing = requiredLive.filter((name) => !process.env[name]);
console.log(JSON.stringify({ controlledDemoReady: media.every((item) => item.available), media, liveYouTubeReady: liveMissing.length === 0, liveMissing }, null, 2));
if (!media.every((item) => item.available)) process.exitCode = 1;
