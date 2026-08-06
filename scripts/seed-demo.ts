import { generateDemoSource } from "../src/lib/media";
import { resetDemoState } from "../src/lib/store";
async function main() {
  const state = await resetDemoState();
  const source = await generateDemoSource();
  console.log(JSON.stringify({ mode: state.mode, storyStatus: state.story?.status, sourceAssetId: source.assetId, sourceDurationSeconds: source.probe.durationSeconds }, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
