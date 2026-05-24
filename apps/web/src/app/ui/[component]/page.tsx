import type { ReactNode } from "react";

import { getComponentBySlug, listComponents, toSlug } from "@monorepo-boilerplate/ui/registry";
import { notFound } from "next/navigation";

interface ComponentPageProps {
  readonly params: Promise<{ component: string }>;
}

// Only catalogued components get a page: any slug outside generateStaticParams
// returns a framework 404 ("no example ⇒ not in catalog ⇒ no page").
export const dynamicParams = false;

// Pre-render a page per catalogued component so the dynamic example imports are
// enumerable at build time.
export function generateStaticParams(): Array<{ component: string }> {
  return listComponents().map((component) => ({ component: toSlug(component.name) }));
}

/**
 * RSC harness: renders the live `*.example.tsx` ground truth for one component,
 * looked up by slug. 404s for unknown slugs. This is how the example corpus is
 * exercised in a real Next build (and how agents preview a component).
 */
export default async function ComponentExamplePage({ params }: ComponentPageProps) {
  const { component } = await params;
  // Unreachable in the SSG build (dynamicParams=false 404s unknown slugs first),
  // but guards `next dev`, where unlisted slugs still reach this handler.
  const meta = getComponentBySlug(component);
  if (!meta) notFound();

  const exampleModule = (await import(`@monorepo-boilerplate/ui/examples/${component}`)) as {
    default?: () => ReactNode;
  };
  const Example = exampleModule.default;
  if (!Example) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">{meta.name}</h1>
        <p className="text-muted-foreground">{meta.description}</p>
      </header>
      <section className="rounded-lg border border-border bg-surface p-8 text-surface-foreground">
        <Example />
      </section>
    </main>
  );
}
