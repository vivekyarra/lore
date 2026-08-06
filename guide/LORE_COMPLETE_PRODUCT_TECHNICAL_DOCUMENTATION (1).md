# LORE
## Complete Product, Technical, Security, Demo, and Hackathon Documentation

**Subtitle:** The continuity editor for YouTube  
**Primary positioning:** YouTube gives creators analytics. LORE gives their channel a memory.  
**Winning line:** The algorithm remembers performance. LORE remembers the story.  
**Document status:** Hackathon build specification, frozen v1  
**Prepared:** August 6, 2026  
**Target deadline:** August 10, 2026 at 5:30 a.m. IST  

---

# 1. Executive decision

Build LORE as one narrow, complete creative loop:

```text
Past video contains an explicit promise or experiment
        ↓
Viewers ask for the promised follow-up
        ↓
LORE proposes a cited open story
        ↓
Creator confirms the story and source clip
        ↓
LORE renders a polished callback intro MP4
        ↓
Creator uses the asset in a follow-up video
        ↓
Creator supplies the published follow-up URL
        ↓
LORE posts approved replies to selected original commenters
        ↓
The story changes from OPEN to CLOSED
```

This is not a universal channel-intelligence platform. It is not a generic idea generator. It is not “chat with your channel.” It is not automatic video creation. It is one creator-confirmed continuity workflow that produces a real editing asset and a real YouTube comment action.

The hackathon version succeeds only when the complete workflow works end to end on a controlled creator-owned channel.

# 2. Product thesis

A loyal viewer experiences a YouTube channel as a story unfolding over time. Creators make promises, begin experiments, make predictions, start challenges, change opinions, develop recurring jokes, and receive repeated requests for updates. The audience remembers those moments. The creator often does not.

LORE treats the channel as a continuing narrative rather than a pile of unrelated uploads. It finds an unfinished story supported by exact evidence and helps the creator turn that history into the opening of the next video.

The product question is not:

> What should you make next?

It is:

> What story have you and your audience already started together?

# 3. Core value proposition

LORE saves four forms of creator work:

1. Remembering old promises and unfinished experiments.
2. Searching old transcripts for the exact source moment.
3. Reading hundreds of comments to understand follow-up demand.
4. Rebuilding old footage and comments into a usable callback sequence.

Its emotional value is equally important: the creator visibly remembers the audience, credits the viewers who kept the story alive, and closes a relationship loop.

# 4. Hackathon fit

The YouTube Automation Hackathon asks for a working tool that automates part of the YouTube creator workflow, performs real work rather than presenting only a mockup, stays within YouTube API terms and rate limits, and is built during the hackathon window. The required submission includes a repository and README; a two-to-four-minute demo video is optional; the judging criteria are functionality, creativity, technical execution, and real-world usefulness.

LORE maps to those criteria as follows:

| Criterion | LORE evidence |
|---|---|
| Functionality | Imports a creator-owned video, captions, and comments; detects a cited candidate; renders a real MP4; posts approved real replies. |
| Creativity | Treats channel history as narrative continuity and turns memory into an editing material. |
| Technical execution | OAuth, YouTube ingestion, structured AI extraction, evidence-preserving matching, media rendering, state management, and safe write operations. |
| Real-world usefulness | Replaces manual searching, clip extraction, comment review, callback editing, and follow-up replies. |

## 4.1 Submission compliance checklist

- Participant is above the legal age of majority in their country of residence.
- Participant is an eligible college student.
- No company or professional organization is submitting the project.
- Team size is one to four people.
- Code used in the submission is written during the event window.
- Repository contains setup and run instructions.
- Application performs a real result.
- YouTube API use is authorized and compliant.
- Controlled demo data is disclosed as controlled test data.
- No scraped or downloaded YouTube audiovisual content is used.

# 5. Exact v1 definition

LORE v1 supports only:

- Creator-owned YouTube videos.
- One selected historical video at a time.
- A downloadable caption track or a creator-uploaded SRT/VTT transcript.
- A creator-supplied local source video file for clip extraction.
- Explicit spoken promises, experiments, challenges, or intended follow-ups.
- Viewer comments that directly request the outcome or continuation.
- Creator confirmation before a story is accepted.
- One fixed callback video template.
- Three selected comment cards maximum.
- A rendered MP4 exported for use in a follow-up edit.
- A creator-supplied follow-up YouTube URL after publication.
- Human-approved replies to selected original top-level comment threads.
- A simple story lifecycle: proposed, confirmed, rendered, published, closed.

## 5.1 Exact output

The primary output is an eight-to-twelve-second MP4 containing:

1. The original creator promise clip.
2. Up to three real viewer comment cards.
3. A short elapsed-time title card such as “Seven days later…” or “Eleven months later…”
4. Optional onscreen credit text.

The secondary output is an approved YouTube reply posted to selected original reporting or follow-up threads after the creator provides the follow-up video URL.

# 6. What LORE does not do

LORE v1 does not:

- Generate generic video ideas from trends.
- Search the entire internet for topics.
- Fact-check creator statements.
- Accuse creators of lying or contradicting themselves.
- Automatically decide that a story is real without creator confirmation.
- Automatically publish videos.
- Download source video files from YouTube.
- Scrape transcripts, comments, or video media.
- Create a full long-form video.
- Clone the creator’s voice.
- Generate replacement footage.
- Perform automatic B-roll selection.
- Offer multiple motion-design templates.
- Generate thumbnails, titles, SEO, or chapters.
- Reply to all commenters automatically.
- Send direct messages to viewers.
- Claim that a reply produced a YouTube notification.
- Claim legal ownership of a viewer’s idea.
- Claim organic validation when the demonstration uses controlled accounts.
- Monitor channels continuously in the background.
- Analyze every video in the channel during v1.
- Support videos that the authenticated creator does not own.
- Support visual-only promises that are absent from captions or the supplied transcript.

# 7. Transparent controlled demonstration

The demo may use a scenario created specifically to exercise the product. That is acceptable as functional testing, provided the submission states it clearly.

Use language such as:

> For this demonstration, we created a controlled creator-owned channel scenario so every stage of the LORE workflow could be tested safely and repeatably.

Do not claim:

- The comments were organic audience demand if they came from test accounts.
- Hundreds of viewers requested the follow-up unless that is true.
- A creator adopted the product unless a real creator did.
- The model independently understood years of channel history when only one video was analyzed.

# 8. Target users

Primary v1 users:

- Review creators who promise long-term tests.
- Tutorial creators who promise part two or an outcome.
- Challenge creators.
- Experiment and science creators.
- Personal documentary and vlog creators.
- Technology creators revisiting products.
- Fitness creators running time-bound experiments.
- Education creators returning to predictions or projects.

Poor-fit users for v1:

- Channels without spoken captions or supplied transcripts.
- Pure music channels.
- Channels dominated by Shorts with no continuing story.
- Creators who do not retain original source files.
- Channels with comments disabled.
- Creators who do not want audience comments used in editing assets.

# 9. Jobs to be done

## 9.1 Creator job

“When I begin planning a new video, help me recover a meaningful unfinished story from my own channel, show me the exact evidence, and turn it into an opening sequence without making me search old videos and comments manually.”

## 9.2 Community job

“When viewers repeatedly ask for an update, help the creator acknowledge that demand and return to the original threads when the story is resolved.”

