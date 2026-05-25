---
'@monorepo-boilerplate/ui': minor
---

Re-platform the UI kit onto **Radix Themes** as a single, enforced vocabulary. The component
layer is generated from `components/components.manifest.ts` via `pnpm ui:codegen` (thin re-exports

- variant-matrix reference stories, sub-foldered by category), with hand-authored stories for
  compound components (Dialog, Tabs, Select, Table, …). Authored Recipe (`ConfirmDialog`, `Field`),
  Block (`Hero`, `Cta`, `FeatureGrid`), and Template tiers compose those components. Color comes from
  Radix props and the active theme; `@radix-ui/*` is importable only inside the kit (enforced by
  `pnpm lint:catalog`). The component catalog itself moved out of the kit into the `mcp-ui` server
  (a `node:sqlite` + FTS5 + MiniLM hybrid-search database) — the kit now ships no catalog/registry
  files.
