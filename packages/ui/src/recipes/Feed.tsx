import type { ReactNode } from 'react';

import { Box, Flex, Separator, Text } from '../components';
import { cn } from '../lib/cn';

/**
 * A single entry in a `Feed` timeline.
 * Provide `icon` for a leading glyph (e.g. an icon or avatar), `content` for the
 * primary body, and `timestamp` for a relative time label.
 */
export interface FeedItem {
  /** Stable identifier for the item. */
  readonly id: string;
  /** Leading icon or avatar slot — any ReactNode. */
  readonly icon?: ReactNode;
  /** Primary activity content — text, a node, or rich markup. */
  readonly content: ReactNode;
  /** Relative timestamp rendered below the content (e.g. "2 hours ago"). */
  readonly timestamp?: ReactNode;
}

export interface FeedProps {
  /** Ordered list of activity entries. */
  readonly items: readonly FeedItem[];
  /** Additional className merged onto the root element. */
  readonly className?: string;
}

/**
 * Feed — a vertical activity timeline.
 * Use for audit logs, job application timelines, notification histories, or any
 * ordered sequence of events with an icon, body, and timestamp.
 * Keywords: activity, timeline, log, history, events, feed, audit.
 */
export function Feed({ items, className }: FeedProps) {
  return (
    <Flex direction="column" gap="0" className={cn(className)}>
      {items.map((item, index) => (
        <Flex key={item.id} direction="column">
          <Flex gap="3" align="start" py="3">
            {/* Leading icon slot — falls back to a subtle timeline dot when no icon is given. */}
            <Flex
              direction="column"
              align="center"
              justify="center"
              flexShrink="0"
              width="32px"
              height="32px"
            >
              {item.icon != null ? item.icon : <Box className="mb-feed-dot" />}
            </Flex>

            {/* Content column */}
            <Flex direction="column" gap="1" flexGrow="1" minWidth="0">
              <Text size="2">{item.content}</Text>
              {item.timestamp != null ? (
                <Text size="1" color="gray">
                  {item.timestamp}
                </Text>
              ) : undefined}
            </Flex>
          </Flex>

          {index < items.length - 1 ? <Separator size="4" /> : undefined}
        </Flex>
      ))}
    </Flex>
  );
}
