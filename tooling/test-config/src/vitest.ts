import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Vitest preset for Node-only packages (no DOM). Merge into a package's
 * `vitest.config.ts` with `mergeConfig(nodePreset, { ... })`.
 */
export const nodePreset = defineConfig({
  test: {
    globals: true,
    environment: "node",
    passWithNoTests: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});

/**
 * Vitest preset for React component packages. Adds the React plugin and a
 * jsdom environment for rendering tests.
 */
export const reactPreset = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    passWithNoTests: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
