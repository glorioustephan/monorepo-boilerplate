import type { ReactNode } from 'react';

import { Box, Container, Flex, Section, Separator } from '../components';
import { cn } from '../lib/cn';

/** DashboardTemplateProps — props for the DashboardTemplate. */
export interface DashboardTemplateProps {
  /**
   * Sidebar slot — render a `<SidebarNav>` here.
   * Hidden on mobile (below the `md` breakpoint); the `header` Navbar's
   * mobile menu covers navigation on small screens.
   */
  readonly sidebar: ReactNode;
  /**
   * Header slot — render a top `<Navbar>` or custom top bar here.
   * Spans the full width of the main column above the content area.
   */
  readonly header?: ReactNode;
  /** Main content area — page body rendered inside a `Container size="4"`. */
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * DashboardTemplate — a full-height app shell with a fixed-width sidebar and a
 * scrollable main column. Use for admin dashboards, app shells, and any
 * authenticated multi-section layout.
 * Keywords: dashboard, app shell, sidebar, admin, layout, scaffold, authenticated.
 */
export function DashboardTemplate({
  sidebar,
  header,
  children,
  className,
}: DashboardTemplateProps) {
  return (
    <Flex minHeight="100vh" className={cn(className)}>
      {/* Sidebar — hidden on mobile */}
      <Box
        display={{ initial: 'none', md: 'block' }}
        width="260px"
        flexShrink="0"
        position="relative"
      >
        {sidebar}
        {/* Right border via a positioned separator */}
        <Box position="absolute" top="0" right="0" height="100%">
          <Separator orientation="vertical" size="4" />
        </Box>
      </Box>

      {/* Main column */}
      <Flex direction="column" flexGrow="1" minWidth="0">
        {header !== undefined ? <Box>{header}</Box> : undefined}

        {/* Scrollable content area */}
        <Box flexGrow="1">
          <Container size="4">
            <Section size="3">{children}</Section>
          </Container>
        </Box>
      </Flex>
    </Flex>
  );
}
