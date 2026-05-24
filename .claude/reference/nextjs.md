# Next.js Reference — `apps/web`

Next.js 16.2, App Router, Turbopack default, React 19. Internal packages consumed from TS source.

---

## 1. App Router Structure (`src/app/`)

- `layout.tsx` — shared UI shell; wraps children; must export default `RootLayout`
- `page.tsx` — route leaf; default export required
- `loading.tsx` — instant Suspense fallback while page streams
- `error.tsx` — error boundary; must be `"use client"`
- `not-found.tsx` — rendered by `notFound()` or unmatched routes
- `route.ts` — API handler; export named HTTP methods (`GET`, `POST`, etc.)
- Colocate route-specific components in the same segment folder (non-special filenames are not routes)
- Route groups: `(group)/` — organizes without affecting URL
- Dynamic segments: `[param]/`, catch-all: `[...param]/`, optional: `[[...param]]/`

---

## 2. Async Request APIs — BREAKING in Next.js 15+ (still applies in 16)

`params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are **all async**. Forgetting `await` is silent and wrong.

```ts
// page.tsx
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { id } = await params;
  const { q } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
}
```

- Route handlers follow the same pattern: `const { id } = await params` in `GET(req, { params })`

---

## 3. Server vs Client Components

- **Default: Server Component** — no bundle cost, direct DB/secret access, async by nature
- Add `"use client"` only when you need: `useState`, `useEffect`, event handlers, browser APIs
- Fetch data in Server Components; pass serializable props down to client leaves
- **Secrets stay server-side** — only `NEXT_PUBLIC_`-prefixed vars reach the browser
- Never import server-only modules (`fs`, DB clients) into client components — use `server-only` package to guard

```ts
// Server Component — no directive needed
export default async function UserCard({ id }: { id: string }) {
  const user = await db.users.findUnique({ where: { id } })
  return <div>{user.name}</div>
}
```

---

## 4. React Compiler

- Enabled via `reactCompiler: true` in `next.config.ts`. `babel-plugin-react-compiler` is a required
  devDep even though Next compiles with SWC — Next runs the React Compiler through this Babel plugin
  for the files it applies to, so it must be installed.
- **Do not hand-memoize** — no `useMemo`, `useCallback`, or `React.memo` unless the compiler opts a component out
- The compiler infers all memoization statically; manual memos conflict and add noise

---

## 5. Internal Packages from Source / HMR

```ts
// next.config.ts
transpilePackages: [
  "@monorepo-boilerplate/auth",
  "@monorepo-boilerplate/environment",
  "@monorepo-boilerplate/providers",
  "@monorepo-boilerplate/types",
  "@monorepo-boilerplate/ui",
];
```

- Tells Next to compile each internal package's TypeScript source directly instead of expecting pre-built dist
- Edits inside `packages/*/src/` hot-reload in `apps/web` without a separate build step
- **List every internal `@monorepo-boilerplate/*` package the app imports** (it ships raw TS). When
  you add a new one as a dependency of `apps/web`, add it here too.

---

## 6. Tailwind v4

- App owns `src/app/globals.css` — the single Tailwind entry point:

```css
@import "tailwindcss";
@import "@monorepo-boilerplate/ui/styles.css"; /* tokens + @source for kit classes */
```

- PostCSS plugin: `@tailwindcss/postcss` (no `tailwind.config.ts` needed in v4)
- The UI kit's `styles.css` includes `@source` directives so Tailwind scans kit components automatically
- Do not add a `tailwind.config.ts` — v4 is CSS-first configuration

---

## 7. Environment Variables

```ts
import { env } from "@/env"; // always — typed, validated at startup

env.DATABASE_URL; // server-only
env.NEXT_PUBLIC_API_URL; // available client-side
```

- `src/env.ts` wraps `@monorepo-boilerplate/environment` (t3-env + zod)
- **Never** read `process.env.FOO` directly in app code — bypasses validation and type safety
- `pnpm env:doctor` — validates all required vars against the schema

---

## 8. Data Fetching & Caching

- Next 16: fetch is **uncached by default** — opt in deliberately:

```ts
fetch(url, { cache: "force-cache" }); // static, indefinite
fetch(url, { next: { revalidate: 60 } }); // ISR-style, seconds
fetch(url, { cache: "no-store" }); // always dynamic (explicit)
```

- Use `unstable_cache` for non-fetch data sources (DB queries)
- **Mutations → Server Actions** (not API routes): colocate in `actions.ts`, mark `"use server"`
- Avoid `useEffect` + fetch for initial data — fetch in the Server Component instead

---

## 9. Metadata & SEO

```ts
// Static
export const metadata: Metadata = { title: "Page", description: "..." };

// Dynamic
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchItem(id);
  return { title: item.name, openGraph: { images: [item.image] } };
}
```

- `layout.tsx` metadata merges with `page.tsx` metadata (page wins on conflicts)
- Use `metadataBase` in root layout for absolute OG image URLs
- Add JSON-LD via a `<script type="application/ld+json">` Server Component for structured data

---

## 10. Performance

- **Images**: always `next/image` — automatic sizing, format negotiation, lazy load
- **Fonts**: `next/font` — zero layout shift, self-hosted, no external requests
- **Heavy client libraries**: dynamic import to keep initial bundle lean:

```ts
const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });
```

- **Streaming**: wrap slow data behind `<Suspense fallback={<Skeleton />}>` so fast content renders first
- Keep client component trees shallow — push `"use client"` to leaves, not subtree roots

---

Full docs: https://nextjs.org/docs — React patterns and hooks conventions: `.claude/reference/react.md`
