import { fileURLToPath } from 'node:url';

import { reactPreset } from '@monorepo-boilerplate/test-config/vitest';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(reactPreset, {
  // Mirror the `@/*` -> `./src/*` path alias from tsconfig so tests resolve it.
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    setupFiles: ['./src/test-setup.ts'],
    // Keep Playwright specs (in ./e2e) out of the Vitest run.
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
  },
});
