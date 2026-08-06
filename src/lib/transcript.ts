import { z } from "zod";
import type { Candidate, LoreComment, TranscriptSegment } from "./types";

const cueTime = /(?:(\d{1,2}):)?(\d{2}):(\d{2})[,.](\d{3})/;

function toMs(value: string): number {
  const match = value.match(cueTime);
  if (!match) throw new Error(`Invalid caption timestamp: ${value}`);
  return (Number(match[1] ?? 0) * 3600 + Number(match[2]) * 60 + Number(match[3])) * 1000 + Number(match[4]);
}

export function parseCaption(input: string): TranscriptSegment[] {
  const normalized = input.replace(/^WEBVTT[^\n]*\n/i, "").replace(/\r/g, "").trim();
  const blocks = normalized.split(/\n{2,}/);
  const segments: TranscriptSegment[] = [];
  for (const block of blocks) {
    const lines = block.split("\n").filter(Boolean);
    const timingIndex = lines.findIndex((line) => line.includes("-->"));
    if (timingIndex < 0) continue;
    const [start, endWithSettings] = lines[timingIndex].split("-->").map((part) => part.trim());
    const end = endWithSettings.split(/\s+/)[0];
    const text = lines.slice(timingIndex + 1).join(" ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!text) continue;
    segments.push({ id: `segment-${segments.length + 1}`, startMs: toMs(start), endMs: toMs(end), text });
  }
  if (!segments.length) throw new Error("No timestamped caption cues were found.");
  return segments;
}

const CandidateSchema = z.object({
  id: z.string(), title: z.string(), quote: z.string(), startMs: z.number().int().nonnegative(), endMs: z.number().int().positive(),
  candidateType: z.enum(["promise", "experiment", "challenge", "intended_follow_up"]), subject: z.string(), condition: z.string().nullable(), explanation: z.string(), evidenceValidated: z.boolean()
});

export function validateCandidate(candidate: Candidate, segments: TranscriptSegment[]): Candidate {
  const parsed = CandidateSchema.parse(candidate);
  const source = segments.filter((segment) => segment.endMs >= parsed.startMs && segment.startMs <= parsed.endMs).map((segment) => segment.text).join(" ");
  const normalize = (text: string) => text.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9₹' ]/g, " ").replace(/\s+/g, " ").trim();
  if (!normalize(source).includes(normalize(parsed.quote))) throw new Error("Candidate quote does not match the timestamped transcript evidence.");
  return { ...parsed, evidenceValidated: true };
}

export function detectCandidate(segments: TranscriptSegment[]): Candidate | null {
  const explicit = /(i(?:'|’)m going to|i will|i'll|we will|we'll).*(come back|report back|update|part two|tell you|return)/i;
  const segment = segments.find((item) => explicit.test(item.text));
  if (!segment) return null;
  const interval = segment.text.match(/(?:next |after )(\w+[ -](?:day|week|month|year)s?|\w+ (?:day|week|month|year)s?)/i)?.[1] ?? null;
  return validateCandidate({ id: `candidate-${crypto.randomUUID()}`, title: interval ? `${interval.replace(/^./, c => c.toUpperCase())} follow-up` : "Creator-promised follow-up", quote: segment.text, startMs: segment.startMs, endMs: segment.endMs, candidateType: /test|use it|experiment/i.test(segment.text) ? "experiment" : "promise", subject: segment.text.slice(0, 100), condition: interval, explanation: "The transcript contains an explicit future action and a commitment to return with an outcome.", evidenceValidated: false }, segments);
}

export function classifyComment(text: string, candidate: Candidate): Pick<LoreComment, "matchDecision" | "matchReason"> {
  const normalized = text.toLowerCase();
  const request = /\?|update|part\s*(?:2|two)|follow.?up|what happened|did it|how did|still making|result|survive|come back/;
  const topicTerms = candidate.subject.toLowerCase().split(/\W+/).filter((term) => term.length > 4);
  const topical = topicTerms.some((term) => normalized.includes(term)) || /microphone|seven days|worth|it survive/i.test(text);
  if (request.test(normalized) && topical) return { matchDecision: "follow_up_request", matchReason: "Requests the result or continuation of the cited story." };
  if (topical) return { matchDecision: "related_but_not_request", matchReason: "Mentions the subject but does not ask for its outcome or continuation." };
  return { matchDecision: "unrelated", matchReason: "Does not refer to the cited subject or request a follow-up." };
}
