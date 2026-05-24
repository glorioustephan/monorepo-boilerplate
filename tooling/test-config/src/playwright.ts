import { defineConfig, devices, type PlaywrightTestConfig } from "@playwright/test";

export interface PlaywrightPresetOptions {
  /** URL the dev/preview server is served from during tests. */
  readonly baseURL: string;
  /** Command that starts the app under test. */
  readonly webServerCommand: string;
}

/**
 * Playwright preset for apps. Pass the app's base URL and start command.
 * In CI it builds and reuses one server; locally it reuses a running one.
 */
export function createPlaywrightConfig(options: PlaywrightPresetOptions): PlaywrightTestConfig {
  const { baseURL, webServerCommand } = options;
  return defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? "github" : "list",
    use: {
      baseURL,
      trace: "on-first-retry",
    },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
    webServer: {
      command: webServerCommand,
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  });
}
