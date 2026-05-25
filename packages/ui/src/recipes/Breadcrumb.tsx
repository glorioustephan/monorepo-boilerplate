import type { ReactNode } from 'react';

import { Link, Text } from '../components';
import { cn } from '../lib/cn';
import type { BreadcrumbItem } from '../types';

/** Breadcrumb props — ordered trail of navigational crumbs. */
export interface BreadcrumbProps {
  /** Ordered list of crumb items. The last item (or any item without `href`) marks the current page. */
  readonly items: readonly BreadcrumbItem[];
  /** Separator rendered between crumbs. Defaults to a gray "/" text. */
  readonly separator?: ReactNode;
  /** Extra class names merged onto the root `<nav>` element. */
  readonly className?: string;
}

const DefaultSeparator = (
  <Text color="gray" aria-hidden>
    /
  </Text>
);

/**
 * Breadcrumb — a navigational trail showing the current page's location in the hierarchy.
 * Use for multi-level navigation — content pages, settings, admin dashboards.
 * Keywords: breadcrumb, navigation, trail, hierarchy, wayfinding, path, crumbs.
 */
export function Breadcrumb({ items, separator = DefaultSeparator, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--space-2)',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = isLast || !item.href;
          return (
            <li
              key={item.href ?? item.label}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
            >
              {isCurrent ? (
                <Text size="2" aria-current="page">
                  {item.label}
                </Text>
              ) : (
                <Link size="2" href={item.href}>
                  {item.label}
                </Link>
              )}
              {!isLast ? separator : undefined}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
