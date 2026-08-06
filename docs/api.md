# Internal API map

| Area | Endpoint | Guard |
|---|---|---|
| State | `GET /api/state` | Token fields redacted |
| Demo | `POST /api/demo/reset` | Explicit fixture disclosure |
| Demo media | `POST /api/demo/source` | CONFIRMED story |
| OAuth | `GET /api/auth/youtube/start` | CSRF state cookie |
| OAuth | `GET /api/auth/youtube/callback` | State + server exchange |
| OAuth | `POST /api/auth/youtube/disconnect` | Deletes local credential |
| Video | `POST /api/youtube/video/import` | Authenticated channel ownership |
| Captions | `POST /api/youtube/captions/import` | Creator-authorized track |
| Transcript | `POST /api/transcript/upload` | VTT/SRT, timestamped, 2 MB |
| Analysis | `POST /api/analyze` | Exact quote validation |
| Comments | `POST /api/youtube/comments/import` | Official API pagination |
| Selection | `POST /api/comments/:id/select` | Follow-up request only, max 3 |
| Story | `POST /api/story/confirm` | Evidence + selected comment |
| Story | `POST /api/story/reject` | PROPOSED only |
| Media | `POST /api/media/upload` | MP4/MOV, 500 MB, ffprobe |
| Render | `POST /api/render` | CONFIRMED + private source |
| Render | `GET /api/renders/:id/media` | Current owned render |
| Render | `GET /api/renders/:id/download` | Current owned render |
| Publication | `POST /api/story/follow-up` | RENDERED; live ownership check |
| Closure | `POST /api/replies/apply` | PUBLISHED + explicit approvals |
| Closure | `POST /api/story/close` | Follow-up attached |
