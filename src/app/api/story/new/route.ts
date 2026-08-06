import { ok, fail } from "@/lib/http";
import { createDemoState } from "@/lib/demo";
import { publicState, readState, updateState } from "@/lib/store";

export async function POST() {
  try {
    const current = await readState();
    if (current.mode === "demo")
      return ok(publicState(await updateState(() => createDemoState())));
    const next = await updateState((draft) => {
      draft.video = null;
      draft.story = null;
      draft.render = null;
      draft.replies = [];
      draft.audit.push({
        at: new Date().toISOString(),
        event: "NEW_STORY_STARTED",
        entityId: draft.channel?.id ?? "workspace",
      });
    });
    return ok(publicState(next));
  } catch (error) {
    return fail(error, 500);
  }
}
