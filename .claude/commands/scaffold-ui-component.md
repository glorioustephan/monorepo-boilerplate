---
description: Scaffold a catalogued component in the UI kit (tier, sidecar, example, test)
argument-hint: <ComponentName> [primitive|recipe|block]
---

Scaffold a new `@monorepo-boilerplate/ui` component from `$ARGUMENTS` (first token =
PascalCase name, second = tier, defaulting to `primitive`). This follows the
`add-ui-component` skill — read it and `.claude/reference/{react,tailwind}.md` first.

**Before scaffolding, query the catalog** (`mcp-ui` `search_components`, then
`get_component`) to confirm nothing already fits — don't duplicate an existing
component or drop to raw HTML in an app.

Steps (let `slug` = kebab-case of the name, e.g. `ConfirmDialog` → `confirm-dialog`):

1. **Component** in the tier's dir:
   - Primitive → `src/components/<slug>.tsx`; Recipe → `src/recipes/<slug>.tsx`;
     Block → `src/blocks/<slug>.tsx`.
   - Named export, props as a typed object; `ComponentPropsWithRef<...>` for DOM passthrough
     (no `forwardRef`). Variants via `cva` + `cn()`. Semantic token classes only.
   - `"use client"` ONLY for genuine interactivity (Recipes that wire handlers/state).
     Blocks stay Server Components with **slot props, not boolean flags**.
2. **Export** the component (+ props type, + any `cva` generator) from `src/index.ts`.
3. **Sidecar** `<slug>.catalog.ts` exporting `const meta: CatalogSidecar` with `name`,
   `tier`, `description`, `props`, `examples`, `intent` (`use`/`avoid`). Do NOT set
   `renderEnvironment`/`variants` — the extractor infers them.
4. **Example** `examples/<slug>.example.tsx` — a plain, prop-less default export showing the
   variants. **Required**: `catalog:generate` throws without it; it renders at `/ui/<slug>`.
5. **Test** `<slug>.test.tsx` (Testing Library + jsdom; render-only smoke test for
   Radix/portalled components).
6. **Regenerate + verify**: `pnpm catalog:generate`, then
   `pnpm lint && pnpm lint:tokens && pnpm lint:catalog && pnpm catalog:check && pnpm typecheck && pnpm test`.

Report the files created and the verification result.
