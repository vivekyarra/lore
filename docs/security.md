# Security and privacy

## OAuth

- The authorization URL and code exchange are server-side.
- A cryptographically random, HTTP-only, SameSite OAuth state cookie is checked on callback.
- Only `https://www.googleapis.com/auth/youtube.force-ssl` is requested.
- Refresh tokens are encrypted with AES-256-GCM using `TOKEN_ENCRYPTION_KEY`.
- Tokens are redacted from API responses and are never logged.
- Disconnect deletes the locally stored credential. Creators should also revoke access from their Google Account when required.

## Authorization and writes

- Live video imports and follow-up attachment verify `snippet.channelId` against the authenticated channel.
- Captions and comments use the official YouTube Data API.
- Reply targets come from imported top-level comment IDs; clients cannot supply arbitrary parent IDs.
- Writes are performed sequentially, maximum three, after each draft is displayed and approved.
- Failed writes are retained independently; the UI never claims viewer notification or viewership.

## Media

- YouTube audiovisual content is never downloaded.
- Source media must be uploaded by the creator as MP4/MOV, maximum 500 MB and one hour.
- ffprobe verifies a video and audio stream before processing.
- FFmpeg receives an argument array with `shell: false`, a fixed output template, known private paths, and execution timeouts.
- Media is outside the public web root; downloads resolve through owned render records.
- Docker runs the application and FFmpeg as the non-root `node` user.

## Untrusted text

Transcripts, comments, filenames, URLs, and model-like outputs are untrusted data. Captions are parsed as text, candidates are validated against source evidence, comments are never executed, FFmpeg text is escaped, and request bodies are validated with Zod.

## Privacy and retention

- Demo fixtures contain no claimed organic audience data.
- Live data is stored only for the selected workflow.
- Source uploads should be deleted after 24 hours and renders after seven days in a hosted deployment.
- A local project reset replaces active fixture state; production deletion must also remove private object-store assets and database rows.
- LORE does not train models on creator or viewer data, sell audience data, or expose imported comments publicly.
