# Lore — The continuity editor for YouTube

> YouTube gives creators analytics. Lore gives their channel a memory.

Lore recovers one explicit unfinished story from a creator-owned video, cites the exact transcript moment, connects it to selected viewer follow-up requests, renders a real callback MP4 from creator-supplied media, and helps the creator return to the original threads after publishing the follow-up.

## What works

- Google OAuth with the minimum `youtube.force-ssl` scope, encrypted refresh credentials, state validation, and disconnect.
- Creator-owned video import and follow-up ownership verification through the official YouTube Data API.
- Creator-authorized caption download plus VTT/SRT upload fallback.
- Timestamped transcript parsing, deterministic explicit-promise detection, and exact quote validation.
- Official comment pagination, high-precision follow-up classification, irrelevant-comment rejection, and maximum-three selection.
- Creator confirmation as the factual boundary.
- Private MP4/MOV upload, ffprobe validation, fixed FFmpeg callback template, H.264/AAC encoding, poster generation, output validation, playback, and download.
- Follow-up association, editable per-thread reply drafts, sequential approved writes, independent failure status, and CLOSED story state.
- A completely local controlled fixture when live credentials are unavailable. Fixture data and simulated writes are visibly labeled everywhere.

## Exact v1 boundaries

- One selected creator-owned historical video.
- Explicit spoken promises, experiments, challenges, or intended follow-ups only.
- Source media is supplied by the creator. LORE never downloads YouTube audiovisual content.
- One 16:9 callback template, 8-12 seconds, maximum three comments, anonymous credit by default.
- The follow-up is published outside LORE through YouTube Studio.
- Every interpretation, credit, and YouTube write requires creator review.
- No trend ideas, generic chat, voice cloning, mass replies, automatic publishing, notification claims, or channel-wide monitoring.

## Quick start: controlled end-to-end demo

On Windows, double-click `Lore.cmd` to build when needed, start the backend, wait for readiness, and open Lore. This prevents an old browser tab from being mistaken for a running application.

Prerequisites: Node 24, npm, FFmpeg, and ffprobe.

```powershell
npm ci
Copy-Item .env.example .env
npm run verify:env
npm run seed:demo
npm run dev
```

Open `http://localhost:3000`, then:

1. Confirm the evidence-backed story.
2. Choose **Use prepared controlled source**.
3. Render and play/download the real callback MP4.
4. Attach the prefilled fixture follow-up URL.
5. Approve the three fixture replies (they are explicitly simulated and never sent).
6. Mark the story CLOSED.

## Live YouTube acceptance

1. Create a Google Cloud OAuth web application and enable YouTube Data API v3.
2. Set the authorized redirect URI to `http://localhost:3000/api/auth/youtube/callback` for local testing.
3. Fill `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, and a strong `TOKEN_ENCRYPTION_KEY` in `.env`.
4. Run the app and select **Connect YouTube**.
5. Import one video owned by that authenticated channel, import authorized captions or upload VTT/SRT, analyze it, and import comments.
6. Complete the same confirmation/render flow.
7. Publish the follow-up manually through YouTube Studio, attach its URL, inspect each draft, and approve selected replies.

Live acceptance requires your own controlled channel, OAuth credentials, creator-owned original/follow-up videos, and consenting test comments. None are embedded in this repository.

## Verification

```powershell
npm run typecheck
npm test
npm run build
```

The media test generates creator-owned synthetic source footage, renders the fixed callback, reopens it with ffprobe, and requires a video stream, audio stream, 1920×1080 dimensions, and 8-12 second duration.

## Recorded workflow

The saved [Lore workflow walkthrough](artifacts/Lore_Workflow_Walkthrough.mp4) shows the controlled evidence, callback editor, rendered follow-up, reviewed replies, and closed-story states. Demo replies are simulated and never sent to YouTube.

## Docker

```powershell
Copy-Item .env.example .env
docker compose up --build
```

The container includes pinned Node, FFmpeg, and a known font; it runs as a non-root user. Private state and media use named volumes. PostgreSQL and Redis services are included for the documented production migration path; the timed single-user demo currently uses an atomic local state file to avoid migration risk.

## Repository map

- `src/app` — product UI and guarded route handlers.
- `src/lib` — state model, transcript evidence, YouTube adapter, token encryption, and FFmpeg pipeline.
- `tests` — evidence-validation and real media-render tests.
- `fixtures` — disclosed controlled transcript/comment inputs.
- `scripts` — demo seeding and environment checks.
- `prisma/schema.prisma` — production PostgreSQL entity model.
- `docs` — architecture, API, quota, security/privacy, demo runbook, and Devpost copy.
- `guide/LORE_COMPLETE_PRODUCT_TECHNICAL_DOCUMENTATION (1).md` — frozen product contract.

## Demo data disclosure

The included microphone story, channel, comments, IDs, source media, follow-up URL, and simulated reply IDs are controlled fixtures. They are not claimed to be organic audience demand or live YouTube activity. A competition recording should show the real controlled channel and only claim a posted reply after YouTube returns the reply ID and the thread is visibly refreshed.

## Team

Update this section with the exact eligible participant name(s) and truthful contributions before submission. For a solo entry, use: `Name — product, frontend, backend, YouTube integration, evidence pipeline, media rendering, testing, and demo.`

## License

MIT. See `LICENSE`.