# 10. End-to-end user journey

## Step 1: Connect YouTube

The creator signs in through Google OAuth and grants the minimum scope required for creator-owned captions and comment replies.

The application verifies the authenticated channel and stores encrypted refresh credentials.

## Step 2: Select a historical video

For the hackathon, the creator can either:

- Paste a YouTube video URL, or
- Select from a short list of recent creator-owned uploads.

LORE retrieves the video title, description, thumbnail metadata, publication date, channel ID, and content duration. It verifies that the authenticated channel owns the selected video.

## Step 3: Acquire the transcript

Preferred path:

1. List caption tracks for the selected creator-owned video.
2. Let the creator choose the language track.
3. Download the caption track as VTT.

Fallback path:

- Creator uploads SRT or VTT.
- Creator can paste a timestamped transcript if caption download is unavailable.

The application never uses unofficial transcript scraping.

## Step 4: Import comments

LORE retrieves published top-level comment threads for the selected video in plain text. It paginates until either:

- All comments are imported, or
- The configured hackathon limit is reached, such as 500 top-level comments.

The application stores comment IDs, text, author display names, author channel IDs when available, like count, publication date, update date, and reply count.

## Step 5: Detect open-story candidates

The transcript is split into timestamped segments. The AI examines the segments and proposes only explicit candidates such as:

- “I will use this microphone for seven days and report back.”
- “If this reaches 10,000 likes, I will try the challenge.”
- “I planted these today. We will return in one year.”
- “I will explain what happened in another video.”

Every candidate must include:

- Exact transcript quote.
- Start and end time.
- Candidate type.
- Normalized subject.
- Stated condition or promised interval.
- Why the language is explicit.
- Model confidence used only internally for ranking.

The application does not present a candidate as fact until the creator confirms it.

## Step 6: Find supporting comments

For each candidate, LORE retrieves potentially related comments using a layered pipeline:

1. Deterministic lexical retrieval using subject terms and follow-up language.
2. Semantic similarity ranking.
3. Structured model classification of the top candidates.
4. Deduplication of near-identical comments.
5. Creator review.

A matching comment must clearly ask for the outcome, continuation, promised update, or part two. Generic praise does not count.

## Step 7: Present a continuity opportunity

The opportunity card shows:

- Candidate title.
- Original quote.
- Exact timestamp.
- Embedded YouTube player positioned at the timestamp.
- Number of likely matching comments.
- Most recent matching comment date.
- Up to five comment examples.
- Why the candidate was proposed.

Actions:

- Confirm story.
- Adjust timestamp.
- Edit title.
- Remove irrelevant comments.
- Reject candidate.

The creator’s confirmation is the correctness boundary.

## Step 8: Upload source media

The creator uploads the original source video or a local export corresponding to the selected YouTube video.

LORE validates:

- Allowed container format.
- Video and audio streams exist.
- Duration is compatible with the YouTube content duration within a tolerance.
- The selected clip timestamp fits inside the file.
- File size is within the configured limit.

The file is stored temporarily and is deleted after the retention period or when the creator removes the project.

## Step 9: Configure the callback

The creator chooses:

- Clip start and end.
- Up to three comment cards.
- Comment display style: handle shown or anonymized.
- Elapsed-time title.
- Optional intro line.
- Output ratio: fixed at 16:9 for v1.

The preview is deterministic. The AI does not edit the creator’s spoken clip.

## Step 10: Render

LORE creates a render job. The worker:

1. Probes the source file with ffprobe.
2. Extracts and normalizes the selected source clip.
3. Builds the callback composition.
4. Renders frames and audio.
5. Encodes H.264 video and AAC audio into MP4.
6. Generates a poster image and low-resolution preview.
7. Runs output validation.

## Step 11: Review and export

The creator watches the callback MP4 inside LORE.

Actions:

- Download MP4.
- Adjust selected comments.
- Adjust title card.
- Adjust timestamp range.
- Re-render.
- Mark callback accepted.

## Step 12: Publish the follow-up outside LORE

For v1, the creator uses the exported MP4 in their editing workflow and publishes the follow-up through YouTube Studio.

LORE does not upload or publish the follow-up video automatically. This avoids unnecessary scope and avoids relying on API upload behavior for unverified projects.

## Step 13: Attach the published follow-up

The creator pastes the published or unlisted follow-up YouTube URL.

LORE verifies:

- URL syntax.
- Video exists.
- The authenticated channel owns the follow-up video.
- The video is available to the authenticated creator.

The story state changes to PUBLISHED.

## Step 14: Select original reporters

LORE shows the matched original comment threads. Each card contains:

- Original comment.
- Author.
- Existing creator replies.
- Proposed reply.
- Selection checkbox.

Default draft:

> You asked for the update, and it is finally here: {follow_up_url}. Thank you for keeping us accountable.

The creator can edit or deselect every reply.

## Step 15: Apply closure

After final approval, LORE posts replies one at a time. It records success or failure independently for each thread.

The system must not claim the viewer was notified. It can claim only that a reply was successfully posted and returned by the API.

## Step 16: Close the story

The story changes to CLOSED when:

- A follow-up video is attached, and
- At least the creator marks the story resolved.

Reply posting is recorded separately because individual replies may fail.

# 11. Primary screens

## 11.1 Landing page

Headline:

> Your audience remembers everything. Now your channel does too.

CTA:

- Connect YouTube
- View controlled demo

## 11.2 Channel connection

Displays:

- Google consent explanation.
- Exact requested scope.
- What LORE can read.
- What LORE can write.
- Revoke-access instructions.

## 11.3 Video selection

Displays:

- Thumbnail.
- Title.
- Publication date.
- Comment count if available.
- Transcript availability.
- “Analyze this video” action.

## 11.4 Analysis progress

Stages:

- Video metadata loaded.
- Caption track loaded.
- Comments imported.
- Transcript segmented.
- Candidate stories detected.
- Supporting comments matched.

Never show fake progress percentages. Show named completed stages.

## 11.5 Opportunity card

Example:

```text
CONTINUITY OPPORTUNITY

Seven-day microphone test

Original promise at 00:12
“I’m going to use this microphone for seven days and report back.”

Likely follow-up requests: 3
Most recent request: today

[Open source moment] [Confirm story] [Reject]
```

## 11.6 Story workspace

Tabs:

- Evidence
- Callback
- Publication
- Closure

## 11.7 Render review

Displays:

- Video preview.
- Clip range.
- Selected comment cards.
- Title-card copy.
- Render status.
- Download button.

## 11.8 Closure screen

Displays:

- Follow-up video.
- Original threads.
- Existing replies.
- Draft replies.
- Per-thread status.
- Close story button.

# 12. System architecture

```text
Browser / Next.js UI
        │
        ├── OAuth initiation and callback
        ├── Product API requests
        └── Render progress polling
        │
Next.js server / API layer
        │
        ├── YouTube Data API client
        ├── Application services
        ├── AI orchestration
        ├── Authorization checks
        └── Signed upload/download URLs
        │
PostgreSQL
        │
        ├── users and channels
        ├── videos and transcripts
        ├── comments and candidates
        ├── stories and render jobs
        └── reply operations and audit log
        │
Object storage
        │
        ├── uploaded source video
        ├── normalized clip
        ├── rendered MP4
        └── poster/preview
        │
Worker process
        │
        ├── transcript parsing
        ├── AI extraction and matching
        ├── FFmpeg probing/extraction
        ├── Remotion rendering
        └── output validation
        │
External services
        ├── Google OAuth
        ├── YouTube Data API
        └── one structured-output LLM provider
```

