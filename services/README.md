# services/ — reserved

Reserved (and documented) home for future **backend services** — long-running,
deployable server processes that are distinct from both:

- `apps/` — user-facing deliverables (web, and later expo / React Native / Electron /
  VS Code extensions), and
- `mcp-servers/` — internal Model Context Protocol servers used by AI agents and tooling.

Nothing lives here yet. When a backend service is added (e.g. a REST/GraphQL API, a queue
worker, a cron/scheduler), create `services/<name>/` as a workspace package — it is already
covered by the `services/*` glob in `pnpm-workspace.yaml`. Services may have a build step
(like `mcp-servers/*`, bundled with tsdown) and consume `packages/*` libraries from source.

This placeholder keeps the workspace topology intentional:

| Root           | Holds                                    |
| -------------- | ---------------------------------------- |
| `apps/`        | user-facing applications                 |
| `mcp-servers/` | internal MCP servers (agent/dev tooling) |
| `services/`    | backend services (reserved)              |
| `packages/`    | source-exported shared libraries         |
| `tooling/`     | config-only + build-time tooling         |
