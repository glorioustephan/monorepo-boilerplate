# Deployment & release

## Web app → Vercel

The web app is configured with a typed `apps/web/vercel.ts` (replaces `vercel.json`).

1. Create a Vercel project and set **Root Directory** to `apps/web`.
2. Vercel auto-detects Next.js and the monorepo (pnpm workspace) build.
3. Set environment variables in the Vercel dashboard or with the CLI:
   ```bash
   vercel env pull        # sync to .env.local for local dev
   ```
   Required: `SESSION_SECRET` (and `WEBHOOK_SECRET` if you use the webhook route).
4. Push to `main` for production; PRs get preview deployments automatically.

Edit `apps/web/vercel.ts` to add redirects, rewrites, headers, crons, or function settings.

## MCP server → container

The MCP server ships a multi-stage `apps/mcp-server/Dockerfile`. Build from the **repo root**:

```bash
docker build -f apps/mcp-server/Dockerfile -t monorepo-boilerplate-mcp .
docker run -i --rm monorepo-boilerplate-mcp     # talks JSON-RPC over stdio
```

The build uses `pnpm deploy` to produce a self-contained image (only the server's
runtime dependencies). Wire it into an MCP client by pointing the client's `command`
at the container.

## Releases (Changesets)

- Add a changeset when you change a publishable package: `pnpm changeset`.
- On push to `main`, the **Release** workflow opens/updates a "Version Packages" PR.
- Merging that PR versions packages and (for non-private packages) publishes them.
- Provide an `NPM_TOKEN` secret if you publish to npm; private packages are skipped.

## CI

`.github/workflows/ci.yml` runs format-check, lint, typecheck, unit tests, and build on a
**Node 22 + 24 matrix**, plus a separate Playwright e2e job. Builds are Turborepo-cached.
