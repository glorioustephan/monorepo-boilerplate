---
description: Scaffold a UI kit component — a Radix Themes component via the codegen manifest, or a composite (recipe/block/template)
argument-hint: <ComponentName> [component|recipe|block|template]
---

Scaffold a `@monorepo-boilerplate/ui` component from `$ARGUMENTS` (first token =
PascalCase name, second = tier, defaulting to `recipe`). Follow the `add-ui-component`
skill — read it and `.claude/reference/{react,tailwind}.md` first.

**Before scaffolding, query the catalog** (`mcp-ui` `search_components`, then
`get_component`) to confirm nothing already fits. Never import `@radix-ui/themes` outside
`packages/ui`, or drop to raw HTML in an app (`pnpm lint:catalog` errors on both).

**If the tier is `component`** (a Radix Themes re-export): add an entry to
`packages/ui/src/components/components.manifest.ts` (name, category, renderEnv, usage,
variant `axes`, `sample`/`sampleProps`, `compound`/`parts`), then `pnpm ui:codegen`. Don't
hand-write files in `src/components/` — they're generated. Verify with
`pnpm ui:codegen:check && pnpm typecheck && pnpm lint`.

**Otherwise (recipe / block / template)** — hand-build, composing the kit's components:

1. **Component** `src/<recipes|blocks|templates>/<Name>.tsx` (PascalCase): named export, typed
   props; `import { … } from "../components"`. Color via Radix props; Tailwind for layout only;
   `"use client"` only for interactivity. Lead with a `/** … */` JSDoc (the catalog scrapes it).
2. **Export** from `src/index.ts` via the tier's `index.ts` barrel.
3. **Example** `examples/<Name>.example.tsx` — a prop-less default export.
4. **Story** `<Name>.stories.tsx` (`title: "Recipes|Blocks|Templates/<Name>"`, `Default` renders
   the example; set `meta.args` if the component has required props).
5. **Test** `<Name>.test.tsx` (Testing Library + jsdom via `renderWithTheme`; render/open smoke
   test for portalled components).
6. **Verify**: `pnpm lint && pnpm lint:tokens && pnpm lint:catalog && pnpm typecheck && pnpm test`,
   then `pnpm --filter @monorepo-boilerplate/mcp-ui build-catalog`.

Report the files created and the verification result.