# 13. Recommended technical stack

## 13.1 Application stack

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript | One language across UI, API, worker orchestration, schemas, and tests. |
| Web framework | Next.js App Router | Fast full-stack development, server routes, React UI, easy deployment. |
| UI | Tailwind CSS plus shadcn/ui-style components | Fast, consistent hackathon interface. |
| Forms | React Hook Form plus schema validation | Reliable creator confirmation and editing flows. |
| Validation | Zod | Shared runtime schemas for API, AI output, and forms. |
| Database | PostgreSQL | Durable relational state and clear audit history. |
| ORM | Prisma | Fast schema iteration and typed queries. |
| Object storage | S3-compatible storage | Source files and rendered artifacts. Local filesystem is acceptable for the controlled demo. |
| Job execution | BullMQ with Redis, or a minimal database-backed worker | Rendering and AI jobs must not block web requests. |
| YouTube client | Official Google API Node.js client | OAuth and YouTube Data API requests. |
| AI runtime | One provider behind an adapter | Avoid provider-specific product coupling. Require JSON-schema output. |
| Media | FFmpeg and ffprobe | Deterministic clip extraction, normalization, encoding, and validation. |
| Composition | Remotion | React-based programmatic video composition and repeatable animation. |
| Testing | Vitest, Playwright, and fixture-based media tests | Unit, integration, and end-to-end coverage. |
| Logging | Structured JSON logs | Easy debugging and demo reliability. |

## 13.2 Runtime versions

Use current stable releases at build start and commit the lockfile. Do not upgrade dependencies after the demo is stable. Pin the Node runtime in `.nvmrc` or `.tool-versions`, and pin FFmpeg availability in Docker.

## 13.3 Deployment profile

For the hackathon, prefer reliability over scale:

- One web service.
- One worker service.
- One PostgreSQL database.
- One Redis service if BullMQ is used.
- One object-storage bucket.

A local Docker Compose deployment is acceptable for the demo. A hosted public URL is helpful but not mandatory when the repository and instructions are complete.

# 14. Repository structure

```text
lore/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── tests/
│   └── worker/
│       ├── jobs/
│       ├── media/
│       ├── ai/
│       └── tests/
├── packages/
│   ├── db/
│   │   ├── prisma/
│   │   └── client.ts
│   ├── schemas/
│   ├── youtube/
│   ├── prompts/
│   ├── render-template/
│   └── shared/
├── fixtures/
│   ├── transcripts/
│   ├── comments/
│   ├── source-media/
│   └── youtube-responses/
├── scripts/
│   ├── seed-demo.ts
│   ├── verify-env.ts
│   └── render-smoke-test.ts
├── docs/
│   ├── architecture.md
│   ├── security.md
│   ├── demo-runbook.md
│   └── api-quota.md
├── docker-compose.yml
├── Dockerfile.web
├── Dockerfile.worker
├── .env.example
├── README.md
└── package-lock.json or pnpm-lock.yaml
```

# 15. YouTube OAuth and API implementation

## 15.1 OAuth scope

Use:

```text
https://www.googleapis.com/auth/youtube.force-ssl
```

This scope supports the required authorized caption and comment operations. Request only the permissions used by the application.

## 15.2 OAuth flow

1. Generate an authorization URL server-side.
2. Include a cryptographically random `state` value tied to the current session.
3. Redirect to Google consent.
4. Validate returned `state`.
5. Exchange the authorization code server-side.
6. Encrypt refresh token at rest.
7. Store scope, expiry, channel identity, and token version.
8. Refresh access tokens server-side only.
9. Provide a disconnect action that deletes local credentials and directs the user to revoke Google access when desired.

## 15.3 Required YouTube methods

| Purpose | Method |
|---|---|
| Verify channel | `channels.list` with authenticated ownership parameters. |
| List uploads | `playlistItems.list` using the channel uploads playlist, or accept a pasted video URL. |
| Read selected video | `videos.list(part=snippet,contentDetails,status)` |
| List caption tracks | `captions.list(part=snippet, videoId=...)` |
| Download chosen caption | `captions.download(id=..., tfmt=vtt)` |
| Import top-level comments | `commentThreads.list(part=snippet,replies, videoId=..., textFormat=plainText)` |
| Retrieve complete replies | `comments.list(part=snippet, parentId=...)` |
| Post closure reply | `comments.insert(part=snippet)` |

## 15.4 Comment retrieval rules

- Request `textFormat=plainText`.
- Paginate using `nextPageToken`.
- Default order is time.
- Do not use search API for comments.
- Preserve original comment ID and top-level comment ID.
- If `totalReplyCount` exceeds inline replies, call `comments.list(parentId=...)` before claiming there are no existing replies.
- Skip comments that are deleted, unavailable, private, or not replyable.

## 15.5 Reply request shape

```json
{
  "snippet": {
    "parentId": "TOP_LEVEL_COMMENT_ID",
    "textOriginal": "You asked for the update, and it is finally here: https://youtu.be/EXAMPLE"
  }
}
```

The write must occur only after the creator sees the original comment, the full draft, and the exact target thread.

# 16. Source-video and transcript boundaries

## 16.1 Source video

The YouTube Data API must not be used to download or cache YouTube audiovisual content. LORE therefore requires the creator to provide the original source file or an export they are authorized to use.

Accepted v1 input:

- MP4 with H.264 video and AAC audio preferred.
- MOV accepted if FFmpeg can decode it.
- Maximum file size set according to deployment capacity.
- Maximum duration limited for hackathon reliability.

## 16.2 Transcript input order

1. Creator-authorized caption download through the YouTube Data API.
2. Creator-uploaded VTT.
3. Creator-uploaded SRT.
4. Creator-pasted timestamped transcript.

Reject untimestamped transcript input for v1 unless the creator manually supplies the source timestamp.

## 16.3 Caption normalization

Normalize caption cues into:

```ts
type TranscriptSegment = {
  id: string;
  videoId: string;
  startMs: number;
  endMs: number;
  text: string;
  sourceCueIds: string[];
};
```

Normalization rules:

- Strip markup.
- Decode entities.
- Merge tiny adjacent cues when the gap is under a threshold.
- Preserve original time ranges.
- Never paraphrase the stored evidence text.
- Build a normalized search form separately from the displayed quote.

# 17. AI pipeline

## 17.1 Principle

AI proposes; evidence and creator confirmation establish the story.

The AI is never allowed to invent:

- A quote.
- A timestamp.
- A comment.
- A viewer count.
- A promised outcome.
- A publication event.

## 17.2 Candidate extraction

Input:

- Timestamped transcript window.
- Video title and description as context.

Output schema:

```ts
const CandidateSchema = z.object({
  candidates: z.array(z.object({
    type: z.enum(["promise", "experiment", "challenge", "intended_follow_up"]),
    quote: z.string(),
    startMs: z.number().int().nonnegative(),
    endMs: z.number().int().positive(),
    subject: z.string(),
    commitment: z.string(),
    triggerOrInterval: z.string().nullable(),
    explicitness: z.enum(["explicit", "strongly_implied"]),
    rationale: z.string()
  })).max(20)
});
```

