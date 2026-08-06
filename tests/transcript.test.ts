import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { classifyComment, detectCandidate, parseCaption, validateCandidate } from "@/lib/transcript";

describe("evidence-first analysis", () => {
  const segments = parseCaption(readFileSync(path.join(process.cwd(), "fixtures/transcripts/microphone.vtt"), "utf8"));
  it("preserves timestamped caption evidence", () => { expect(segments).toHaveLength(3); expect(segments[1].startMs).toBe(8400); expect(segments[1].endMs).toBe(18100); });
  it("detects only an explicit return commitment", () => { const candidate = detectCandidate(segments); expect(candidate?.evidenceValidated).toBe(true); expect(candidate?.quote).toContain("I'll come back"); });
  it("rejects an invented quote", () => { const valid = detectCandidate(segments)!; expect(() => validateCandidate({ ...valid, quote: "I guarantee this microphone is perfect." }, segments)).toThrow(/does not match/); });
  it("separates follow-up demand from generic praise", () => { const candidate = detectCandidate(segments)!; expect(classifyComment("How did the microphone perform after seven days?", candidate).matchDecision).toBe("follow_up_request"); expect(classifyComment("Nice lighting setup.", candidate).matchDecision).toBe("unrelated"); });
});
