import type { ReactNode } from 'react';

import { Box, Card, Flex, Grid, type GridProps, Heading, Link, Text } from '../components';
import { cn } from '../lib/cn';

/**
 * A single item in a `GridList`.
 * Provide `media` for a visual slot (Avatar, image, icon), `title` as the primary label,
 * `description` for supporting copy, and `meta` for a footer badge or timestamp.
 * Set `href` to wrap the card in a link.
 */
export interface GridListItem {
  /** Stable identifier for the item. */
  readonly id: string;
  /** Media slot — typically an Avatar, image, or icon node. */
  readonly media?: ReactNode;
  /** Primary text or node rendered as the card heading. */
  readonly title: ReactNode;
  /** Secondary text or node rendered below the title. */
  readonly description?: ReactNode;
  /** Footer slot — e.g. a Badge, email address, or timestamp. */
  readonly meta?: ReactNode;
  /** When set, wraps the entire card in an anchor. */
  readonly href?: string;
}

export interface GridListProps {
  /** Items to render as cards in the grid. */
  readonly items: readonly GridListItem[];
  /**
   * Responsive column counts per breakpoint.
   * Defaults to `{ initial: '1', sm: '2', lg: '3' }`.
   */
  readonly columns?: GridProps['columns'];
  /** Additional className merged onto the root element. */
  readonly className?: string;
}

// Stable reference so the default prop doesn't break referential equality per render.
const DEFAULT_COLUMNS: GridProps['columns'] = { initial: '1', sm: '2', lg: '3' };

/**
 * GridList — a responsive card grid for people, projects, or files.
 * Use for directory listings, contact cards, project overviews, or any entity set
 * that benefits from a visual media slot, title + description copy, and a footer
 * meta area. Keywords: grid, cards, directory, contacts, people, projects, files.
 */
export function GridList({ items, columns = DEFAULT_COLUMNS, className }: GridListProps) {
  return (
    <Grid columns={columns} gap="4" className={cn(className)}>
      {items.map((item) => {
        const cardContent = (
          <Flex direction="column" gap="3" height="100%">
            {item.media ? (
              <Flex justify="center" align="center">
                {item.media}
              </Flex>
            ) : undefined}
            <Flex direction="column" gap="1" flexGrow="1">
              <Heading as="h3" size="3">
                {item.title}
              </Heading>
              {item.description ? (
                <Text size="2" color="gray">
                  {item.description}
                </Text>
              ) : undefined}
            </Flex>
            {item.meta ? (
              <Box pt="2">
                <Text size="1" color="gray">
                  {item.meta}
                </Text>
              </Box>
            ) : undefined}
          </Flex>
        );

        if (item.href) {
          return (
            <Card key={item.id} size="2" asChild>
              <Link href={item.href} underline="none" color="gray">
                {cardContent}
              </Link>
            </Card>
          );
        }

        return (
          <Card key={item.id} size="2">
            {cardContent}
          </Card>
        );
      })}
    </Grid>
  );
}
