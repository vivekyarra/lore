import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({ test: { environment: "node", testTimeout: 180_000 }, resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } } });
