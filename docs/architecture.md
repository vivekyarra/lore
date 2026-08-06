# LORE architecture

LORE implements one evidence-first continuity loop. The browser never receives OAuth refresh tokens and never performs YouTube writes directly.

```text
Creator browser
  |  review evidence, upload owned media, approve writes
  v
Next.js application
  |-- OAuth and official YouTube Data API adapter
  |-- transcript parser and exact-evidence validator
  |-- deterministic comment matcher
  |-- state machine and audit log
  |-- private upload/render endpoints
  v
Single-user hackathon store        FFmpeg worker boundary
  | atomic JSON state               | ffprobe validation
  | encrypted refresh token         | fixed 10-second template
  | no public media path             | H.264/AAC output + poster
  v                                 v
PostgreSQL production schema       private storage volume
```

## Runtime profiles

- Controlled demo: seeded creator-owned scenario, synthetic source media generated locally, simulated reply results. Every screen labels this data as a fixture.
- Live acceptance: Google OAuth with `youtube.force-ssl`, creator ownership checks, authorized caption/comment ingestion, real follow-up ownership verification, and sequential approved replies.

The hackathon runtime uses an atomic single-user JSON state file to remove migration risk during the timed demonstration. `prisma/schema.prisma` defines the PostgreSQL production model. This demo profile is intentionally not presented as multi-user production infrastructure.

## Correctness boundary

1. Transcript input must contain timestamps.
2. Candidate quote must normalize and match the cited transcript window.
3. Candidate remains PROPOSED until creator confirmation.
4. Only classified follow-up requests can be selected, maximum three.
5. Rendering requires creator-supplied media and a CONFIRMED story.
6. Follow-up attachment requires a completed render; live mode verifies channel ownership.
7. Replies require the exact original thread, editable draft, and explicit approval.
8. Story closure is separate from per-reply success.
