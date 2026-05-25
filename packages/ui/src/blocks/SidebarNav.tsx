import type { ReactNode } from 'react';

import { Box, Flex, Link, Text } from '../components';
import { cn } from '../lib/cn';
import { Collapsible } from '../recipes';

/**
 * A single navigable item within a `SidebarNav` section.
 * Provide `label` + `href` at minimum; add `icon` for a leading glyph,
 * `active` to highlight the current route, and `badge` for a trailing indicator.
 */
export interface SidebarNavItem {
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

/**
 * A group of items in a `SidebarNav`.
 * Set `collapsible` to wrap the group in an expandable disclosure; `defaultOpen`
 * controls its initial state. Omit `label` to render an unlabelled section.
 */
export interface SidebarNavSection {
  /** Optional section heading. */
  readonly label?: ReactNode;
  /** Items belonging to this section. */
  readonly items: readonly SidebarNavItem[];
  /** Whether this section can be collapsed. */
  readonly collapsible?: boolean;
  /** Initial open state when `collapsible` is true. Defaults to `true`. */
  readonly defaultOpen?: boolean;
}

export interface SidebarNavProps {
  /** Brand/header slot pinned at the top of the sidebar. */
  readonly header?: ReactNode;
  /** Ordered list of navigation sections. */
  readonly sections: readonly SidebarNavSection[];
  /** Footer slot pinned at the bottom of the sidebar (user row, sign-out, etc.). */
  readonly footer?: ReactNode;
  /** Extra class names merged onto the root `<nav>` element. */
  readonly className?: string;
}

/** Shared item row used by both plain and collapsible sections. */
function SidebarNavItemRow({ item }: { readonly item: SidebarNavItem }) {
  return (
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
          <Text size="2" weight={item.active ? 'medium' : 'regular'} highContrast={item.active}>
            {item.label}
          </Text>
        </Box>
        {item.badge ? <Box flexShrink="0">{item.badge}</Box> : undefined}
      </Flex>
    </Link>
  );
}

function SidebarNavSectionRows({ items }: { readonly items: readonly SidebarNavItem[] }) {
  return (
    <Flex direction="column" gap="1">
      {items.map((item) => (
        <SidebarNavItemRow key={item.href} item={item} />
      ))}
    </Flex>
  );
}

/**
 * SidebarNav — app sidebar navigation with a header/brand slot, grouped nav sections
 * (optionally collapsible), and a footer slot. Use for app shells, admin dashboards,
 * and multi-section navigation drawers.
 * Keywords: sidebar, nav, navigation, drawer, sections, collapsible, dashboard, app shell.
 */
export function SidebarNav({ header, sections, footer, className }: SidebarNavProps) {
  return (
    <Box asChild height="100%" className={cn(className)}>
      <nav>
        <Flex direction="column" gap="4" height="100%">
          {header ? <Box>{header}</Box> : undefined}

          <Flex direction="column" gap="4" flexGrow="1">
            {sections.map((section, i) => {
              const key =
                typeof section.label === 'string' ? section.label : `section-${i.toString()}`;

              if (section.collapsible) {
                return (
                  <Collapsible
                    key={key}
                    defaultOpen={section.defaultOpen ?? true}
                    trigger={({ open }) => (
                      <Flex align="center" justify="between" px="3" py="1">
                        {section.label ? (
                          <Text size="1" color="gray" weight="medium">
                            {section.label}
                          </Text>
                        ) : undefined}
                        <Text size="1" color="gray">
                          {open ? '▴' : '▾'}
                        </Text>
                      </Flex>
                    )}
                  >
                    <SidebarNavSectionRows items={section.items} />
                  </Collapsible>
                );
              }

              return (
                <Box key={key}>
                  {section.label ? (
                    <Box px="3" pb="1">
                      <Text size="1" color="gray" weight="medium">
                        {section.label}
                      </Text>
                    </Box>
                  ) : undefined}
                  <SidebarNavSectionRows items={section.items} />
                </Box>
              );
            })}
          </Flex>

          {footer ? <Box mt="auto">{footer}</Box> : undefined}
        </Flex>
      </nav>
    </Box>
  );
}
