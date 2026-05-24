---
name: add-ui-component
description: Add a new component to the @monorepo-boilerplate/ui kit following its conventions (tier, CVA variants, cn(), semantic tokens, typed *.catalog.ts sidecar, example, source export, Vitest test). Use when creating or scaffolding a shared UI component, button, card, input, recipe, or block.
---

# Add a UI component

## First: query the catalog before building anything

The kit is an AI-consumable **catalog**. Before writing UI, search it — via the
`mcp-ui` MCP server (`search_components`, then `get_component`) or
`packages/ui/src/registry.generated.ts`. If a component already fits, use it;
**don't** re-implement it or drop to a raw `<button>`/`<input>`/`<select>` in an app
(`pnpm lint:catalog` flags that, in lefthook + CI).

**Escape hatch** — when nothing in the catalog fits: either (a) add a new catalog
entry by following the steps below, or (b) compose Radix primitives **within the
token contract** (semantic tokens only; `"use client"` only on interactive leaves).
Never bypass the contract or copy a component's internals into an app.

## Tiers

Pick the tier — it sets where the file lives and the rules it follows:

- **Primitive** (`src/components/`) — one styled element or Radix wrapper (Button, Input, Dialog).
- **Recipe** (`src/recipes/`) — a composition solving one UX pattern (ConfirmDialog, FormField).
  `"use client"` only if it wires handlers/state; keep that boundary in the leaf.
- **Block** (`src/blocks/`) — a page-level section, **Server Component, slot props not boolean
  flags** (Hero, Cta, FeatureGrid). Interactivity lives in slotted children.

The canonical primitive is `src/components/button.tsx`. Also read
`.claude/reference/react.md`, `.claude/reference/tailwind.md`, and `packages/ui/AGENTS.md`.

## Steps

1. **Create the component** in the tier's directory (`src/components|recipes|blocks/<name>.tsx`):
   - Named export, PascalCase, props as a typed object destructured in the signature.
   - Extend the right DOM props type with **`ComponentPropsWithRef<"button">`** (etc.) — React 19
     passes `ref` as a normal prop, so no `forwardRef`.
   - Variants via `class-variance-authority`; merge with `cn()` from `../lib/cn`. Export the `cva`
     generator (like `buttonVariants`) if the look should be reusable on other elements.
   - Style only with **semantic token classes** (`bg-primary`, `text-foreground`, `ring-ring`, …) —
     never raw palette, arbitrary values, or inline colors (`pnpm lint:tokens` enforces this).
   - **Accessibility**: visible `focus-visible` ring; inputs need an associated label; semantic
     elements over `<div>`.
   - Add `"use client"` ONLY for genuine interactivity (state/effects/handlers/browser APIs). Do
     not hand-write `useMemo`/`useCallback` — the React Compiler handles it.
2. **Export it** from `packages/ui/src/index.ts` (component, props type, any `cva` generator).
3. **Author a sidecar** `<name>.catalog.ts` next to the component, exporting
   `const meta: CatalogSidecar` with `name`, `tier`, `description`, `props`, `examples`, and
   `intent` (`use`/`avoid`). The extractor infers `renderEnvironment` and CVA `variants` from
   source — **do not** hand-edit `registry.generated.ts`.
4. **Add an example** `packages/ui/examples/<slug>.example.tsx` — a plain, prop-less default
   export demonstrating the variants. The slug is the kebab-cased name (`ConfirmDialog` →
   `confirm-dialog`). This is **required**: `pnpm catalog:generate` throws without it, and the
   example renders at `/ui/<slug>` in the web harness.
5. **Add a test** `<name>.test.tsx` (Testing Library + jsdom). For Radix/portalled components write
   a render-only smoke test (assert the trigger is present).
6. **Regenerate + verify**: `pnpm catalog:generate` (writes `registry.generated.ts`), then
   `pnpm lint && pnpm lint:tokens && pnpm lint:catalog && pnpm catalog:check && pnpm typecheck && pnpm test`.

## Notes

- New design tokens go in `packages/ui/src/themes/default.css` (+ other themes), mapped through
  `@theme inline`. Don't introduce raw colors in component classes.
- Components are consumed from source, so they hot-reload in `apps/web` immediately — no build
  or version bump needed.
