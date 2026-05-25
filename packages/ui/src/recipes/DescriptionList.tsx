import type { ReactNode } from 'react';

import { DataList } from '../components';
import { cn } from '../lib/cn';

export interface DescriptionListItem {
  readonly term: ReactNode;
  readonly value: ReactNode;
}

export interface DescriptionListProps {
  /** Key/value pairs to display. */
  readonly items: readonly DescriptionListItem[];
  /**
   * Layout orientation passed through to `DataList.Root`.
   * `'horizontal'` places term and value side-by-side; `'vertical'` stacks them.
   */
  readonly orientation?: 'horizontal' | 'vertical';
  readonly className?: string;
}

/**
 * DescriptionList — a key/value metadata list built over the DataList compound atom.
 * Use for profile details, entity summaries, settings panels, or any left-aligned
 * term/value layout (keywords: metadata, detail, definition list, key-value, profile).
 */
export function DescriptionList({ items, orientation, className }: DescriptionListProps) {
  return (
    <DataList.Root orientation={orientation} className={cn(className)}>
      {items.map((item, index) => (
        <DataList.Item key={index}>
          <DataList.Label>{item.term}</DataList.Label>
          <DataList.Value>{item.value}</DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
}
