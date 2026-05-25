import type { ReactNode } from 'react';

import { Box, Container, Flex, Grid, Heading, Section, Text } from '../components';
import { cn } from '../lib/cn';

export interface ContentSectionProps {
  /** Small label rendered above the title — use for "eyebrow" category or step text. */
  readonly eyebrow?: ReactNode;
  /** Primary section headline. */
  readonly title?: ReactNode;
  /** Supporting paragraph text rendered below the title. */
  readonly description?: ReactNode;
  /** Arbitrary body content rendered below description (rich text, lists, CTAs). */
  readonly children?: ReactNode;
  /** Media slot — image, video, illustration, or screenshot node. */
  readonly media?: ReactNode;
  /**
   * Layout variant.
   * - `'stacked'` (default): text and media stacked vertically.
   * - `'split'`: text and media side-by-side in a two-column grid (when `media` is present).
   */
  readonly layout?: 'stacked' | 'split';
  /** Additional className merged onto the root element. */
  readonly className?: string;
}

/**
 * ContentSection — a prose / editorial content section with optional split or stacked media.
 * Use for product descriptions, about sections, how-it-works explanations, or any editorial
 * area that pairs copy with a visual (keywords: content, editorial, prose, split, media,
 * about, description, marketing).
 */
export function ContentSection({
  eyebrow,
  title,
  description,
  children,
  media,
  layout = 'stacked',
  className,
}: ContentSectionProps) {
  const isSplit = layout === 'split' && media != null;

  const textBlock = (
    <Flex direction="column" gap="4">
      {eyebrow ? (
        <Text size="2" color="indigo" weight="medium">
          {eyebrow}
        </Text>
      ) : undefined}
      {title ? (
        <Heading as="h2" size="7">
          {title}
        </Heading>
      ) : undefined}
      {description ? (
        <Text size="4" color="gray">
          {description}
        </Text>
      ) : undefined}
      {children}
    </Flex>
  );

  return (
    <Section size="3" className={cn(className)}>
      <Container size="3">
        {isSplit ? (
          <Grid columns={{ initial: '1', md: '2' }} gap="6" align="center">
            {textBlock}
            <Box>{media}</Box>
          </Grid>
        ) : (
          <Flex direction="column" gap="6">
            {textBlock}
            {media ? <Box>{media}</Box> : undefined}
          </Flex>
        )}
      </Container>
    </Section>
  );
}
