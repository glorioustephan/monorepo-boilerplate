import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  platform: 'node',
  target: 'node22',
  clean: true,
  // Internal packages export raw .ts (consumed from source for HMR). The deployed
  // Node process can't execute .ts, so inline them into the bundle instead of
  // leaving them as runtime imports.
  deps: { alwaysBundle: [/^@monorepo-boilerplate\//] },
});
