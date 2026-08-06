import { readFile } from "node:fs/promises";
import { fail } from "@/lib/http";
import { generateDemoSource } from "@/lib/media";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const source = await generateDemoSource();
    return new Response(new Uint8Array(await readFile(source.path)), {
      headers: {
        "Content-Type": "video/mp4",
        "Cache-Control": "private, max-age=3600",
        "Accept-Ranges": "bytes"
      }
    });
  } catch (error) {
    return fail(error, 404);
  }
}
