import { reactPreset } from "@monorepo-boilerplate/test-config/vitest";
import { mergeConfig } from "vitest/config";

export default mergeConfig(reactPreset, {
  test: {
    setupFiles: ["./src/test-setup.ts"],
    // Keep Playwright specs (in ./e2e) out of the Vitest run.
    exclude: ["e2e/**", "node_modules/**", ".next/**"],
  },
});
