import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

/**
 * Two Vitest projects:
 * - `unit`      — fast jsdom component tests (`*.test.tsx`). Runs in `pnpm test` (per-edit/commit tier).
 * - `storybook` — every story rendered in a real browser (Playwright) + axe accessibility checks.
 *                 Heavier, so it runs only via `pnpm test:stories` (CI/PR tier), never in `pnpm test`.
 */
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react()],
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          passWithNoTests: true,
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          setupFiles: ['./src/test-setup.ts'],
        },
      },
      {
        // addon-vitest (Storybook ≥10.3) auto-applies the preview config (the Radix <Theme>
        // decorator + globals) to every story, so no extra setup file is needed.
        plugins: [storybookTest({ configDir: '.storybook' })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
