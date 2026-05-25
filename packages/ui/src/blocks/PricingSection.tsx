'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import type { GridProps } from '../components';
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  SegmentedControl,
  Separator,
  Text,
} from '../components';
import { cn } from '../lib/cn';

/** PricingPeriod — a billing period option rendered in the SegmentedControl toggle (e.g. monthly/annual). */
export interface PricingPeriod {
  readonly id: string;
  readonly label: ReactNode;
}

/**
 * PricingTier — a single pricing plan. `price` may be a single ReactNode (period-agnostic)
 * or a record keyed by `PricingPeriod.id` for per-period display.
 * Use with PricingSection for multi-tier marketing pricing grids (keywords: plan, tier, billing, subscription).
 */
export interface PricingTier {
  readonly id: string;
  readonly name: ReactNode;
  readonly description?: ReactNode;
  /** A single price node, or a record mapping period id → price node. */
  readonly price: ReactNode | Readonly<Record<string, ReactNode>>;
  /** Rendered beside the price; e.g. "/ month". */
  readonly priceSuffix?: ReactNode;
  readonly features: readonly ReactNode[];
  /** Action slot — typically a full-width `<Button>`. */
  readonly cta: ReactNode;
  /** When true, renders the card with `classic` variant and a "Popular" badge. */
  readonly highlighted?: boolean;
}

const DEFAULT_COLUMNS: GridProps['columns'] = { initial: '1', md: '3' };

/**
 * PricingSection — a marketing page-section rendering tiered pricing cards with an optional
 * billing-period toggle. Use for SaaS pricing pages, plan comparisons, or subscription UIs
 * (keywords: pricing, plans, tiers, billing, toggle, monthly, annual, subscription, marketing).
 */
export interface PricingSectionProps {
  readonly tiers: readonly PricingTier[];
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  /** When provided (length ≥ 2), renders a SegmentedControl billing-period toggle. */
  readonly periods?: readonly PricingPeriod[];
  /** Initial selected period id; defaults to the first period. */
  readonly defaultPeriodId?: string;
  readonly onPeriodChange?: (periodId: string) => void;
  /** Responsive column count passed to `<Grid>`. Defaults to `{ initial: '1', md: '3' }`. */
  readonly columns?: GridProps['columns'];
  readonly className?: string;
}

/** PricingSection — see PricingSectionProps. */
export function PricingSection({
  tiers,
  title,
  description,
  periods,
  defaultPeriodId,
  onPeriodChange,
  columns = DEFAULT_COLUMNS,
  className,
}: PricingSectionProps) {
  const showToggle = periods !== undefined && periods.length >= 2;
  const firstPeriodId = periods?.[0]?.id ?? '';

  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(
    defaultPeriodId ?? firstPeriodId,
  );

  function handlePeriodChange(value: string) {
    setSelectedPeriodId(value);
    onPeriodChange?.(value);
  }

  return (
    <Section size="4" className={cn(className)}>
      <Container size="4">
        <Flex direction="column" align="center" gap="6">
          {(title !== undefined || description !== undefined) && (
            <Flex direction="column" align="center" gap="3">
              {title !== undefined && (
                <Heading as="h2" size="8" align="center">
                  {title}
                </Heading>
              )}
              {description !== undefined && (
                <Text size="4" color="gray" align="center">
                  {description}
                </Text>
              )}
            </Flex>
          )}

          {showToggle && periods !== undefined && (
            <SegmentedControl.Root
              value={selectedPeriodId}
              onValueChange={handlePeriodChange}
              size="2"
            >
              {periods.map((period) => (
                <SegmentedControl.Item key={period.id} value={period.id}>
                  {period.label}
                </SegmentedControl.Item>
              ))}
            </SegmentedControl.Root>
          )}

          <Grid columns={columns} gap="5" width="100%">
            {tiers.map((tier) => {
              const resolvedPrice = resolveTierPrice(tier.price, selectedPeriodId);
              return (
                <Card key={tier.id} variant={tier.highlighted ? 'classic' : 'surface'} size="3">
                  <Flex direction="column" gap="4" height="100%">
                    {/* Header */}
                    <Flex direction="column" gap="2">
                      <Flex align="center" justify="between">
                        <Heading as="h3" size="5">
                          {tier.name}
                        </Heading>
                        {tier.highlighted && (
                          <Badge color="indigo" highContrast>
                            Popular
                          </Badge>
                        )}
                      </Flex>
                      {tier.description !== undefined && (
                        <Text size="2" color="gray">
                          {tier.description}
                        </Text>
                      )}
                    </Flex>

                    <Separator size="4" />

                    {/* Price */}
                    <Flex align="baseline" gap="1">
                      <Text size="8" weight="bold">
                        {resolvedPrice}
                      </Text>
                      {tier.priceSuffix !== undefined && (
                        <Text size="2" color="gray">
                          {tier.priceSuffix}
                        </Text>
                      )}
                    </Flex>

                    {/* CTA */}
                    <Box>{tier.cta}</Box>

                    <Separator size="4" />

                    {/* Features */}
                    <Flex direction="column" gap="2" flexGrow="1">
                      {tier.features.map((feature, i) => (
                        // Index key is stable here — features are readonly and order-fixed per tier.
                        // biome-ignore lint/suspicious/noArrayIndexKey: features have no stable id
                        <Flex key={i} align="center" gap="2">
                          <Text color="green" aria-hidden="true">
                            ✓
                          </Text>
                          <Text size="2">{feature}</Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                </Card>
              );
            })}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
}

/**
 * Resolves the price for a given period id.
 * If `price` is a plain ReactNode, returns it directly.
 * If `price` is a period-keyed record, looks up `periodId` (noUncheckedIndexedAccess-safe:
 * the lookup may return `undefined`, which is a valid `ReactNode`).
 */
function resolveTierPrice(
  price: ReactNode | Readonly<Record<string, ReactNode>>,
  periodId: string,
): ReactNode {
  if (price !== null && typeof price === 'object' && !isValidElement(price)) {
    // Narrow to the record branch. Cast through unknown to satisfy the ReactNode return type;
    // the lookup result is ReactNode | undefined, and undefined is an acceptable ReactNode.
    const record = price as unknown as Readonly<Record<string, ReactNode>>;
    return record[periodId] as ReactNode;
  }
  // In this branch price is a ReactNode (not a plain record); cast to satisfy the return type.
  return price as ReactNode;
}

/**
 * Minimal React element check — avoids importing `isValidElement` from react at the type level
 * while still distinguishing JSX from plain record objects.
 */
function isValidElement(value: object): boolean {
  return '$$typeof' in value;
}
