import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export interface CtaProps {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  /** The action(s) the section drives toward; composed as slot content. */
  readonly actions?: ReactNode;
  readonly className?: string;
}

/**
 * Block: a closing call-to-action panel on an elevated surface. Server Component;
 * the `actions` slot carries any interactive controls.
 */
export function Cta({ title, description, actions, className }: CtaProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border border-border bg-surface px-6 py-12 text-center text-surface-foreground",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      {description ? <p className="max-w-xl text-muted-foreground">{description}</p> : null}
      {actions ? (
        <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>
      ) : null}
    </section>
  );
}
