import type { ReactNode } from 'react';

import {
  Blockquote,
  Card,
  Container,
  Flex,
  Grid,
  type GridProps,
  Heading,
  Section,
  Text,
} from '../components';
import { cn } from '../lib/cn';

/** A single customer testimonial entry. */
export interface Testimonial {
  /** Stable identifier for list keys. */
  readonly id: string;
  /** The quote text or rich content. */
  readonly quote: ReactNode;
  /** Author display name. */
  readonly authorName: ReactNode;
  /** Author job title or company. */
  readonly authorTitle?: ReactNode;
  /** Avatar slot — pass an `<Avatar>` or `<img>`. */
  readonly avatar?: ReactNode;
  /** Star rating 1–5; renders ★/☆ glyphs. */
  readonly rating?: number;
}

export interface TestimonialSectionProps {
  readonly testimonials: readonly Testimonial[];
  /** Optional section heading rendered above the grid. */
  readonly title?: ReactNode;
  /** Responsive column object (default: 1 column → 2 columns at md). */
  readonly columns?: GridProps['columns'];
  readonly className?: string;
}

const DEFAULT_COLUMNS: GridProps['columns'] = { initial: '1', md: '2' };

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(1, Math.round(rating)));
  const stars = Array.from({ length: 5 }, (_, i) => (i < clamped ? '★' : '☆')).join('');
  return (
    <Text size="3" color="yellow">
      {stars}
    </Text>
  );
}

/**
 * TestimonialSection — a grid of customer quote cards with author attribution and optional star
 * ratings. Use for social-proof sections, review walls, or case-study pull-quotes (keywords:
 * testimonials, reviews, quotes, social proof, customers).
 */
export function TestimonialSection({
  testimonials,
  title,
  columns = DEFAULT_COLUMNS,
  className,
}: TestimonialSectionProps) {
  return (
    <Section size="3" className={cn(className)}>
      <Container size="4">
        <Flex direction="column" gap="6">
          {title ? (
            <Heading as="h2" size="7" align="center">
              {title}
            </Heading>
          ) : undefined}
          <Grid columns={columns} gap="4">
            {testimonials.map((t) => (
              <Card key={t.id} size="3">
                <Flex direction="column" gap="4">
                  {t.rating !== undefined ? <StarRating rating={t.rating} /> : undefined}
                  <Blockquote size="3">{t.quote}</Blockquote>
                  <Flex align="center" gap="3">
                    {t.avatar}
                    <Flex direction="column" gap="1">
                      <Text size="2" weight="bold">
                        {t.authorName}
                      </Text>
                      {t.authorTitle ? (
                        <Text size="1" color="gray">
                          {t.authorTitle}
                        </Text>
                      ) : undefined}
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
}
