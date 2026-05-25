import type { ReactNode } from 'react';

import { Container, Flex, Grid, type GridProps, Heading, Section, Text } from '../components';
import { cn } from '../lib/cn';
import type { StatItem } from '../types';

export interface StatsSectionProps {
  readonly stats: readonly StatItem[];
  /** Optional section heading. */
  readonly title?: ReactNode;
  /** Optional supporting text rendered below the title. */
  readonly description?: ReactNode;
  /** Responsive column object (default: 1 column → 3 columns at sm). */
  readonly columns?: GridProps['columns'];
  readonly className?: string;
}

const DEFAULT_COLUMNS: GridProps['columns'] = { initial: '1', sm: '3' };

/**
 * StatsSection — a marketing stats band that highlights key metrics at large scale. Use for
 * homepage proof points, milestone announcements, or product overview pages (keywords: stats,
 * metrics, numbers, milestones, marketing band, proof points).
 */
export function StatsSection({
  stats,
  title,
  description,
  columns = DEFAULT_COLUMNS,
  className,
}: StatsSectionProps) {
  return (
    <Section size="3" className={cn(className)}>
      <Container size="4">
        <Flex direction="column" gap="6" align="center">
          {(title ?? description) ? (
            <Flex direction="column" gap="2" align="center">
              {title ? (
                <Heading as="h2" size="7" align="center">
                  {title}
                </Heading>
              ) : undefined}
              {description ? (
                <Text size="4" color="gray" align="center">
                  {description}
                </Text>
              ) : undefined}
            </Flex>
          ) : undefined}
          <Grid columns={columns} gap="6" width="100%">
            {stats.map((stat) => (
              <Flex key={stat.label} direction="column" align="center" gap="1">
                <Flex align="baseline" gap="2">
                  <Text size="8" weight="bold">
                    {stat.value}
                  </Text>
                  {stat.unit ? (
                    <Text size="5" color="gray">
                      {stat.unit}
                    </Text>
                  ) : undefined}
                </Flex>
                <Text size="3" color="gray" align="center">
                  {stat.label}
                </Text>
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
}
