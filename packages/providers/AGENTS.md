# Providers — `@monorepo-boilerplate/providers`

Third-party API clients, webhook verification, and resilience utilities. One
subpath export per concern.

## Rules

- **One provider per folder** under `src/<provider>/`, exposed as a `./<provider>` subpath
  export. Copy `src/example/` as the template.
- **Validate every response** through a zod schema via `createJsonClient` (`src/http.ts`) —
  callers get typed data, never `unknown`/`any`.
- **Resilience** lives in `src/resilience.ts`: `retry` (exponential backoff + full jitter),
  `withTimeout((signal) => …)` (aborts the signal and throws a `TIMEOUT` AppError on deadline —
  thread the signal into your `fetch`/query), `RateLimiter` (token bucket). Wrap flaky calls with these.
- **Webhooks**: use `src/webhooks` — `verifyWebhookSignature` (constant-time HMAC) and
  `parseSignedWebhook` (verify + schema-parse, throwing `UNAUTHORIZED`/`VALIDATION` AppErrors).
- **Secrets are passed in** by the caller from validated env — never read `process.env` here.
- Throw `AppError` (`@monorepo-boilerplate/types`) so route handlers can map to HTTP status.
