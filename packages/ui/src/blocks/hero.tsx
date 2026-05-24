import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export interface HeroProps {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  /** Call-to-action controls (Buttons, Links); composed, not flag-driven. */
  readonly actions?: ReactNode;
  /** Optional supporting visual (image, illustration, embed). */
  readonly media?: ReactNode;
  readonly className?: string;
}

/**
 * Block: a centered page-intro section. A Server Component — interactivity, if
 * any, lives in the slotted `actions`/`media`, never in the block itself.
 */
export function Hero({ title, description, actions, media, className }: HeroProps) {
  return (
    <section className={cn("flex flex-col items-center gap-6 px-6 py-16 text-center", className)}>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
      {description ? (
        <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
      ) : null}
      {actions ? (
        <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>
      ) : null}
      {media ? <div className="mt-4 w-full max-w-3xl">{media}</div> : null}
    </section>
  );
}