Post-validation:

- Quote must exist verbatim inside the source transcript window after whitespace normalization.
- Timestamp must overlap the source cue IDs used in the request.
- Reject vague statements such as “maybe someday.”
- Reject retrospective statements.
- Reject sponsor calls to action.
- Reject ordinary episode transitions.

## 17.3 Candidate ranking

Suggested score:

```text
score =
  explicitness_weight
  + matched_comment_count_weight
  + comment_recency_weight
  + promise_age_weight
  + source_clip_quality_weight
```

The score ranks candidates; it is not shown as a fake probability.

## 17.4 Comment retrieval

First-pass lexical terms:

- update
- part two / part 2
- what happened
- did it work
- result
- review after
- still waiting
- come back
- follow-up
- survived
- outcome

Also include subject-specific terms from the candidate.

## 17.5 Semantic ranking

Compute an embedding for:

- Candidate subject and commitment.
- Every comment text.

Retrieve the top 30–50 comments by similarity, then add lexical matches and recent comments. Deduplicate before model classification.

For a tiny controlled demo, embeddings are optional. Deterministic keyword retrieval plus a structured model classifier is sufficient.

## 17.6 Comment classification

Output schema:

```ts
const CommentMatchSchema = z.object({
  commentId: z.string(),
  decision: z.enum(["follow_up_request", "related_but_not_request", "unrelated"]),
  evidencePhrase: z.string().nullable(),
  reason: z.string()
});
```

A `follow_up_request` must request or ask about the promised result, continuation, or part two. Generic comments such as “great video” are rejected.

## 17.7 Grouping and deduplication

Use normalized text plus embedding similarity to identify near-duplicate requests. Do not collapse distinct author threads into one record; grouping is only for presentation.

Each original thread remains independently selectable for later reply.

## 17.8 Creator confirmation

The creator must confirm:

- The transcript quote is a genuine open story.
- The timestamp is correct.
- The normalized title is appropriate.
- The selected comments genuinely refer to the story.
- The callback may use the chosen comments.

After confirmation, the story record stores who confirmed it and when.

# 18. Callback rendering pipeline

## 18.1 Fixed v1 composition

Target duration: 8–12 seconds.

Example timeline:

```text
0.00–4.00  Original promise clip
3.20–7.20  Comment cards animate in over or after the clip
7.20–9.50  “Seven days later…” title card
9.50–10.00 Fade to black or clean cut
```

## 18.2 Design constraints

- 1920×1080.
- 30 fps.
- H.264 High profile.
- AAC stereo.
- Safe margins for YouTube UI.
- Large readable typography.
- Maximum three comment cards.
- No generated voiceover.
- Creator speech remains unmodified except loudness normalization and clean cuts.
- Comment cards must visually distinguish public comments from creator narration.

## 18.3 Clip extraction

Example FFmpeg operation:

```bash
ffmpeg -ss START -to END -i source.mp4 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -af "loudnorm" \
  -c:v libx264 -preset medium -crf 18 \
  -c:a aac -b:a 192k normalized-clip.mp4
```

In production code, construct arguments as an array and never execute a shell command assembled from user strings.

## 18.4 Comment-card rendering

Each card includes:

- Optional profile image.
- Display name or anonymized label.
- Exact selected comment excerpt.
- “Requested follow-up” label if desired.

Text rules:

- Preserve comment meaning.
- Truncate visually with explicit ellipsis only when necessary.
- Store and display the full original comment in the creator review UI.
- Never rewrite a viewer’s comment inside the rendered asset without clearly labeling it as an edited excerpt.

## 18.5 Elapsed-time title

Compute from original video publication date to follow-up date when available. For a controlled demo, allow creator override.

Examples:

- Seven days later…
- Eleven months later…
- 312 days later…

Do not manufacture elapsed time before the follow-up date exists.

## 18.6 Render validation

After rendering:

- Run ffprobe.
- Confirm duration is within expected range.
- Confirm one video stream and one audio stream.
- Confirm dimensions and frame rate.
- Confirm file is non-empty and decodable.
- Generate a poster frame.
- Run a smoke playback check in the browser.

## 18.7 Render idempotency

Compute a render fingerprint from:

- Source file hash.
- Clip range.
- Selected comment IDs and text snapshot.
- Template version.
- Title-card text.
- Render settings.

If an identical completed render exists, reuse it.

# 19. Comment credit and consent

Public availability does not automatically mean a viewer expects their comment to appear prominently inside a new video.

V1 policy:

- Creator must explicitly select each comment.
- Default render mode anonymizes handles unless the creator marks permission as obtained.
- Controlled demo accounts may be marked as consented.
- The product never claims a commenter owns the resulting video idea.

Use language:

- Inspired by
- Requested by
- Community contributor
- Viewers who asked for this follow-up

Do not use:

- Invented by
- Owned by
- Legally credited to

Optional future permission request:

> We are preparing the follow-up you requested. May we feature your public comment and handle in the video?

This permission workflow is not required for the hackathon build.

# 20. Closure reply workflow

## 20.1 Drafting

Templates should be short and specific.

Default:

> You asked for the update, and it is finally here: {url}. Thank you for keeping us accountable.

Alternative:

> We came back to the experiment you asked about. The follow-up is here: {url}. Thanks for pushing us to finish the story.

## 20.2 Approval screen

For every target thread show:

- Original comment.
- Author display name.
- Existing replies.
- Draft text.
- Selected checkbox.
- Reply eligibility.

## 20.3 Write behavior

- Post replies sequentially or with very low concurrency.
- Record each request independently.
- On timeout, refetch replies before retrying.
- Do not retry blindly.
- Do not post duplicate reply text to the same thread.
- Allow retry only for failed targets.

## 20.4 Status language

Allowed:

- Reply posted.
- Two reporter replies posted.
- One reply failed.

Not allowed:

- Viewer notified.
- Viewer saw the reply.
- Audience reached.

# 21. Story state machine

```text
PROPOSED
  ├── creator rejects → REJECTED
  └── creator confirms → CONFIRMED

CONFIRMED
  └── callback render succeeds → RENDERED

RENDERED
  ├── creator re-renders → RENDERED
  └── creator attaches follow-up video → PUBLISHED

PUBLISHED
  ├── reply operations run → PUBLISHED
  └── creator closes story → CLOSED
```

State definitions:

| State | Meaning |
|---|---|
| PROPOSED | AI proposed a candidate; no factual creator confirmation. |
| REJECTED | Creator rejected the proposal. |
| CONFIRMED | Creator confirmed evidence and story meaning. |
| RENDERED | At least one valid callback MP4 exists. |
| PUBLISHED | A creator-owned follow-up video is attached. |
| CLOSED | Creator marks the story resolved; reply statuses remain separately visible. |

# 22. Database model

## 22.1 Core entities

