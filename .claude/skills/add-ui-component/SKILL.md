---
name: add-ui-component
description: Add a new component to the @monorepo-boilerplate/ui kit following its conventions (CVA variants, cn(), semantic tokens, source export, Vitest test). Use when creating or scaffolding a shared UI component, button, card, input, or other design-system primitive.
---

# Add a UI component

Add a component to `packages/ui` matching the kit's conventions. The canonical
reference is `packages/ui/src/components/button.tsx`. Also read
`.claude/reference/react.md` and `packages/ui/AGENTS.md`.

## Steps

1. **Create `packages/ui/src/components/<name>.tsx`**:
   - Named export, PascalCase component, props as a typed object destructured in the signature.
   - Extend the right DOM props type (e.g. `ButtonHTMLAttributes<HTMLButtonElement>`).
   - For variants, use `class-variance-authority`; merge classes with `cn()` from `../lib/cn`.
   - Style only with **semantic token classes** (`bg-primary`, `text-foreground`,
     `border-border`, …) — never hard-coded colors.
   - Add `"use client"` ONLY if the component is interactive (state/effects/handlers).
2. **Export it** from `packages/ui/src/index.ts` (and its props type if useful).
3. **Add a test** `packages/ui/src/components/<name>.test.tsx` using Testing Library
   (`render` + `screen`, jsdom via the react preset). Cover render + one variant/behavior.
4. **Verify**: `pnpm --filter @monorepo-boilerplate/ui test` and `pnpm typecheck && pnpm lint`.

## Notes

- New design tokens go in `packages/ui/src/themes/default.css` (and other theme files),
  mapped through `@theme inline`. Don't introduce raw colors in component classes.
- The component is consumed from source, so it hot-reloads in `apps/web` immediately —
  no build or version bump needed.
