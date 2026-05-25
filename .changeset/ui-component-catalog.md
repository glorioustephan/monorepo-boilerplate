---
'@monorepo-boilerplate/ui': minor
---

Expand the UI kit into an AI-consumable component catalog. Add Recipe-tier
compositions (`ConfirmDialog`, `FormField`) and Server-Component Block-tier
sections (`Hero`, `Cta`, `FeatureGrid`), each with a typed `*.catalog.ts` sidecar
and a runnable `examples/<slug>.example.tsx` ground truth (exposed via the new
`./examples/*` subpath export). The generated registry now carries `examplePath`,
and `registry.ts` gains `searchComponents` (zero-dependency lexical ranking),
`filterByRenderEnvironment`, `getComponentBySlug`, and `toSlug`.