```prisma
model User {
  id             String   @id @default(cuid())
  email          String?
  createdAt      DateTime @default(now())
  youtubeAccount YouTubeAccount?
  stories        Story[]
}

model YouTubeAccount {
  id                    String   @id @default(cuid())
  userId                String   @unique
  user                  User     @relation(fields: [userId], references: [id])
  channelId             String   @unique
  channelTitle          String
  encryptedRefreshToken String
  grantedScopes         String[]
  tokenVersion          Int      @default(1)
  connectedAt           DateTime @default(now())
  revokedAt             DateTime?
}

model Video {
  id               String   @id @default(cuid())
  youtubeVideoId   String   @unique
  channelId        String
  title            String
  description      String
  publishedAt      DateTime?
  durationMs       Int?
  thumbnailUrl     String?
  metadataSnapshot Json
  importedAt       DateTime @default(now())
  transcript       Transcript?
  comments         CommentThread[]
  candidates       StoryCandidate[]
}

model Transcript {
  id          String   @id @default(cuid())
  videoId     String   @unique
  video       Video    @relation(fields: [videoId], references: [id])
  source      String
  language    String?
  rawObjectKey String?
  createdAt   DateTime @default(now())
  segments    TranscriptSegment[]
}

model TranscriptSegment {
  id           String @id @default(cuid())
  transcriptId String
  transcript   Transcript @relation(fields: [transcriptId], references: [id])
  startMs      Int
  endMs        Int
  text         String
  normalized   String
}

model CommentThread {
  id                String   @id @default(cuid())
  youtubeCommentId  String   @unique
  videoId           String
  video             Video    @relation(fields: [videoId], references: [id])
  authorDisplayName String
  authorChannelId   String?
  textOriginal      String
  likeCount         Int
  publishedAt       DateTime
  updatedAt         DateTime
  canReply          Boolean
  totalReplyCount   Int
  rawSnapshot       Json
  matches           CandidateCommentMatch[]
  replyOperations   ReplyOperation[]
}

model StoryCandidate {
  id                String   @id @default(cuid())
  videoId           String
  video             Video    @relation(fields: [videoId], references: [id])
  type              String
  title             String
  exactQuote        String
  startMs           Int
  endMs             Int
  subject           String
  commitment        String
  triggerOrInterval String?
  modelRationale    String
  status            String   @default("PROPOSED")
  createdAt         DateTime @default(now())
  matches           CandidateCommentMatch[]
  story             Story?
}

model CandidateCommentMatch {
  candidateId String
  commentId   String
  candidate   StoryCandidate @relation(fields: [candidateId], references: [id])
  comment     CommentThread   @relation(fields: [commentId], references: [id])
  decision    String
  reason      String
  selected    Boolean @default(false)
  @@id([candidateId, commentId])
}

model Story {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  candidateId     String   @unique
  candidate       StoryCandidate @relation(fields: [candidateId], references: [id])
  status          String
  confirmedAt     DateTime?
  followUpVideoId String?
  closedAt        DateTime?
  renders         RenderJob[]
}

model MediaAsset {
  id          String   @id @default(cuid())
  ownerUserId String
  kind        String
  objectKey   String
  sha256      String
  mimeType    String
  byteSize    BigInt
  durationMs  Int?
  expiresAt   DateTime?
  createdAt   DateTime @default(now())
}

model RenderJob {
  id             String   @id @default(cuid())
  storyId        String
  story          Story    @relation(fields: [storyId], references: [id])
  sourceAssetId  String
  status         String
  fingerprint    String   @unique
  templateVersion String
  inputSnapshot  Json
  outputAssetId  String?
  errorCode      String?
  errorMessage   String?
  createdAt      DateTime @default(now())
  startedAt      DateTime?
  completedAt    DateTime?
}

model ReplyOperation {
  id               String   @id @default(cuid())
  commentId        String
  comment          CommentThread @relation(fields: [commentId], references: [id])
  storyId          String
  draftText        String
  idempotencyKey   String   @unique
  status           String
  youtubeReplyId   String?
  errorCode        String?
  createdAt        DateTime @default(now())
  completedAt      DateTime?
}

model AuditEvent {
  id         String   @id @default(cuid())
  userId     String?
  eventType  String
  entityType String
  entityId   String
  metadata   Json
  createdAt  DateTime @default(now())
}
```

## 22.2 Data retention

Recommended v1 retention:

- OAuth refresh token: until disconnect or revocation.
- YouTube metadata and comments: until project deletion; provide delete action.
- Uploaded source video: delete after 24 hours by default.
- Rendered MP4: retain seven days or until project deletion.
- Caption source file: retain only if required for reproducibility; otherwise delete after segment extraction.
- Audit logs: retain without storing access tokens or full sensitive payloads.

# 23. Internal API design

## 23.1 Auth

```text
GET  /api/auth/youtube/start
GET  /api/auth/youtube/callback
POST /api/auth/youtube/disconnect
GET  /api/me/channel
```

## 23.2 Videos and ingestion

```text
GET  /api/youtube/videos
POST /api/videos/import
GET  /api/videos/:id
POST /api/videos/:id/transcript/from-youtube
POST /api/videos/:id/transcript/upload
POST /api/videos/:id/comments/import
POST /api/videos/:id/analyze
```

## 23.3 Candidates and stories

```text
GET  /api/videos/:id/candidates
POST /api/candidates/:id/confirm
POST /api/candidates/:id/reject
PATCH /api/candidates/:id
POST /api/candidates/:id/comments/:commentId/select
```

## 23.4 Media and rendering

```text
POST /api/media/upload-url
POST /api/media/complete
POST /api/stories/:id/renders
GET  /api/renders/:id
GET  /api/renders/:id/download
```

## 23.5 Publication and closure

```text
POST /api/stories/:id/follow-up
GET  /api/stories/:id/reply-targets
POST /api/stories/:id/replies/preview
POST /api/stories/:id/replies/apply
POST /api/stories/:id/close
```

# 24. Job design

Job types:

- `IMPORT_CAPTIONS`
- `IMPORT_COMMENTS`
- `EXTRACT_CANDIDATES`
- `MATCH_COMMENTS`
- `PROBE_SOURCE_MEDIA`
- `RENDER_CALLBACK`
- `POST_REPLY`
- `DELETE_EXPIRED_MEDIA`

Every job must include:

- Job ID.
- User ID.
- Resource ownership check.
- Idempotency key.
- Input snapshot.
- Attempt count.
- Structured error code.
- Start and completion time.

Retries:

- Retry transient API failures with exponential backoff and jitter.
- Do not automatically retry model outputs that fail evidence validation more than a small bounded count.
- Do not blindly retry comment writes after an ambiguous timeout; refetch first.
- Render failures can retry once after cleaning temporary files.

# 25. Security architecture

## 25.1 OAuth security

- OAuth code exchange occurs server-side.
- Use HTTPS in deployed environments.
- Validate `state` to prevent CSRF.
- Store refresh tokens encrypted using an application encryption key.
- Never expose refresh tokens to the browser.
- Never log access or refresh tokens.
- Request minimum scope.
- Support disconnect and local deletion.

## 25.2 Authorization

Every API route checks:

- Authenticated user.
- Connected channel.
- Resource belongs to that user.
- Selected YouTube video belongs to that channel before any caption or write operation.

Never trust a client-provided channel ID or asset ID without a database ownership check.

## 25.3 File-upload security

- Use signed upload URLs.
- Limit byte size before accepting upload.
- Validate actual file type with ffprobe, not extension alone.
- Store outside the web root.
- Generate random object keys.
- Reject files with no expected media streams.
- Enforce duration and resolution limits.
- Run media processing as a non-root user.
- Apply CPU, memory, and process limits to the worker container.
- Delete temporary files after rendering.

