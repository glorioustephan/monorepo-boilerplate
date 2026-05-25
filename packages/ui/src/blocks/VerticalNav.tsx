import type { ReactNode } from 'react';

import { Box, Flex, Link, Text } from '../components';
import { cn } from '../lib/cn';

/**
 * A single item in a `VerticalNav`.
 * Provide `label` + `href` at minimum; add `icon` for a leading glyph,
 * `active` to highlight the current route, and `badge` for a trailing count or status.
 */
export interface VerticalNavItem {
  /** Visible label. */
  readonly label: ReactNode;
  /** Destination URL. */
  readonly href: string;
  /** Leading icon slot — any `ReactNode`; no icon library imported here. */
  readonly icon?: ReactNode;
  /** Marks this item as the active/current route. */
  readonly active?: boolean;
  /** Trailing slot — e.g. a count badge or status indicator. */
  readonly badge?: ReactNode;
}

export interface VerticalNavProps {
  /** Navigation items to render. */
  readonly items: readonly VerticalNavItem[];
  /** Additional className merged onto the root `<nav>` element. */
  readonly className?: string;
}

/**
 * VerticalNav — a vertical navigation list with active state and optional leading icons.
 * Use for sidebars, settings menus, and dashboard navigation rails. Supports an icon
 * slot, active highlighting, and a trailing badge for counts or status.
 * Keywords: sidebar, nav, navigation, menu, vertical, links, dashboard.
 */
export function VerticalNav({ items, className }: VerticalNavProps) {
  return (
    <Box asChild className={cn(className)}>
      <nav>
        <Flex direction="column" gap="1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              underline="none"
              weight={item.active ? 'medium' : 'regular'}
              highContrast={item.active}
              color="gray"
            >
              <Flex align="center" gap="3" px="3" py="2">
                {item.icon ? (
                  <Box flexShrink="0" width="4">
                    {item.icon}
                  </Box>
                ) : undefined}
                <Box flexGrow="1">
                  <Text
                    size="2"
                    weight={item.active ? 'medium' : 'regular'}
                    highContrast={item.active}
                  >
                    {item.label}
                  </Text>
                </Box>
                {item.badge ? <Box flexShrink="0">{item.badge}</Box> : undefined}
              </Flex>
            </Link>
          ))}
        </Flex>
      </nav>
    </Box>
  );
}
