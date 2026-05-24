# Web app — `@monorepo-boilerplate/web`

Next.js 16 App Router (Turbopack, React Compiler on). Full conventions in
`.claude/reference/nextjs.md` and `.claude/reference/react.md`.

## Rules

- **Server Components by default.** Add `"use client"` only for interactivity, at the leaves.
- **Request APIs are async** — `await params`, `await searchParams`, `await cookies()`, `await headers()`.
- **Env**: import `env` from `src/env.ts`; never touch `process.env` directly. Add new vars there
  (and mirror them in `scripts/env-doctor.ts`). Only `NEXT_PUBLIC_*` reaches the browser.
- **Styling**: Tailwind v4. `src/app/globals.css` imports `tailwindcss` then
  `@monorepo-boilerplate/ui/styles.css`. Use the kit's semantic token classes.
- The UI kit is transpiled from source via `transpilePackages` in `next.config.ts` — editing
  `packages/ui/src` hot-reloads here. Don't duplicate UI primitives; add them to the kit.
- Don't hand-memoize — React Compiler handles it.
- Tests: Vitest unit/component tests (`*.test.tsx`); Playwright specs in `e2e/`.
