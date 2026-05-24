import { reactPreset } from "@monorepo-boilerplate/test-config/vitest";
import { mergeConfig } from "vitest/config";

export default mergeConfig(reactPreset, {
  test: {
    setupFiles: ["./src/test-setup.ts"],
  },
});
