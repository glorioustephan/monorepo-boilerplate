---
name: add-ui-component
description: Add a component to the @monorepo-boilerplate/ui kit following its conventions — a Radix Themes component via the codegen manifest, or a composite (recipe/block/template) composing those components. Use when creating or scaffolding a shared UI component, button, card, input, recipe, block, or page template.
---

# Add a UI component

## First: query the catalog before building anything

The kit is the single, enforced UI vocabulary. Before writing UI, search it via the
`mcp-ui` MCP server (`search_components`, then `get_component`). If a component already
fits, use it — and **never** import `@radix-ui/themes`/`radix-ui` outside `packages/ui`,
or drop to a raw `<button>`/`<input>`/`<select>` in an app (`pnpm lint:catalog` errors on
both, in lefthook + CI).

## Decide what you're adding

- **A Radix Themes component** (an atom of the vocabulary, e.g. a Radix component we don't yet
  re-export) → **edit the manifest + regenerate**. These live in `src/components/<category>/` and
  are **generated** — never hand-write them.
- **A composite** (value-add we author) → hand-build in the right tier:
  - **Recipe** (`src/recipes/`) — a composition solving one UX pattern (Field, ConfirmDialog).
  - **Block** (`src/blocks/`) — a page section with slot props (Hero, FeatureGrid, Cta).
  - **Template** (`src/templates/`) — a full page composed from blocks.

Read `.claude/reference/react.md`, `.claude/reference/tailwind.md`, and `packages/ui/AGENTS.md`.

## Add a Radix Themes component (generated)

1. Add an entry to `packages/ui/src/components/components.manifest.ts`: `name`, `category`
   (drives the sub-folder + Storybook nav), `renderEnv`, `usage`, plus variant `axes`,
   `sample`/`sampleProps`, and `compound`/`parts`/`manualStory` as needed.
2. Run `pnpm ui:codegen` — it generates `components/<category>/<Name>.tsx` (thin re-export) and,
   for non-compound components, `<Name>.stories.tsx` (variant matrix). Don't edit generated files.
3. `pnpm ui:codegen:check && pnpm typecheck && pnpm lint` — and rebuild the catalog with
   `pnpm --filter @monorepo-boilerplate/mcp-ui build-catalog`.

## Add a composite (hand-built)

1. **Create `src/<recipes|blocks|templates>/<Name>.tsx`** (PascalCase): named export, props as a
   typed object. Compose the kit's components — `import { Flex, Button, … } from "../components"`.
   Color comes from Radix **props** (`color`/`variant`/`size`/`radius`); Tailwind is for
   layout/spacing only — never color. Add `"use client"` only for genuine interactivity (leaf
   boundary); don't hand-write `useMemo`/`useCallback` (React Compiler handles it). Lead with a
   `/** … */` JSDoc — the MCP catalog scrapes it as the description.
2. **Export it** from `packages/ui/src/index.ts` (via the tier's `index.ts` barrel).
3. **Add an example** `packages/ui/examples/<Name>.example.tsx` — a prop-less default export
   demonstrating it (the catalog reads it verbatim; the story reuses it).
4. **Add a story** `<Name>.stories.tsx` (`title: "Recipes|Blocks|Templates/<Name>"`); `Default`
   renders the example. If the component has required props, set `meta.args` to satisfy them.
5. **Add a test** `<Name>.test.tsx` — Testing Library + jsdom, mounted via `renderWithTheme`
   (`src/test-utils.tsx`). For portalled components, a render/open smoke test is enough.
6. **Verify**: `pnpm lint && pnpm lint:tokens && pnpm lint:catalog && pnpm typecheck && pnpm test`,
   then rebuild the catalog (`build-catalog`).

## Notes

- Custom theme accents go in `src/themes/accents.css` + `ACCENT_COLORS` (`theme-controls.ts`) — not
  raw colors in component classes.
- Components are consumed from source, so they hot-reload in `apps/web` immediately.
