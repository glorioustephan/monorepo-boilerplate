import { createPlaywrightConfig } from "@monorepo-boilerplate/test-config/playwright";

export default createPlaywrightConfig({
  baseURL: "http://localhost:3000",
  webServerCommand: "pnpm dev",
});
