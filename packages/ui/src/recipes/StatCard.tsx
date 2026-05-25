import type { ReactNode } from 'react';

import { Badge, Card, Flex, Heading, Text } from '../components';
import { cn } from '../lib/cn';
import type { StatItem } from '../types';

export interface StatCardProps {
  /** Metric label, e.g. "Total subscribers". */
  readonly label: ReactNode;
  /** Primary metric value, e.g. "71,897". */
  readonly value: ReactNode;
  /** Optional unit/suffix rendered beside the value, e.g. "MRR". */
  readonly unit?: string;
  /** Optional change indicator; reuses the `StatItem['delta']` shape. */
  readonly delta?: StatItem['delta'];
  /** Optional icon rendered at the trailing edge of the label row. */
  readonly icon?: ReactNode;
  readonly className?: string;
}

const TREND_COLOR = {
  up: 'green',
  down: 'red',
  neutral: 'gray',
} as const satisfies Record<NonNullable<StatItem['delta']>['trend'], string>;

const TREND_GLYPH: Record<NonNullable<StatItem['delta']>['trend'], string> = {
  up: '↑',
  down: '↓',
  neutral: '→',
};

/**
 * StatCard — a single metric tile displaying a label, a primary value, an optional unit,
 * and an optional trend badge. Use for KPI grids, dashboards, or any "stats with borders"
 * layout (keywords: metric, KPI, stat, delta, trend).
 */
export function StatCard({ label, value, unit, delta, icon, className }: StatCardProps) {
  return (
    <Card className={cn(className)}>
      <Flex justify="between" align="start">
        <Text size="2" color="gray">
          {label}
        </Text>
        {icon}
      </Flex>
      <Flex align="baseline" gap="2" mt="2">
        <Heading size="7">{value}</Heading>
        {unit ? (
          <Text size="2" color="gray">
            {unit}
          </Text>
        ) : undefined}
      </Flex>
      {delta ? (
        <Flex mt="2">
          <Badge color={TREND_COLOR[delta.trend]}>
            {TREND_GLYPH[delta.trend]} {delta.value}
          </Badge>
        </Flex>
      ) : undefined}
    </Card>
  );
}
