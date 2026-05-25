import type { ReactNode } from 'react';

import { Box, Card, Flex, Grid, Heading, Text } from '../components';
import { cn } from '../lib/cn';

/**
 * A single cell in a `BentoGrid`.
 * Set `colSpan`/`rowSpan` for asymmetric layout.
 * Use `media` for a visual slot and `children` for arbitrary rich content.
 */
export interface BentoItem {
  /** Stable identifier for list keys. */
  readonly id: string;
  /** Card headline. */
  readonly title?: ReactNode;
  /** Supporting text rendered below the title. */
  readonly description?: ReactNode;
  /** Visual slot — illustration, screenshot, icon group, or image node. */
  readonly media?: ReactNode;
  /** Number of grid columns this cell spans (1–3). */
  readonly colSpan?: 1 | 2 | 3;
  /** Number of grid rows this cell spans (1–2). */
  readonly rowSpan?: 1 | 2;
  /** Arbitrary rich content rendered below description. */
  readonly children?: ReactNode;
}

export interface BentoGridProps {
  /** Items to render as cards in the asymmetric grid. */
  readonly items: readonly BentoItem[];
  /** Additional className merged onto the root element. */
  readonly className?: string;
}

/**
 * BentoGrid — an asymmetric feature grid with variable column and row spans.
 * Use for product feature showcases, marketing landing sections, or capability overviews
 * where cells need different visual weights (keywords: bento, feature, grid, asymmetric,
 * marketing, showcase, cards).
 */
export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <Grid columns={{ initial: '1', md: '3' }} gap="4" className={cn(className)}>
      {items.map((item) => (
        <Box
          key={item.id}
          gridColumn={item.colSpan && item.colSpan > 1 ? { md: `span ${item.colSpan}` } : undefined}
          gridRow={item.rowSpan && item.rowSpan > 1 ? { md: `span ${item.rowSpan}` } : undefined}
          height="100%"
        >
          <Card size="3" style={{ height: '100%' }}>
            <Flex direction="column" gap="3" height="100%">
              {item.media ? <Box flexGrow="1">{item.media}</Box> : undefined}
              {item.title ? (
                <Heading as="h3" size="3">
                  {item.title}
                </Heading>
              ) : undefined}
              {item.description ? (
                <Text size="2" color="gray">
                  {item.description}
                </Text>
              ) : undefined}
              {item.children}
            </Flex>
          </Card>
        </Box>
      ))}
    </Grid>
  );
}
