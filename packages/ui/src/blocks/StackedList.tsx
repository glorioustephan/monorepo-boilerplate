import type { ReactNode } from 'react';

import { Flex, Link, Separator, Text } from '../components';
import { cn } from '../lib/cn';

/**
 * A single item in a `StackedList`.
 * Provide `leading` for an avatar or icon, `title` + optional `description` as the primary
 * content, `meta` for a badge or timestamp, and `trailing` for an action (button/menu).
 * Set `href` to wrap the primary content in an anchor.
 */
export interface StackedListItem {
  /** Stable identifier for the item. */
  readonly id: string;
  /** Leading slot — typically an Avatar or icon node. */
  readonly leading?: ReactNode;
  /** Primary text or node. */
  readonly title: ReactNode;
  /** Secondary text or node rendered below the title. */
  readonly description?: ReactNode;
  /** Inline metadata rendered before the trailing slot — e.g. a Badge or timestamp. */
  readonly meta?: ReactNode;
  /** Trailing slot — typically an action button or dropdown menu. */
  readonly trailing?: ReactNode;
  /** When set, wraps the primary content (leading + title/description) in an anchor. */
  readonly href?: string;
}

export interface StackedListProps {
  /** Items to display in the list. */
  readonly items: readonly StackedListItem[];
  /** Additional className merged onto the root element. */
  readonly className?: string;
}

/**
 * StackedList — a vertical list of richly composed rows.
 * Use for people directories, feed items, file listings, or any entity list that
 * needs a leading slot (avatar/icon), title+description copy, inline metadata, and
 * optional trailing actions. Keywords: list, feed, directory, contacts, rows, items.
 */
export function StackedList({ items, className }: StackedListProps) {
  return (
    <Flex direction="column" className={cn(className)}>
      {items.map((item, index) => {
        const primaryContent = (
          <Flex align="center" gap="3" flexGrow="1" minWidth="0">
            {item.leading}
            <Flex direction="column" gap="1" flexGrow="1" minWidth="0">
              <Text size="2" weight="medium" truncate>
                {item.title}
              </Text>
              {item.description ? (
                <Text size="1" color="gray" truncate>
                  {item.description}
                </Text>
              ) : undefined}
            </Flex>
          </Flex>
        );

        return (
          <Flex key={item.id} direction="column">
            <Flex align="center" justify="between" gap="3" py="3">
              {item.href ? (
                <Flex flexGrow="1" minWidth="0">
                  <Link href={item.href} underline="none" color="gray">
                    {primaryContent}
                  </Link>
                </Flex>
              ) : (
                primaryContent
              )}
              <Flex align="center" gap="3" flexShrink="0">
                {item.meta}
                {item.trailing}
              </Flex>
            </Flex>
            {index < items.length - 1 ? <Separator size="4" /> : undefined}
          </Flex>
        );
      })}
    </Flex>
  );
}
