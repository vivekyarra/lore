"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Circle,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  Film,
  FolderOpen,
  History,
  Home,
  Link2,
  LoaderCircle,
  LogOut,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  WandSparkles,
  X,
  Youtube,
} from "lucide-react";
import type { LoreState, ReplyRecord } from "@/lib/types";

type Step = "evidence" | "callback" | "publication" | "closure";
type Surface =
  | "search"
  | "stories"
  | "recent"
  | "settings"
  | "profile"
  | "story-menu"
  | "new-story"
  | "disconnect"
  | null;
type Asset = {
  assetId: string;
  extension: ".mp4" | ".mov" | ".m4v";
  probe: { durationSeconds: number; width: number; height: number };
};
type OwnedVideo = {
  id: string;
  title: string;
  publishedAt: string | null;
  thumbnailUrl: string | null;
};

const steps: Array<{ id: Step; label: string }> = [
  { id: "evidence", label: "Review evidence" },
  { id: "callback", label: "Build callback" },
  { id: "publication", label: "Add follow-up" },
  { id: "closure", label: "Close the loop" },
];

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error(
      "Lore lost its local connection. Start Lore with Lore.cmd, then reload this page.",
    );
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(body.error ?? `Request failed (${response.status})`);
  return body as T;
}

export default function LoreApp() {
  const [state, setState] = useState<LoreState | null>(null);
  const [step, setStep] = useState<Step>("evidence");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [asset, setAsset] = useState<Asset | null>(null);
  const [followUp, setFollowUp] = useState("https://youtu.be/LOREdemo001");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [mobileNav, setMobileNav] = useState(false);
  const [surface, setSurface] = useState<Surface>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const refresh = useCallback(
    async () => setState(await api<LoreState>("/api/state")),
    [],
  );
  useEffect(() => {
    refresh().catch((reason) => setError(String(reason)));
  }, [refresh]);
  useEffect(() => {
    if (state?.replies.length)
      setReplyDrafts(
        Object.fromEntries(
          state.replies.map((reply) => [reply.id, reply.draftText]),
        ),
      );
  }, [state?.replies]);
  useEffect(() => {
    const status = state?.story?.status;
    if (status === "CONFIRMED") setStep("callback");
    else if (status === "RENDERED") setStep("publication");
    else if (status === "PUBLISHED" || status === "CLOSED") setStep("closure");
  }, [state?.story?.status]);
  useEffect(() => {
    document
      .querySelector(".workspace-body")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  async function act(
    label: string,
    url: string,
    options: RequestInit = { method: "POST" },
  ) {
    setBusy(label);
    setError(null);
    try {
      const next = await api<LoreState>(url, options);
      setState(next);
      return next;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
      throw reason;
    } finally {
      setBusy(null);
    }
  }

  const selectedCount = useMemo(
    () =>
      state?.video?.comments.filter((comment) => comment.selected).length ?? 0,
    [state],
  );
  const unlocked = state ? unlockedSteps(state.story?.status) : 1;
  const storyTitle =
    state?.video?.candidate?.title ?? state?.video?.title ?? "New story";

  function openStory(target: Step = "evidence") {
    setStep(target);
    setSurface(null);
    setMobileNav(false);
  }
  async function startNewStory() {
    await act("Starting new story", "/api/story/new");
    setAsset(null);
    setStep("evidence");
    setSurface(null);
    setNotice("A fresh story workspace is ready.");
  }
  async function refreshWorkspace() {
    await refresh();
    setSurface(null);
    setNotice("Workspace refreshed.");
  }
  async function copyText(value: string, message: string) {
    await navigator.clipboard.writeText(value);
    setSurface(null);
    setNotice(message);
  }
  async function disconnectYouTube() {
    await act("Disconnecting YouTube", "/api/auth/youtube/disconnect");
    setSurface(null);
    setStep("evidence");
    setNotice(
      "YouTube was disconnected and the encrypted credential was removed.",
    );
  }

  if (!state)
    return (
      <div className="boot">
        <div className="brand-symbol">L</div>
        <LoaderCircle className="spin" size={20} />
        <span>Opening Lore</span>
      </div>
    );

  return (
    <div className="app-shell">
      <aside className={`app-sidebar ${mobileNav ? "is-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-symbol">L</div>
          <span>Lore</span>
          <button className="mobile-close" onClick={() => setMobileNav(false)}>
            ×
          </button>
        </div>
        <button className="new-story" onClick={() => setSurface("new-story")}>
          <Plus size={16} /> New story
        </button>
        <nav className="primary-nav">
          <button
            className={!surface ? "active" : ""}
            onClick={() => openStory()}
          >
            <Home size={17} /> Home
          </button>
          <button
            className={surface === "stories" ? "active" : ""}
            onClick={() => {
              setSurface("stories");
              setMobileNav(false);
            }}
          >
            <FolderOpen size={17} /> Stories <span>{state.video ? 1 : 0}</span>
          </button>
          <button
            className={surface === "recent" ? "active" : ""}
            onClick={() => {
              setSurface("recent");
              setMobileNav(false);
            }}
          >
            <History size={17} /> Recent
          </button>
        </nav>
        <div className="nav-section">
          <p>Open stories</p>
          {state.video ? (
            <button className="story-nav active" onClick={() => openStory()}>
              <span className="story-thumb">
                <Film size={15} />
              </span>
              <span>
                <strong>{storyTitle}</strong>
                <small>
                  {state.story?.status === "CLOSED" ? "Closed" : "In progress"}
                </small>
              </span>
            </button>
          ) : (
            <button
              className="story-nav empty"
              onClick={() => setSurface("new-story")}
            >
              <span className="story-thumb">
                <Plus size={15} />
              </span>
              <span>
                <strong>Start a story</strong>
                <small>Choose a video</small>
              </span>
            </button>
          )}
        </div>
        <div className="sidebar-spacer" />
        <div className="privacy-note">
          <ShieldCheck size={15} />
          <span>Your source media stays private.</span>
        </div>
        <button className="account-row" onClick={() => setSurface("profile")}>
          <span className="avatar">
            {state.channel?.title?.slice(0, 1) ?? "V"}
          </span>
          <span>
            <strong>{state.channel?.title ?? "Lore creator"}</strong>
            <small>
              {state.mode === "demo"
                ? "Controlled workspace"
                : "YouTube connected"}
            </small>
          </span>
          <MoreHorizontal size={16} />
        </button>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <button className="mobile-menu" onClick={() => setMobileNav(true)}>
            <Menu size={19} />
          </button>
          <div className="breadcrumb">
            <span>Stories</span>
            <b>/</b>
            <strong>{storyTitle}</strong>
          </div>
          <div className="header-actions">
            <span className={`mode-badge ${state.mode}`}>
              {state.mode === "demo" ? "Controlled demo" : "Live YouTube"}
            </span>
            <button
              className="icon-button"
              title="Search"
              aria-label="Search"
              onClick={() => setSurface("search")}
            >
              <Search size={17} />
            </button>
            <button
              className="icon-button"
              title="Settings"
              aria-label="Settings"
              onClick={() => setSurface("settings")}
            >
              <Settings size={17} />
            </button>
            {state.mode === "demo" ? (
              <a className="connect-button" href="/api/auth/youtube/start">
                <Youtube size={16} /> Connect YouTube
              </a>
            ) : (
              <button
                className="connect-button subtle"
                onClick={() => setSurface("profile")}
              >
                <Check size={15} /> Connected
              </button>
            )}
          </div>
        </header>

        {error && (
          <div className="toast-error">
            <span>{error}</span>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}
        {notice && (
          <div className="toast-notice">
            <Check size={15} />
            <span>{notice}</span>
            <button onClick={() => setNotice(null)}>Dismiss</button>
          </div>
        )}

        <section className="story-header">
          <div>
            <div className="title-line">
              <h1>{storyTitle}</h1>
              <StatusPill status={state.story?.status ?? "PROPOSED"} />
            </div>
            <p>
              Turn an old promise into a callback your audience will recognize.
            </p>
          </div>
          <button
            className="more-button"
            aria-label="Story actions"
            onClick={() => setSurface("story-menu")}
          >
            <MoreHorizontal size={18} />
          </button>
        </section>

        <nav className="stepper" aria-label="Story progress">
          {steps.map((item, index) => (
            <button
              key={item.id}
              disabled={index >= unlocked}
              className={`${step === item.id ? "active" : ""} ${index < unlocked - 1 ? "complete" : ""}`}
              onClick={() => {
                setStep(item.id);
                setMobileNav(false);
              }}
            >
              <span>
                {index < unlocked - 1 ? <Check size={13} /> : index + 1}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="workspace-body">
          {step === "evidence" && (
            <Evidence
              state={state}
              busy={busy}
              onToggle={async (id, selected) => {
                await act("Saving", `/api/comments/${id}/select`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ selected }),
                });
              }}
              onConfirm={() => act("Confirming story", "/api/story/confirm")}
              onReset={() => act("Resetting demo", "/api/demo/reset")}
              onImportVideo={(url) =>
                act("Importing video", "/api/youtube/video/import", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ url }),
                })
              }
              onImportCaptions={() =>
                act("Importing captions", "/api/youtube/captions/import")
              }
              onUploadTranscript={async (file) => {
                const form = new FormData();
                form.append("transcript", file);
                await act("Uploading transcript", "/api/transcript/upload", {
                  method: "POST",
                  body: form,
                });
              }}
              onAnalyze={() => act("Finding story", "/api/analyze")}
              onImportComments={() =>
                act("Importing comments", "/api/youtube/comments/import")
              }
              onNotice={setNotice}
            />
          )}
          {step === "callback" && (
            <Callback
              state={state}
              asset={asset}
              selectedCount={selectedCount}
              busy={busy}
              onUpload={async (file) => {
                setBusy("Checking source");
                setError(null);
                try {
                  const form = new FormData();
                  form.append("source", file);
                  const result = await api<Asset>("/api/media/upload", {
                    method: "POST",
                    body: form,
                  });
                  setAsset({
                    ...result,
                    extension: file.name.toLowerCase().endsWith(".mov")
                      ? ".mov"
                      : ".mp4",
                  });
                } catch (reason) {
                  setError(
                    reason instanceof Error ? reason.message : String(reason),
                  );
                } finally {
                  setBusy(null);
                }
              }}
              onDemoSource={async () => {
                setBusy("Preparing source");
                setError(null);
                try {
                  setAsset(
                    await api<Asset>("/api/demo/source", { method: "POST" }),
                  );
                } catch (reason) {
                  setError(
                    reason instanceof Error ? reason.message : String(reason),
                  );
                } finally {
                  setBusy(null);
                }
              }}
              onRender={async (titleCard) => {
                if (!asset) return;
                await act("Rendering callback", "/api/render", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    assetId: asset.assetId,
                    extension: asset.extension,
                    titleCard,
                    anonymized: true,
                  }),
                });
              }}
              onNotice={setNotice}
            />
          )}
          {step === "publication" && (
            <Publication
              state={state}
              value={followUp}
              setValue={setFollowUp}
              busy={busy}
              onContinue={() =>
                act("Verifying follow-up", "/api/story/follow-up", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ url: followUp }),
                })
              }
            />
          )}
          {step === "closure" && (
            <Closure
              state={state}
              drafts={replyDrafts}
              setDrafts={setReplyDrafts}
              busy={busy}
              onApply={() =>
                act("Posting replies", "/api/replies/apply", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    replies: state.replies.map((reply) => ({
                      id: reply.id,
                      draftText: replyDrafts[reply.id] ?? reply.draftText,
                      approved: reply.status === "PENDING",
                    })),
                  }),
                })
              }
              onClose={() => act("Closing story", "/api/story/close")}
            />
          )}
        </div>
      </main>
      {surface && (
        <WorkspaceSurface
          kind={surface}
          state={state}
          storyTitle={storyTitle}
          onClose={() => setSurface(null)}
          onOpenStory={openStory}
          onNewStory={startNewStory}
          onRefresh={refreshWorkspace}
          onDisconnect={disconnectYouTube}
          onSwitch={(next) => setSurface(next)}
          onCopy={copyText}
        />
      )}
    </div>
  );
}

function Evidence(props: {
  state: LoreState;
  busy: string | null;
  onToggle: (id: string, selected: boolean) => Promise<void>;
  onConfirm: () => Promise<unknown>;
  onReset: () => Promise<unknown>;
  onImportVideo: (url: string) => Promise<unknown>;
  onImportCaptions: () => Promise<unknown>;
  onUploadTranscript: (file: File) => Promise<void>;
  onAnalyze: () => Promise<unknown>;
  onImportComments: () => Promise<unknown>;
  onNotice: (message: string) => void;
}) {
  const { state, busy } = props;
  const video = state.video;
  const candidate = video?.candidate;
  if (state.mode === "live" && (!video || !candidate || !video.comments.length))
    return <LiveSetup {...props} video={video} />;
  if (!video || !candidate)
    return (
      <EmptyState
        icon={<Sparkles />}
        title="No open story yet"
        body="Bring in one creator-owned video and Lore will look for a promise worth continuing."
        action="Restore demo story"
        onAction={props.onReset}
      />
    );
  const selected = video.comments.filter((comment) => comment.selected).length;
  const locked = state.story?.status !== "PROPOSED";
  return (
    <div className="evidence-layout">
      <section className="media-column">
        <div className="panel-heading">
          <div>
            <span className="kicker">Original moment</span>
            <h2>{video.title}</h2>
          </div>
          {state.mode === "live" ? (
            <a
              className="ghost-button"
              href={`https://www.youtube.com/watch?v=${video.youtubeVideoId}&t=${Math.floor(candidate.startMs / 1000)}s`}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={15} /> Open on YouTube
            </a>
          ) : (
            <button
              className="ghost-button"
              onClick={() =>
                props.onNotice(
                  "Controlled demo media has no public YouTube URL.",
                )
              }
            >
              <ExternalLink size={15} /> Demo source
            </button>
          )}
        </div>
        <div className="source-player">
          {state.mode === "demo" ? (
            <video
              controls
              preload="metadata"
              src="/api/demo/source/media#t=8.4"
            />
          ) : (
            <iframe
              title="YouTube source moment"
              src={`https://www.youtube.com/embed/${video.youtubeVideoId}?start=${Math.floor(candidate.startMs / 1000)}`}
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
          <div className="source-label">
            <span className="pulse" /> Cited at {formatMs(candidate.startMs)}
          </div>
        </div>
        <div className="evidence-card">
          <div className="quote-icon">“</div>
          <div>
            <p>{candidate.quote}</p>
            <div className="evidence-meta">
              <span>
                <Check size={13} /> Exact transcript match
              </span>
              <span>
                {formatMs(candidate.startMs)} – {formatMs(candidate.endMs)}
              </span>
              <span>{video.transcriptSource.replaceAll("_", " ")}</span>
            </div>
          </div>
        </div>
        <div className="micro-timeline">
          <div className="timeline-ruler">
            <span>00:00</span>
            <span>00:08</span>
            <span>00:18</span>
            <span>00:26</span>
          </div>
          <div className="timeline-track">
            <span className="story-window" />
            <i className="playhead" />
          </div>
          <p>Lore found one explicit return commitment in this video.</p>
        </div>
      </section>
      <aside className="review-panel">
        <div className="review-head">
          <div>
            <span className="kicker">Audience signal</span>
            <h2>
              {
                video.comments.filter(
                  (c) => c.matchDecision === "follow_up_request",
                ).length
              }{" "}
              viewers asked
            </h2>
          </div>
          <span className="selection-count">{selected}/3 selected</span>
        </div>
        <p className="supporting-copy">
          Choose the comments that belong in the callback. Lore leaves unrelated
          comments out.
        </p>
        <div className="comment-list">
          {video.comments.map((comment) => (
            <label
              key={comment.id}
              className={`comment-card ${comment.selected ? "selected" : ""} ${comment.matchDecision !== "follow_up_request" ? "excluded" : ""}`}
            >
              <input
                type="checkbox"
                checked={comment.selected}
                disabled={
                  locked ||
                  comment.matchDecision !== "follow_up_request" ||
                  Boolean(busy)
                }
                onChange={() => props.onToggle(comment.id, !comment.selected)}
              />
              <span className="comment-avatar">
                {comment.author.slice(1, 2).toUpperCase()}
              </span>
              <span className="comment-body">
                <strong>{comment.author}</strong>
                <span>{comment.text}</span>
                <small>
                  {comment.matchDecision === "follow_up_request"
                    ? "Matches this story"
                    : "Not about the follow-up"}
                </small>
              </span>
              {comment.selected && (
                <Check className="selected-check" size={15} />
              )}
            </label>
          ))}
        </div>
        <div className="review-footer">
          <div className="human-check">
            <UserRound size={16} />
            <span>
              <strong>You make the call.</strong>
              <small>Lore never confirms a story for you.</small>
            </span>
          </div>
          <button
            className="primary-action"
            disabled={locked || !selected || Boolean(busy)}
            onClick={props.onConfirm}
          >
            {busy ? (
              <LoaderCircle className="spin" size={17} />
            ) : (
              <Check size={17} />
            )}
            {locked
              ? `Story ${state.story?.status.toLowerCase()}`
              : (busy ?? "Confirm this story")}
            <ArrowRight size={16} />
          </button>
        </div>
      </aside>
    </div>
  );
}

function LegacyCallback({
  state,
  asset,
  selectedCount,
  busy,
  onUpload,
  onDemoSource,
  onRender,
  onNotice,
}: {
  state: LoreState;
  asset: Asset | null;
  selectedCount: number;
  busy: string | null;
  onUpload: (file: File) => Promise<void>;
  onDemoSource: () => Promise<void>;
  onRender: (title: string) => Promise<void>;
  onNotice: (message: string) => void;
}) {
  const [title, setTitle] = useState("Seven days later…");
  const [zoom, setZoom] = useState(100);
  const render = state.render;
  function preview() {
    const video = document.querySelector<HTMLVideoElement>(
      ".video-canvas video",
    );
    if (!video) {
      onNotice("Render the callback first to play the real MP4 preview.");
      return;
    }
    if (video.paused) void video.play();
    else video.pause();
  }
  function rewind() {
    const video = document.querySelector<HTMLVideoElement>(
      ".video-canvas video",
    );
    if (!video) {
      onNotice("Render the callback first to use playback controls.");
      return;
    }
    video.currentTime = Math.max(0, video.currentTime - 2);
  }
  return (
    <div className="editor-layout">
      <section className="editor-stage">
        <div className="stage-toolbar">
          <span>
            <Circle size={8} fill="currentColor" /> Callback preview
          </span>
          <div>
            <button onClick={preview}>
              <Play size={14} /> Preview
            </button>
            <button
              aria-label="Preview details"
              onClick={() =>
                onNotice(
                  render
                    ? "The rendered MP4 is available in the preview and download panel."
                    : "The preview uses the uploaded source, title card, and selected comments.",
                )
              }
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
        <div className="canvas-wrap">
          <div className="video-canvas">
            {render?.status === "COMPLETED" ? (
              <video
                controls
                preload="metadata"
                src={`/api/renders/${render.id}/media`}
              />
            ) : (
              <div className="canvas-placeholder">
                <div className="promise-frame">
                  <span>Previously</span>
                  <strong>
                    “I’ll come back and tell you
                    <br />
                    whether it’s worth buying.”
                  </strong>
                  <small>00:08 · Original video</small>
                </div>
                <div className="floating-comment one">
                  How did it perform after seven days?
                </div>
                <div className="floating-comment two">
                  Please make part two. Did it survive?
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="editor-timeline">
          <div className="timeline-tools">
            <button aria-label="Rewind two seconds" onClick={rewind}>
              <ArrowLeft size={14} />
            </button>
            <button aria-label="Play preview" onClick={preview}>
              <Play size={14} fill="currentColor" />
            </button>
            <span>00:00 / 00:10</span>
            <span className="timeline-spacer" />
            <button
              aria-label="Zoom timeline out"
              onClick={() => setZoom((value) => Math.max(75, value - 25))}
            >
              −
            </button>
            <span>{zoom}%</span>
            <button
              aria-label="Zoom timeline in"
              onClick={() => setZoom((value) => Math.min(200, value + 25))}
            >
              +
            </button>
          </div>
          <div className="timeline-zoom" style={{ width: `${zoom}%` }}>
            <div className="track-row">
              <label>Video</label>
              <div className="track">
                <span className="clip-block source">Original promise</span>
                <span className="clip-block title">Seven days later</span>
              </div>
            </div>
            <div className="track-row">
              <label>Comments</label>
              <div className="track">
                <span className="clip-block comments">
                  {selectedCount} audience comments
                </span>
              </div>
            </div>
            <div className="track-row">
              <label>Audio</label>
              <div className="track waveform" />
            </div>
          </div>
        </div>
      </section>
      <aside className="inspector">
        <div className="inspector-head">
          <h2>Callback</h2>
          <button
            aria-label="Inspector details"
            onClick={() =>
              onNotice(
                `Output is 16:9 with anonymous credit and ${selectedCount} selected audience ${selectedCount === 1 ? "comment" : "comments"}.`,
              )
            }
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
        <div className="inspector-section">
          <label>Source media</label>
          {asset ? (
            <div className="asset-row">
              <span className="asset-icon">
                <Film size={17} />
              </span>
              <span>
                <strong>Creator source.mp4</strong>
                <small>
                  {asset.probe.durationSeconds.toFixed(1)} sec ·{" "}
                  {asset.probe.width}×{asset.probe.height}
                </small>
              </span>
              <Check size={16} />
            </div>
          ) : (
            <>
              <label className="upload-zone">
                <Upload size={20} />
                <strong>Drop your original video</strong>
                <span>MP4 or MOV · up to 500 MB</span>
                <input
                  type="file"
                  accept="video/mp4,video/quicktime"
                  onChange={(event) =>
                    event.target.files?.[0] && onUpload(event.target.files[0])
                  }
                />
              </label>
              {state.mode === "demo" && (
                <button className="secondary-action" onClick={onDemoSource}>
                  <WandSparkles size={16} /> Use demo source
                </button>
              )}
            </>
          )}
        </div>
        <div className="inspector-section">
          <label>Title card</label>
          <input
            className="text-field"
            value={title}
            maxLength={80}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div className="setting-row">
            <span>
              <strong>Comment credit</strong>
              <small>Protect viewer identity by default</small>
            </span>
            <span className="choice-pill">Anonymous</span>
          </div>
          <div className="setting-row">
            <span>
              <strong>Format</strong>
              <small>YouTube landscape</small>
            </span>
            <span>16:9</span>
          </div>
        </div>
        <div className="inspector-note">
          <ShieldCheck size={15} />
          <span>
            Lore uses only the source file you provide. It never downloads your
            YouTube video.
          </span>
        </div>
        <div className="inspector-footer">
          {render?.status === "COMPLETED" ? (
            <>
              <div className="render-ready">
                <Check size={16} />
                <span>
                  <strong>Callback ready</strong>
                  <small>10 sec · 1080p · H.264</small>
                </span>
              </div>
              <a
                className="primary-action"
                href={`/api/renders/${render.id}/download`}
              >
                <Download size={17} /> Download MP4
              </a>
            </>
          ) : (
            <button
              className="primary-action"
              disabled={!asset || Boolean(busy)}
              onClick={() => onRender(title)}
            >
              {busy ? (
                <LoaderCircle className="spin" size={17} />
              ) : (
                <Sparkles size={17} />
              )}
              {busy ?? "Render callback"}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

function Callback({
  state,
  asset,
  selectedCount,
  busy,
  onUpload,
  onDemoSource,
  onRender,
  onNotice,
}: {
  state: LoreState;
  asset: Asset | null;
  selectedCount: number;
  busy: string | null;
  onUpload: (file: File) => Promise<void>;
  onDemoSource: () => Promise<void>;
  onRender: (title: string) => Promise<void>;
  onNotice: (message: string) => void;
}) {
  useEffect(() => {
    if (state.render?.status === "COMPLETED")
      onNotice("The rendered MP4 is ready for playback and download.");
  }, [state.render?.status, onNotice]);
  return (
    <LegacyCallback
      state={state}
      asset={asset}
      selectedCount={selectedCount}
      busy={busy}
      onUpload={onUpload}
      onDemoSource={onDemoSource}
      onRender={onRender}
      onNotice={onNotice}
    />
  );
}

function Publication({
  state,
  value,
  setValue,
  busy,
  onContinue,
}: {
  state: LoreState;
  value: string;
  setValue: (value: string) => void;
  busy: string | null;
  onContinue: () => Promise<unknown>;
}) {
  return (
    <div className="centered-flow">
      <div className="flow-icon youtube">
        <Youtube size={26} />
      </div>
      <span className="kicker">Follow-up published?</span>
      <h2>Bring the new video back to Lore.</h2>
      <p>
        Publish with YouTube Studio as usual, then paste the link. Lore will
        connect it to the original story.
      </p>
      <div className="url-field">
        <Link2 size={18} />
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Paste your YouTube link"
        />
        <button
          className="primary-action"
          disabled={Boolean(busy) || !value.includes("youtu")}
          onClick={onContinue}
        >
          {busy ? <LoaderCircle className="spin" size={16} /> : null}
          {busy ??
            (state.mode === "live" ? "Verify video" : "Continue with demo")}
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="flow-assurance">
        <div>
          <Check size={15} />
          <span>
            Lore checks that the video belongs to your connected channel.
          </span>
        </div>
        <div>
          <Check size={15} />
          <span>Lore never uploads or publishes a video for you.</span>
        </div>
      </div>
      <div className="mini-video-card">
        <div className="mini-thumb">
          <Play size={18} fill="currentColor" />
        </div>
        <div>
          <small>Original story</small>
          <strong>I Tested a ₹500 Microphone for Seven Days</strong>
          <span>Ready to connect to its follow-up</span>
        </div>
      </div>
    </div>
  );
}

function Closure({
  state,
  drafts,
  setDrafts,
  busy,
  onApply,
  onClose,
}: {
  state: LoreState;
  drafts: Record<string, string>;
  setDrafts: (value: Record<string, string>) => void;
  busy: string | null;
  onApply: () => Promise<unknown>;
  onClose: () => Promise<unknown>;
}) {
  const finalized = state.replies.every((reply) => reply.status !== "PENDING");
  const closed = state.story?.status === "CLOSED";
  return (
    <div className="closure-layout">
      <section className="thread-panel">
        <div className="panel-heading">
          <div>
            <span className="kicker">Original threads</span>
            <h2>Return to the people who asked.</h2>
          </div>
          <span className="selection-count">
            {state.replies.length} replies
          </span>
        </div>
        <p className="supporting-copy">
          Review every message. Nothing is posted until you approve it.
        </p>
        <div className="reply-list">
          {state.replies.map((reply) => (
            <ReplyEditor
              key={reply.id}
              reply={reply}
              state={state}
              draft={drafts[reply.id] ?? reply.draftText}
              onDraft={(value) => setDrafts({ ...drafts, [reply.id]: value })}
            />
          ))}
        </div>
      </section>
      <aside className="close-panel">
        {closed ? (
          <div className="closed-state">
            <div className="success-ring">
              <Check size={30} />
            </div>
            <span className="kicker">Story complete</span>
            <h2>The loop is closed.</h2>
            <p>
              The follow-up is connected and every selected thread has a
              recorded outcome.
            </p>
            <div className="story-path">
              <span className="done">
                <Check size={13} />
              </span>
              <div>
                <strong>Promise found</strong>
                <small>Exact source at 00:08</small>
              </div>
              <i />
              <span className="done">
                <Check size={13} />
              </span>
              <div>
                <strong>Callback rendered</strong>
                <small>10-second MP4</small>
              </div>
              <i />
              <span className="done">
                <Check size={13} />
              </span>
              <div>
                <strong>Follow-up connected</strong>
                <small>Story resolved</small>
              </div>
            </div>
          </div>
        ) : (
          <>
            <span className="kicker">Final review</span>
            <h2>{finalized ? "Ready to close." : "Ready to reply."}</h2>
            <p>
              {state.mode === "demo"
                ? "Demo replies are recorded as simulated and are never sent to YouTube."
                : "Replies post one at a time. A failed reply will not hide the successful ones."}
            </p>
            <div className="summary-box">
              <div>
                <span>Follow-up</span>
                <strong>Connected</strong>
              </div>
              <div>
                <span>Selected threads</span>
                <strong>{state.replies.length}</strong>
              </div>
              <div>
                <span>Mode</span>
                <strong>{state.mode === "demo" ? "Simulated" : "Live"}</strong>
              </div>
            </div>
            {!finalized ? (
              <button
                className="primary-action"
                disabled={Boolean(busy)}
                onClick={onApply}
              >
                {busy ? (
                  <LoaderCircle className="spin" size={17} />
                ) : (
                  <MessageSquare size={17} />
                )}
                {busy ?? "Approve and post replies"}
              </button>
            ) : (
              <button
                className="primary-action"
                disabled={Boolean(busy)}
                onClick={onClose}
              >
                {busy ? (
                  <LoaderCircle className="spin" size={17} />
                ) : (
                  <Check size={17} />
                )}
                {busy ?? "Mark story closed"}
              </button>
            )}
            <small className="safe-copy">
              <ShieldCheck size={13} /> You stay in control of every public
              action.
            </small>
          </>
        )}
      </aside>
    </div>
  );
}

function ReplyEditor({
  reply,
  state,
  draft,
  onDraft,
}: {
  reply: ReplyRecord;
  state: LoreState;
  draft: string;
  onDraft: (value: string) => void;
}) {
  const comment = state.video?.comments.find(
    (item) => item.id === reply.commentId,
  );
  return (
    <article className="reply-editor">
      <div className="reply-top">
        <span className="comment-avatar">
          {comment?.author.slice(1, 2).toUpperCase()}
        </span>
        <div>
          <strong>{comment?.author}</strong>
          <p>{comment?.text}</p>
        </div>
        <ReplyStatus status={reply.status} />
      </div>
      <div className="reply-compose">
        <span className="reply-line" />
        <span className="avatar creator">L</span>
        <textarea
          value={draft}
          disabled={reply.status !== "PENDING"}
          onChange={(event) => onDraft(event.target.value)}
        />
        <span className="character-count">{draft.length}/500</span>
      </div>
    </article>
  );
}

function LiveSetup(props: {
  video: LoreState["video"];
  busy: string | null;
  onImportVideo: (url: string) => Promise<unknown>;
  onImportCaptions: () => Promise<unknown>;
  onUploadTranscript: (file: File) => Promise<void>;
  onAnalyze: () => Promise<unknown>;
  onImportComments: () => Promise<unknown>;
}) {
  const [url, setUrl] = useState("");
  const [recentVideos, setRecentVideos] = useState<OwnedVideo[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const stage = !props.video
    ? 0
    : !props.video.transcript.length
      ? 1
      : !props.video.candidate
        ? 2
        : 3;
  useEffect(() => {
    if (stage !== 0) return;
    setVideosLoading(true);
    api<OwnedVideo[]>("/api/youtube/videos")
      .then(setRecentVideos)
      .catch(() => setRecentVideos([]))
      .finally(() => setVideosLoading(false));
  }, [stage]);
  const configs = [
    {
      icon: <Youtube />,
      title: "Choose an old video",
      copy: "Paste a video from your connected channel. Lore verifies ownership before continuing.",
    },
    {
      icon: <Film />,
      title: "Add the transcript",
      copy: "Use your YouTube captions or upload a timestamped VTT/SRT file.",
    },
    {
      icon: <Sparkles />,
      title: "Find the open story",
      copy: "Lore looks for one explicit promise and checks the quote against the source.",
    },
    {
      icon: <MessageSquare />,
      title: "Find the viewers waiting",
      copy: "Import comments and match only the requests that belong to this story.",
    },
  ];
  const current = configs[stage];
  return (
    <div className="setup-flow">
      <div className="setup-progress">
        {configs.map((item, index) => (
          <div
            key={item.title}
            className={index < stage ? "done" : index === stage ? "active" : ""}
          >
            <span>{index < stage ? <Check size={13} /> : index + 1}</span>
            <small>{item.title}</small>
          </div>
        ))}
      </div>
      <div
        className={`setup-card ${stage === 0 && recentVideos.length ? "wide" : ""}`}
      >
        <div className="flow-icon">{current.icon}</div>
        <span className="kicker">Step {stage + 1} of 4</span>
        <h2>{current.title}</h2>
        <p>{current.copy}</p>
        {stage === 0 && (
          <>
            {videosLoading && (
              <div className="video-loading">
                <LoaderCircle className="spin" size={16} /> Loading your recent
                uploads…
              </div>
            )}
            {recentVideos.length > 0 && (
              <div className="owned-video-grid">
                {recentVideos.map((video) => (
                  <button
                    key={video.id}
                    disabled={Boolean(props.busy)}
                    onClick={() => props.onImportVideo(video.id)}
                  >
                    {video.thumbnailUrl ? (
                      <img src={video.thumbnailUrl} alt="" />
                    ) : (
                      <span className="missing-thumb">
                        <Film size={20} />
                      </span>
                    )}
                    <span>
                      <strong>{video.title}</strong>
                      <small>
                        {video.publishedAt
                          ? new Date(video.publishedAt).toLocaleDateString()
                          : "YouTube upload"}
                      </small>
                    </span>
                    <ArrowRight size={15} />
                  </button>
                ))}
              </div>
            )}
            <div className="paste-divider">
              <span>or paste a link</span>
            </div>
            <div className="url-field simple">
              <Link2 size={18} />
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="youtube.com/watch?v=…"
              />
              <button
                className="primary-action"
                disabled={!url || Boolean(props.busy)}
                onClick={() => props.onImportVideo(url)}
              >
                {props.busy ?? "Import"}
              </button>
            </div>
          </>
        )}
        {stage === 1 && (
          <div className="two-actions">
            <button
              className="primary-action"
              disabled={Boolean(props.busy)}
              onClick={props.onImportCaptions}
            >
              <Youtube size={16} /> Use YouTube captions
            </button>
            <label className="secondary-action">
              <Upload size={16} /> Upload VTT or SRT
              <input
                type="file"
                accept=".vtt,.srt,text/vtt"
                onChange={(event) =>
                  event.target.files?.[0] &&
                  props.onUploadTranscript(event.target.files[0])
                }
              />
            </label>
          </div>
        )}
        {stage === 2 && (
          <button
            className="primary-action centered"
            disabled={Boolean(props.busy)}
            onClick={props.onAnalyze}
          >
            {props.busy ? (
              <LoaderCircle className="spin" size={16} />
            ) : (
              <Sparkles size={16} />
            )}
            {props.busy ?? "Find open story"}
          </button>
        )}
        {stage === 3 && (
          <button
            className="primary-action centered"
            disabled={Boolean(props.busy)}
            onClick={props.onImportComments}
          >
            {props.busy ? (
              <LoaderCircle className="spin" size={16} />
            ) : (
              <MessageSquare size={16} />
            )}
            {props.busy ?? "Import viewer comments"}
          </button>
        )}
      </div>
    </div>
  );
}

function WorkspaceSurface({
  kind,
  state,
  storyTitle,
  onClose,
  onOpenStory,
  onNewStory,
  onRefresh,
  onDisconnect,
  onSwitch,
  onCopy,
}: {
  kind: Exclude<Surface, null>;
  state: LoreState;
  storyTitle: string;
  onClose: () => void;
  onOpenStory: (step?: Step) => void;
  onNewStory: () => Promise<void>;
  onRefresh: () => Promise<void>;
  onDisconnect: () => Promise<void>;
  onSwitch: (kind: Exclude<Surface, null>) => void;
  onCopy: (value: string, message: string) => Promise<void>;
}) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  const searchable = [
    ...(state.video
      ? [
          {
            id: "story",
            type: "Story",
            title: storyTitle,
            detail: state.video.title,
          },
        ]
      : []),
    ...(state.video?.comments ?? []).map((comment) => ({
      id: comment.id,
      type: "Comment",
      title: comment.author,
      detail: comment.text,
    })),
    ...(state.video?.transcript ?? []).slice(0, 20).map((segment) => ({
      id: segment.id,
      type: "Transcript",
      title: formatMs(segment.startMs),
      detail: segment.text,
    })),
  ];
  const results = query.trim()
    ? searchable
        .filter((item) =>
          `${item.title} ${item.detail}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice(0, 8)
    : searchable.slice(0, 5);
  const content =
    kind === "search" ? (
      <>
        <SurfaceHead
          icon={<Search />}
          title="Search workspace"
          copy="Search the imported story, transcript evidence, and viewer comments."
        />
        <div className="surface-search">
          <Search size={17} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search this workspace"
          />
        </div>
        <div className="surface-list">
          {results.map((item) => (
            <button key={item.id} onClick={() => onOpenStory("evidence")}>
              <span className="surface-type">{item.type}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
              <ArrowRight size={15} />
            </button>
          ))}
          {!results.length && (
            <div className="surface-empty">No matching workspace data.</div>
          )}
        </div>
      </>
    ) : kind === "stories" ? (
      <>
        <SurfaceHead
          icon={<FolderOpen />}
          title="Stories"
          copy="Persisted stories in this Lore workspace."
        />
        <div className="surface-list">
          {state.video ? (
            <button onClick={() => onOpenStory()}>
              <span className="story-thumb">
                <Film size={15} />
              </span>
              <span>
                <strong>{storyTitle}</strong>
                <small>
                  {state.story?.status
                    ? formatEvent(state.story.status)
                    : "Setup in progress"}{" "}
                  · {state.video.title}
                </small>
              </span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <div className="surface-empty">No story is open yet.</div>
          )}
        </div>
        <button
          className="primary-action surface-primary"
          onClick={() => onSwitch("new-story")}
        >
          <Plus size={16} /> New story
        </button>
      </>
    ) : kind === "recent" ? (
      <>
        <SurfaceHead
          icon={<Clock3 />}
          title="Recent activity"
          copy="Real events recorded in the local audit trail."
        />
        <div className="activity-list">
          {[...state.audit]
            .reverse()
            .slice(0, 12)
            .map((entry, index) => (
              <button
                key={`${entry.at}-${index}`}
                onClick={() => onOpenStory()}
              >
                <span className="activity-dot" />
                <span>
                  <strong>{formatEvent(entry.event)}</strong>
                  <small>
                    {new Date(entry.at).toLocaleString()} · {entry.entityId}
                  </small>
                </span>
              </button>
            ))}
        </div>
      </>
    ) : kind === "settings" ? (
      <>
        <SurfaceHead
          icon={<Settings />}
          title="Workspace settings"
          copy="Connection, privacy, and local runtime controls."
        />
        <div className="settings-grid">
          <div>
            <span>Workspace mode</span>
            <strong>
              {state.mode === "live" ? "Live YouTube" : "Controlled demo"}
            </strong>
          </div>
          <div>
            <span>YouTube connection</span>
            <strong>{state.connected ? "Connected" : "Not connected"}</strong>
          </div>
          <div>
            <span>Source storage</span>
            <strong>Local and private</strong>
          </div>
          <div>
            <span>Comment credit</span>
            <strong>Anonymous by default</strong>
          </div>
        </div>
        <div className="surface-actions">
          <button className="secondary-action" onClick={onRefresh}>
            <RefreshCw size={15} /> Refresh workspace
          </button>
          <a
            className="secondary-action"
            href="https://studio.youtube.com"
            target="_blank"
            rel="noreferrer"
          >
            <Youtube size={15} /> Open YouTube Studio
          </a>
          {state.mode === "live" && (
            <button
              className="danger-action"
              onClick={() => onSwitch("disconnect")}
            >
              <LogOut size={15} /> Disconnect YouTube
            </button>
          )}
        </div>
      </>
    ) : kind === "profile" ? (
      <>
        <SurfaceHead
          icon={<UserRound />}
          title={state.channel?.title ?? "Lore creator"}
          copy={
            state.mode === "live"
              ? "Authenticated YouTube creator workspace."
              : "Controlled local demonstration workspace."
          }
        />
        <div className="profile-card">
          <span className="profile-avatar">
            {state.channel?.title?.slice(0, 1) ?? "L"}
          </span>
          <div>
            <strong>{state.channel?.title ?? "Lore creator"}</strong>
            <small>{state.channel?.id ?? "No connected channel"}</small>
          </div>
          <StatusPill status={state.connected ? "CONNECTED" : "OFFLINE"} />
        </div>
        <div className="surface-actions">
          <button
            className="secondary-action"
            onClick={() => onSwitch("settings")}
          >
            <Settings size={15} /> Workspace settings
          </button>
          {state.channel?.id && (
            <button
              className="secondary-action"
              onClick={() => onCopy(state.channel!.id, "Channel ID copied.")}
            >
              <Copy size={15} /> Copy channel ID
            </button>
          )}
        </div>
      </>
    ) : kind === "story-menu" ? (
      <>
        <SurfaceHead icon={<Film />} title="Story actions" copy={storyTitle} />
        <div className="menu-list">
          <button onClick={() => onOpenStory("evidence")}>
            <UserRound size={16} />
            <span>
              <strong>Review evidence</strong>
              <small>Return to the source quote and selected comments.</small>
            </span>
          </button>
          {state.story?.status && unlockedSteps(state.story.status) > 1 && (
            <button onClick={() => onOpenStory("callback")}>
              <Film size={16} />
              <span>
                <strong>Open callback editor</strong>
                <small>
                  Continue from the latest persisted workflow state.
                </small>
              </span>
            </button>
          )}
          <button onClick={onRefresh}>
            <RefreshCw size={16} />
            <span>
              <strong>Refresh from storage</strong>
              <small>Reload the latest server-side state.</small>
            </span>
          </button>
          <button
            onClick={() => onCopy(window.location.href, "Story link copied.")}
          >
            <Copy size={16} />
            <span>
              <strong>Copy story link</strong>
              <small>Copy this local workspace URL.</small>
            </span>
          </button>
        </div>
      </>
    ) : kind === "new-story" ? (
      <>
        <SurfaceHead
          icon={<Plus />}
          title="Start a new story"
          copy="Choose another creator-owned video and begin a clean continuity workflow."
        />
        <div className="confirm-note">
          <ShieldCheck size={18} />
          <span>
            Your YouTube connection stays active. The current in-progress story
            state is replaced; uploaded source files are not published or sent
            anywhere.
          </span>
        </div>
        <div className="confirm-actions">
          <button className="secondary-action" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-action" onClick={onNewStory}>
            <Plus size={16} /> Create workspace
          </button>
        </div>
      </>
    ) : (
      <>
        <SurfaceHead
          icon={<LogOut />}
          title="Disconnect YouTube?"
          copy="This removes the encrypted OAuth credential from Lore."
        />
        <div className="confirm-note danger">
          <ShieldCheck size={18} />
          <span>
            Your YouTube channel will not be changed. Lore will lose API access
            until you connect again.
          </span>
        </div>
        <div className="confirm-actions">
          <button className="secondary-action" onClick={onClose}>
            Cancel
          </button>
          <button className="danger-action solid" onClick={onDisconnect}>
            <LogOut size={16} /> Disconnect
          </button>
        </div>
      </>
    );
  return (
    <div
      className="surface-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="workspace-surface" role="dialog" aria-modal="true">
        <button className="surface-close" aria-label="Close" onClick={onClose}>
          <X size={18} />
        </button>
        {content}
      </section>
    </div>
  );
}

function SurfaceHead({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="surface-head">
      <span>{icon}</span>
      <div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </div>
  );
}
function formatEvent(value: string) {
  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

function StatusPill({ status }: { status: string }) {
  const label =
    status === "PROPOSED"
      ? "Needs review"
      : status === "CONFIRMED"
        ? "Confirmed"
        : status === "RENDERED"
          ? "Callback ready"
          : status === "PUBLISHED"
            ? "Follow-up added"
            : status === "CLOSED"
              ? "Closed"
              : status === "CONNECTED"
                ? "Connected"
                : status === "OFFLINE"
                  ? "Offline"
                  : status;
  return (
    <span className={`status-pill ${status.toLowerCase()}`}>
      <span />
      {label}
    </span>
  );
}
function ReplyStatus({ status }: { status: ReplyRecord["status"] }) {
  const label =
    status === "SIMULATED"
      ? "Demo only"
      : status === "POSTED"
        ? "Posted"
        : status === "FAILED"
          ? "Failed"
          : "Ready to post";
  return (
    <span className={`reply-status ${status.toLowerCase()}`}>
      {status !== "PENDING" && <Check size={12} />}
      {label}
    </span>
  );
}
function EmptyState({
  icon,
  title,
  body,
  action,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  action: string;
  onAction: () => Promise<unknown>;
}) {
  return (
    <div className="empty-state">
      <div className="flow-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{body}</p>
      <button className="primary-action centered" onClick={onAction}>
        <RefreshCw size={16} />
        {action}
      </button>
    </div>
  );
}
function unlockedSteps(status?: string) {
  if (status === "CLOSED" || status === "PUBLISHED") return 4;
  if (status === "RENDERED") return 3;
  if (status === "CONFIRMED") return 2;
  return 1;
}
function formatMs(ms: number) {
  const seconds = Math.floor(ms / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}.${String(Math.floor((ms % 1000) / 100))}`;
}