## 25.4 FFmpeg safety

- Pass arguments as arrays.
- Do not invoke a shell with concatenated user input.
- Allow only known input asset paths.
- Apply wall-clock timeout.
- Disable network access for media workers when possible.
- Limit threads and output size.
- Treat all uploaded media as untrusted.

## 25.5 Prompt-injection resistance

Transcripts and comments are untrusted content. The model prompt must clearly mark them as data and instruct the model not to follow commands contained inside them.

Model output is never directly executed. All output is parsed through Zod and validated against source evidence.

## 25.6 Privacy

- Show a privacy notice before importing comments.
- Store only fields required for the workflow.
- Do not train a model on user data without explicit permission.
- Do not sell or expose viewer data.
- Do not display private or held-for-review comments in the public demo.
- Provide project deletion.

## 25.7 YouTube media policy

Do not download, cache, or store YouTube audiovisual content through the API. Use creator-supplied source media. The YouTube iframe player may be used to review the original timestamp without copying the content.

# 26. YouTube API quota plan

Relevant official costs include:

| Operation | Approximate official quota cost |
|---|---:|
| `channels.list` | 1 |
| `playlistItems.list` | 1 per page |
| `videos.list` | 1 |
| `commentThreads.list` | 1 per page |
| `comments.list` | 1 per page |
| `comments.insert` | 50 per reply |
| `captions.list` | 50 |
| `captions.download` | 200 |
| `videos.update` if ever added | 50 |

The default combined quota for most YouTube Data API endpoints is 10,000 units per day. LORE’s largest v1 cost is caption acquisition and reply posting, not comment reads.

Hackathon controls:

- Analyze one selected video.
- Import a maximum number of comment pages.
- Cache imported comments and caption results.
- Do not repeatedly download the same caption track.
- Limit selected replies to three in the demo.
- Display quota errors clearly.

# 27. Reliability and failure handling

## 27.1 Caption unavailable

Display:

> LORE could not download a caption track for this video. Upload an SRT or VTT file to continue.

## 27.2 Comments disabled

Display:

> Comments are disabled for this video. LORE can analyze the promise and render a callback, but it cannot measure follow-up requests or post closure replies.

For the hackathon controlled demo, comments must be enabled.

## 27.3 No candidate detected

Display:

> No explicit promise or follow-up experiment passed LORE’s evidence rules. Try another video or manually select a timestamp.

Manual timestamp selection can exist as a fallback, but the demo should prove automatic proposal.

## 27.4 Weak comment evidence

Display:

> LORE found the original promise but no clear viewer requests for a follow-up.

Do not inflate relevance.

## 27.5 Source duration mismatch

Display:

> The uploaded source file does not appear to match the selected YouTube video. Confirm the file or adjust the timestamp mapping.

## 27.6 Render failure

Show error category, not raw stack trace:

- Unsupported media.
- Clip range invalid.
- Encoder unavailable.
- Rendering timed out.
- Storage failure.

## 27.7 Reply failure

Show per-thread status. A story may still be closed when one reply fails.

# 28. Observability

Structured events:

- `oauth.connected`
- `video.imported`
- `caption.downloaded`
- `comments.imported`
- `candidate.proposed`
- `candidate.confirmed`
- `render.started`
- `render.completed`
- `render.failed`
- `followup.attached`
- `reply.posted`
- `reply.failed`
- `story.closed`

Metrics:

- Import duration.
- Number of transcript segments.
- Number of comments imported.
- Candidate count.
- Creator confirmation rate.
- Render duration.
- Render failure rate.
- Reply success rate.
- YouTube quota used.

Do not include transcript or comment text in routine logs.

# 29. Testing strategy

## 29.1 Unit tests

- VTT and SRT parsing.
- Transcript cue normalization.
- Candidate quote evidence validator.
- Timestamp overlap validator.
- Comment deduplication.
- Comment classification schema parsing.
- Elapsed-time title generation.
- Reply idempotency key generation.
- Resource ownership checks.
- YouTube URL parsing.

## 29.2 YouTube API contract tests

Mock official API responses for:

- Video ownership.
- Caption list success and forbidden errors.
- Caption download success.
- Comment pagination.
- Comments disabled.
- Full reply retrieval.
- Reply insert success.
- Reply insert forbidden.
- Ambiguous timeout followed by successful refetch.

## 29.3 AI evaluation fixtures

Create at least 20 transcript snippets:

- 8 explicit promises that should be accepted.
- 4 vague statements that should be rejected.
- 3 retrospective statements.
- 3 ordinary calls to action.
- 2 sponsor statements.

Create at least 50 comments:

- Direct follow-up requests.
- Generic praise.
- Subject-related but not requesting continuation.
- Sarcasm.
- Off-topic comments.

Track precision manually. For the hackathon, prioritize precision over recall: missing a possible story is better than presenting a fabricated one.

## 29.4 Media tests

- Render a known ten-second fixture.
- Validate output with ffprobe.
- Compare poster frame or selected frames against snapshots with tolerance.
- Test silent source.
- Test portrait source inside 16:9 frame.
- Test long comment truncation.
- Test Unicode and emoji rendering.

## 29.5 End-to-end test

A Playwright test should:

1. Use a fixture authenticated session.
2. Import a fixture video record.
3. Run analysis.
4. Confirm a candidate.
5. Upload fixture source media.
6. Select comments.
7. Start render.
8. Wait for completion.
9. Verify preview and download link.
10. Preview replies.

The final real YouTube write should remain a controlled manual acceptance test.

# 30. Acceptance criteria

## 30.1 Functional acceptance

- Creator can complete OAuth.
- Creator can select or paste one owned YouTube video.
- LORE can obtain a caption track or accept uploaded VTT/SRT.
- LORE imports real comments from that video.
- LORE proposes an explicit promise with an exact quote and timestamp.
- Creator can confirm or reject it.
- LORE displays at least three matched comments in the controlled demo.
- Creator can upload the matching source media.
- LORE renders a valid MP4 with the original clip, selected comments, and elapsed-time title.
- Creator can download the MP4.
- Creator can attach a real follow-up YouTube video.
- Creator can select original comment threads and edit reply drafts.
- LORE posts at least one real approved reply.
- LORE marks the story closed.

## 30.2 Trust acceptance

- No invented quote or timestamp reaches the UI.
- Every AI candidate has source evidence.
- Creator confirmation is required.
- Controlled demo data is disclosed.
- No YouTube media is downloaded.
- No automated mass reply occurs.
- Failed replies are displayed separately.

## 30.3 Demo acceptance

- Entire demo can be completed in under four minutes.
- No credentials are typed during recording.
- The callback MP4 plays immediately.
- At least one actual YouTube reply is visible after refresh.
- All fallback assets are prepared in case an external API is temporarily unavailable.

# 31. Controlled demo assets

## 31.1 Original video script

Title:

> I Tested a ₹500 Microphone for Seven Days — Day 1

Spoken content:

> This is a ₹500 microphone. I’m going to use it for every recording for the next seven days. After that, I’ll come back and tell you whether it is actually worth buying.

Target promise timestamp:

- Approximately 00:08–00:18.

## 31.2 Controlled comments

Use real comments from consenting test accounts:

