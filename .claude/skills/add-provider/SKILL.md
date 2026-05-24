---
name: add-provider
description: Add a third-party API client or webhook handler to @monorepo-boilerplate/providers, following the typed-fetch + zod validation pattern. Use when integrating an external API, SDK, or webhook into the monorepo.
---

# Add a provider

Add an integration to `packages/providers`. The reference implementation is
`packages/providers/src/example/`.

## Steps

1. **Create `packages/providers/src/<provider>/index.ts`**:
   - Define zod schemas for each API response; export inferred types (`z.infer<...>`).
   - Build a client with `createJsonClient` (from `../http`) so every response is
     validated and typed — never return `unknown` or `any`.
   - Expose a `create<Provider>Provider(options)` factory returning typed methods.
   - For webhooks, verify signatures in constant time (see `verifyWebhookSignature`
     in the example, using `node:crypto`).
2. **Add a subpath export** in `packages/providers/package.json`:
   `"./<provider>": "./src/<provider>/index.ts"`.
3. **Secrets** (API keys, signing secrets) are passed in by the caller from validated
   `env` — never read `process.env` inside the provider.
4. **Verify**: `pnpm typecheck && pnpm lint`. Add a Vitest test if logic is non-trivial.
