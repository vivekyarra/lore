# YouTube API quota plan

LORE analyzes one selected video, never a whole channel. Typical demo operations are low-cost list calls: channel verification, one video lookup, caption listing/downloading, and paginated comment threads. Reply insertion is limited to the creator-selected targets (maximum three).

Safeguards:

- no Search API use;
- comment pagination stops at 500 top-level threads;
- one selected video at a time;
- no polling of YouTube resources;
- no automatic retries of ambiguous writes;
- no video upload or YouTube media download;
- identical media render inputs reuse a deterministic fingerprint and filename.