- “How did the microphone perform after seven days?”
- “Are you still making the update?”
- “Please make part two. Did it survive?”
- One irrelevant control comment: “Nice lighting setup.”

The irrelevant comment proves the matcher does not classify everything as demand.

## 31.3 Follow-up video script

Title:

> I Used a ₹500 Microphone for Seven Days — The Result

Spoken content:

> Seven days later, the microphone still works, but the background noise is much worse than I expected. It is usable for calls, but I would not recommend it for serious video recording.

## 31.4 Expected callback

```text
00:00–00:04 Original promise clip
00:03–00:07 Three comment cards
00:07–00:09 “Seven days later…”
```

# 32. Three-minute demo script

## 0:00–0:20 — Start on YouTube

Open the original controlled video at the promise moment.

Play:

> “I’m going to use it for seven days… I’ll come back and tell you whether it is worth buying.”

Scroll to the follow-up comments.

Narration:

> Creators make promises inside videos, and viewers remember them months later. Finding the original moment, the audience demand, and the old footage is manual work.

## 0:20–0:40 — Open LORE

Show the opportunity:

```text
OPEN STORY DETECTED
Seven-day microphone test
Source: 00:08
Likely follow-up requests: 3
```

Click the source timestamp and briefly show the evidence.

Narration:

> LORE does not generate a generic idea. It cites a story this creator and audience already started.

## 0:40–1:00 — Confirm

Show exact transcript, matched comments, and irrelevant comment excluded.

Click Confirm story.

Narration:

> The model proposes the match. The creator confirms the meaning. That is the correctness boundary.

## 1:00–1:35 — Build callback

Show the uploaded source file, selected comments, and title card.

Click Render callback.

Play the finished MP4 immediately.

This is the main wow moment. Do not narrate over the entire clip.

## 1:35–2:00 — Explain the technical proof

Briefly show:

- Exact timestamp evidence.
- Caption source.
- Real comment IDs.
- Render output validation.

Narration:

> LORE uses creator-authorized captions and comments, creator-supplied source media, structured evidence checks, and deterministic video rendering.

## 2:00–2:35 — Close the loop

Attach the already published unlisted follow-up video.

Select two original comments. Show reply drafts. Click Apply replies.

Refresh the actual YouTube threads and show the replies.

## 2:35–2:55 — Timeline

Show:

```text
OPENED     August 6 — seven-day test promised
REQUESTED  3 viewer follow-ups
RENDERED   callback asset created
CLOSED     follow-up published and replies posted
```

## 2:55–3:00 — Final line

> The algorithm remembers performance. LORE remembers the story.

# 33. Devpost submission package

## 33.1 Project name

**LORE — The continuity editor for YouTube**

## 33.2 One-line description

LORE finds creator-confirmed unfinished stories in old videos, turns the original clip and viewer follow-up comments into a callback MP4, and closes the original comment threads when the follow-up is published.

## 33.3 Short write-up

Creators make promises and begin experiments inside videos, but months later the audience often remembers those story threads better than the creator. LORE imports a creator-owned video’s captions and comments, proposes an exact cited open story, and lets the creator confirm it. It then combines the original source clip and selected viewer comments into a ready-to-use callback MP4. After the follow-up is published, LORE posts approved replies to selected original commenters and marks the story closed. The hackathon build uses Next.js, TypeScript, PostgreSQL, the official YouTube Data API, structured AI extraction, FFmpeg, and Remotion.

## 33.4 Required repository contents

- README with exact setup.
- `.env.example`.
- Architecture diagram.
- Security and privacy notes.
- Demo-data disclosure.
- Local run instructions.
- Test command.
- Controlled demo seed script.
- License.
- Team contribution section.

## 33.5 Screenshots

Use these three:

1. Evidence-backed continuity opportunity.
2. Callback render preview.
3. Closed story with real reply statuses.

# 34. README structure

```text
# LORE
The continuity editor for YouTube

## What it does
## Why it exists
## Demo
## Exact v1 scope
## Architecture
## YouTube API usage
## Privacy and security
## Local setup
## Environment variables
## Running the worker
## Creating controlled demo data
## Tests
## Limitations
## Hackathon compliance
## Team
```

## 34.1 Essential setup commands

```bash
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm dev
pnpm worker
```

Provide a Docker Compose alternative when possible.

# 35. Environment variables

```text
DATABASE_URL=
REDIS_URL=
APP_BASE_URL=
SESSION_SECRET=
TOKEN_ENCRYPTION_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
YOUTUBE_API_KEY=
LLM_PROVIDER=
LLM_API_KEY=
OBJECT_STORAGE_ENDPOINT=
OBJECT_STORAGE_BUCKET=
OBJECT_STORAGE_ACCESS_KEY=
OBJECT_STORAGE_SECRET_KEY=
MEDIA_RETENTION_HOURS=24
MAX_UPLOAD_BYTES=
FFMPEG_PATH=ffmpeg
FFPROBE_PATH=ffprobe
```

Never commit real secrets.

# 36. Build plan to deadline

The published deadline of August 9 at 5:00 p.m. PDT corresponds to August 10 at 5:30 a.m. IST.

## August 6 — Foundation and assets

- Freeze v1 scope.
- Create repository and issue board.
- Record original and follow-up controlled videos.
- Publish original controlled video as unlisted.
- Add controlled comments.
- Configure Google Cloud OAuth and YouTube Data API.
- Scaffold Next.js, database, worker, and shared schemas.
- Implement OAuth and channel verification.

Exit condition: authenticated creator can import the controlled video metadata.

## August 7 — Ingestion and evidence

- Implement caption list/download and upload fallback.
- Implement VTT/SRT parsing.
- Import comments with pagination.
- Implement candidate extraction schema and evidence validator.
- Implement comment retrieval and classifier.
- Build opportunity UI and confirmation flow.

Exit condition: LORE proposes the exact promise and shows correct follow-up comments.

## August 8 — Media pipeline

- Implement source upload.
- Probe and validate media.
- Create one callback template.
- Implement FFmpeg normalization and Remotion render.
- Build render preview and download.
- Add deterministic render fixture test.

Exit condition: polished callback MP4 renders reliably from the controlled source.

## August 9 — Closure, QA, and submission

- Publish follow-up video manually as unlisted.
- Implement follow-up attachment and ownership verification.
- Implement full reply retrieval.
- Implement reply preview, approval, idempotency, and apply.
- Run complete end-to-end demo repeatedly.
- Record two-to-four-minute demo video despite its optional status.
- Finish README, screenshots, Devpost write-up, and team credits.
- Submit before the final hours.

Exit condition: real YouTube reply appears and story changes to CLOSED.

# 37. Coding-agent work allocation

Use coding agents to increase implementation speed, not to multiply scope.

## Agent A — Product and schema owner

Tasks:

- Database schema.
- API contracts.
- Shared Zod schemas.
- Story state machine.
- Acceptance tests.

## Agent B — YouTube integration owner

Tasks:

- OAuth.
- Channel ownership.
- Video import.
- Caption list/download.
- Comment pagination.
- Reply insertion.
- API fixtures.

## Agent C — AI and retrieval owner

Tasks:

- Transcript windowing.
- Candidate prompt.
- Evidence validator.
- Comment retrieval and matching.
- Evaluation fixtures.

