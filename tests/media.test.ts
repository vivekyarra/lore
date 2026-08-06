import { describe, expect, it } from "vitest";
import { createDemoState } from "@/lib/demo";
import { generateDemoSource, probeMedia, renderCallback } from "@/lib/media";

describe("callback media pipeline", () => {
  it("renders and validates a deterministic 1920x1080 callback MP4", async () => {
    const state = createDemoState(); const source = await generateDemoSource();
    const render = await renderCallback({ sourcePath: source.path, startMs: 8400, endMs: 18100, comments: state.video!.comments.filter((comment) => comment.selected), titleCard: "Seven days later…", anonymized: true });
    expect(render.status).toBe("COMPLETED"); expect(render.outputPath).toBeTruthy();
    const probe = await probeMedia(render.outputPath!); expect(probe.width).toBe(1920); expect(probe.height).toBe(1080); expect(probe.durationSeconds).toBeGreaterThanOrEqual(8); expect(probe.durationSeconds).toBeLessThanOrEqual(12);
  });
});
