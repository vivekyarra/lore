# Lore — The continuity editor for YouTube

LORE finds creator-confirmed unfinished stories in old videos, turns the original clip and viewer follow-up comments into a callback MP4, and closes the original comment threads when the follow-up is published.

Creators make promises and begin experiments inside videos, but months later the audience often remembers those threads better than the creator. LORE imports a creator-owned video's captions and comments, proposes one exact cited open story, and lets the creator confirm it. It combines creator-supplied source footage and up to three selected comments into a real callback MP4. After the follow-up is published through YouTube Studio, LORE posts only the replies the creator reviewed and approved.

The build uses Next.js, React, TypeScript, the official Google/YouTube APIs, evidence-constrained extraction, deterministic matching, FFmpeg, Zod, Vitest, and Docker. It never downloads YouTube audiovisual content, never presents an unverified model suggestion as fact, and never performs a mass reply.

The controlled scenario is disclosed as controlled test data. It exists so every stage can be exercised safely and repeatedly; organic audience demand is not claimed.
