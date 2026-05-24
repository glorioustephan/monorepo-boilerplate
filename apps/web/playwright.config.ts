import { createPlaywrightConfig } from "@monorepo-boilerplate/test-config/playwright";

export default createPlaywrightConfig({
  baseURL: "http://localhost:3000",
  // Serve the production build (`turbo test:e2e` depends on `build`), so e2e
  // exercises the real output. Locally, a running `pnpm dev` server is reused.
  webServerCommand: "pnpm start",
});
