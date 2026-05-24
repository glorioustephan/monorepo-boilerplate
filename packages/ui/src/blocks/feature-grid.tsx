import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export interface Feature {
  /** Short heading; also used as the list key, so keep it unique within a grid. */
  readonly title: string;
  /** Plain prose; rendered in a `<p>`, so keep it text (not block-level JSX). */
  readonly description: string;
  /** Optional leading visual (icon, glyph) rendered above the title. */
  readonly icon?: ReactNode;
}

export interface FeatureGridProps {
  readonly features: readonly Feature[];
  /** Column count at the widest breakpoint; the grid is single-column on mobile. */
  readonly columns?: 2 | 3 | 4;
  readonly className?: string;
}

const COLUMN_CLASS: Record<NonNullable<FeatureGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Block: a responsive grid of feature cards. Server Component driven by a
 * `features` list of slot content — no boolean layout flags.
 */
export function FeatureGrid({ features, columns = 3, className }: FeatureGridProps) {
  return (
    <ul className={cn("grid grid-cols-1 gap-6", COLUMN_CLASS[columns], className)}>
      {features.map((feature) => (
        <li
          key={feature.title}
          className="flex flex-col gap-2 rounded-md border border-border bg-surface p-6 text-surface-foreground"
        >
          {feature.icon ? <div className="text-primary">{feature.icon}</div> : null}
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </li>
      ))}
    </ul>
  );
}
