# Auth — `@monorepo-boilerplate/auth`

**Optional module.** Provider-agnostic session primitives only — it does not pick
an identity provider. Use it to issue tamper-proof, expiring session cookies after
your own login succeeds. Safe to delete if an app doesn't need auth.

## Rules

- `createSessionCodec<T>({ secret, ttlSeconds })` returns `seal(payload)` / `unseal(token)`.
  Tokens are `base64url(json).hmac-sha256` — verified in constant time (`node:crypto`'s
  `timingSafeEqual`), with expiry.
- **Secret comes from validated env** (`SESSION_SECRET`), never hard-coded in app code.
- **Node runtime** (uses `node:crypto` + `Buffer`). The Next proxy runs on the Node runtime,
  so it can import this; it is not edge/Web-Crypto-only.
- This package owns crypto only. App wiring (cookies, proxy, the `getSession()` accessor)
  lives in the app — see `apps/web/src/lib/auth.ts` and `apps/web/src/proxy.ts`.
- To add a real provider: authenticate credentials, then `seal()` the resulting identity.