## Agent D — Media and UI owner

Tasks:

- Source upload.
- FFmpeg probe and extraction.
- Remotion template.
- Render worker.
- Opportunity and closure UI.

For a solo build, run these as sequential branches or tightly scoped parallel worktrees. One human remains the architecture owner. Do not allow agents to independently redesign the stack.

# 38. Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Caption download unavailable | High | SRT/VTT upload fallback. |
| No source-video download API | High | Require creator-supplied original file. |
| Model hallucinates promise | Critical | Verbatim quote and timestamp validation plus creator confirmation. |
| Comment matching is noisy | High | Precision-first retrieval, show evidence, creator selection. |
| Render looks generic | Critical | One polished template, manually tune typography and timing. |
| YouTube OAuth fails in demo | High | Authenticate before recording; keep refresh token; prepare fixture-only fallback for explanation. |
| Reply API fails | Medium | Show per-thread status; retry only after refetch. |
| Controlled demo seems fake | High | Disclose controlled test scenario and prove real API writes. |
| Scope explosion | Critical | Freeze v1 and reject roadmap work. |
| Upload consumes time | Medium | Publish follow-up manually; do not implement `videos.insert`. |
| API quota exhausted | Medium | One video, cached reads, three replies maximum. |
| Media file too large | Medium | Short controlled clips and explicit limits. |

# 39. Judge objection handling

## “This is just transcript search.”

Response:

> Search waits for the creator to know what to ask. LORE proactively proposes a cited open story and converts it into a finished editing asset.

## “This is just a promise reminder.”

Response:

> Tracking is only the input. LORE connects the original clip, audience follow-up demand, callback rendering, publication, and public closure.

## “The AI may hallucinate.”

Response:

> Every proposal includes the exact quote, timestamp, source video, and supporting comments. The creator confirms it before rendering.

## “You staged the demo.”

Response:

> We created a controlled creator-owned scenario to test the complete workflow safely. The API calls, source extraction, MP4 render, and comment replies are real.

## “Why not just make a new video manually?”

Response:

> The creator still makes the follow-up. LORE removes the historical search, comment review, source retrieval, callback edit, credit selection, and thread closure.

## “Why would viewers care?”

Response:

> The product recognizes that the follow-up exists because viewers remembered and requested it. Closure makes the creator-audience relationship visible.

# 40. Claims policy

## Safe claims

- LORE proposed an open story from the transcript.
- The proposal includes an exact source timestamp.
- The creator confirmed the story.
- Three comments were classified and selected as follow-up requests.
- LORE rendered a callback MP4.
- A reply was posted to the original thread.
- The controlled scenario tested the full workflow.

## Unsafe claims

- LORE understands the creator’s entire history.
- The AI proved the story was unfinished.
- The comments prove market demand.
- The viewer received a notification.
- The viewer owns the video idea.
- LORE automatically creates the next video.
- LORE works on every YouTube channel.
- LORE can download any YouTube video.

# 41. Future roadmap

Only after the hackathon:

- Multi-video channel indexing.
- Predictions and outcome tracking.
- Changed-opinion callbacks.
- Recurring jokes and character continuity.
- Visual promise detection.
- Multiple callback templates.
- Editing integrations.
- Team collaboration.
- Comment permission workflows.
- Scheduled continuity reviews.
- Creator analytics for open and closed story threads.

Do not implement these before submission.

# 42. Definition of done

LORE is done for the hackathon when a judge can see:

1. A real creator-owned old video containing a spoken promise.
2. Real controlled comments asking for the follow-up.
3. LORE proposing the promise with exact evidence.
4. Creator confirmation.
5. A polished callback MP4 rendered from creator-supplied source media.
6. A real creator-owned follow-up video attached.
7. Approved replies posted to selected original comment threads.
8. The story timeline changing to CLOSED.
9. A repository that runs from documented instructions.
10. Tests proving evidence validation and media rendering.

Anything beyond that is optional and should not delay submission.

# 43. Final pitch

## Fifteen-second version

> LORE is the continuity editor for YouTube. It finds a promise or experiment buried in an old video, shows the exact viewers asking what happened next, and turns the original clip and comments into a callback MP4. When the follow-up is published, LORE replies to the original threads and closes the story.

## Thirty-second version

> YouTube gives creators analytics, but it does not give a channel memory. Creators make promises and begin experiments inside videos, and months later their viewers are still asking for the result. LORE imports a creator-owned video’s captions and comments, proposes an exact cited open story, and lets the creator confirm it. It then renders the original clip and selected viewer comments into a ready-to-use callback intro. After the follow-up is published, LORE posts approved replies to the original commenters and marks the story closed.

## Closing line

> The algorithm remembers performance. LORE remembers the story.

# 44. Official-source implementation notes

The following constraints are grounded in current official documentation as of August 6, 2026:

- The hackathon requires a working tool that performs a real result; the repository and README are required, while the two-to-four-minute demo video is optional.
- YouTube OAuth scopes determine which resources the application may read or change, and server-side applications should securely handle state, tokens, HTTPS, and redirect URIs.
- `commentThreads.list` retrieves comment threads and costs one quota unit per request.
- `comments.list(parentId=...)` retrieves replies for a top-level comment.
- `comments.insert` creates a reply using `snippet.parentId` and `snippet.textOriginal` and requires authorized scope.
- `captions.list` lists creator-authorized tracks; `captions.download` downloads a track and requires permission to edit the video.
- YouTube API developer policies prohibit downloading or storing copies of YouTube audiovisual content without prior written approval.
- Uploads through `videos.insert` from unverified API projects are restricted to private viewing, so v1 deliberately exports the callback and leaves publication to YouTube Studio.
- YouTube API requests consume quota, with a default combined allowance of 10,000 units per day for most endpoints.

# 45. Sources

1. YouTube Automation Hackathon, Devpost. https://youtube-automate-hackathon.devpost.com/
2. YouTube Data API: Implementing OAuth 2.0 Authorization. https://developers.google.com/youtube/v3/guides/authentication
3. YouTube Data API: OAuth 2.0 for Web Server Applications. https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps
4. YouTube Data API: CommentThreads.list. https://developers.google.com/youtube/v3/docs/commentThreads/list
5. YouTube Data API: Comments.list. https://developers.google.com/youtube/v3/docs/comments/list
6. YouTube Data API: Comments.insert. https://developers.google.com/youtube/v3/docs/comments/insert
7. YouTube Data API: Comments implementation guide. https://developers.google.com/youtube/v3/guides/implementation/comments
8. YouTube Data API: Captions.list. https://developers.google.com/youtube/v3/docs/captions/list
9. YouTube Data API: Captions.download. https://developers.google.com/youtube/v3/docs/captions/download
10. YouTube Data API: Videos.list. https://developers.google.com/youtube/v3/docs/videos/list
11. YouTube Data API: Videos.insert. https://developers.google.com/youtube/v3/docs/videos/insert
12. YouTube Data API quota calculator. https://developers.google.com/youtube/v3/determine_quota_cost
13. YouTube API Services Developer Policies. https://developers.google.com/youtube/terms/developer-policies

# 46. Final instruction

Freeze this document as the product contract.

Build one promise, one set of comments, one callback template, one real rendered MP4, one attached follow-up, and selected real replies.

Do not add features until the complete loop works repeatedly.
