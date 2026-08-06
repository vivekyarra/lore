import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { createDemoState } from "./demo";
import type { LoreState } from "./types";

const dataDir = path.join(process.cwd(), "data");
const statePath = path.join(dataDir, "state.json");
let writeQueue: Promise<void> = Promise.resolve();

async function ensureState(): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(statePath, "utf8");
  } catch {
    await writeFile(statePath, JSON.stringify(createDemoState(), null, 2), "utf8");
  }
}

export async function readState(): Promise<LoreState> {
  await ensureState();
  return JSON.parse(await readFile(statePath, "utf8")) as LoreState;
}

export async function writeState(state: LoreState): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await mkdir(dataDir, { recursive: true });
    const temporary = `${statePath}.${process.pid}.tmp`;
    await writeFile(temporary, JSON.stringify(state, null, 2), "utf8");
    await rename(temporary, statePath);
  });
  return writeQueue;
}

export async function updateState(mutator: (state: LoreState) => LoreState | void): Promise<LoreState> {
  const state = await readState();
  const next = mutator(state) ?? state;
  await writeState(next);
  return next;
}

export async function resetDemoState(): Promise<LoreState> {
  const state = createDemoState();
  await writeState(state);
  return state;
}

export function publicState(state: LoreState): LoreState {
  return { ...state, encryptedRefreshToken: state.encryptedRefreshToken ? "[stored encrypted]" : null };
}
