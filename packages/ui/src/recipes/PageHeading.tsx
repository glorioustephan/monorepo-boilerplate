import type { ReactNode } from 'react';

import { Box, Flex, Heading, Text } from '../components';
import { cn } from '../lib/cn';

/** PageHeadingProps — props for the PageHeading recipe. */
export interface PageHeadingProps {
  /** Primary page title, rendered as an `<h1>`. */
  readonly title: ReactNode;
  /** Supporting description shown below the title row. */
  readonly description?: ReactNode;
  /** Breadcrumb slot — pass a rendered `<Breadcrumb>` component. */
  readonly breadcrumbs?: ReactNode;
  /** Inline metadata slot (badges, dates, status) shown beneath the title. */
  readonly meta?: ReactNode;
  /** Action slot — buttons, menus, etc. flush to the trailing edge. */
  readonly actions?: ReactNode;
  readonly className?: string;
}

/**
 * PageHeading — top-of-page heading with breadcrumbs, title, meta, and an actions slot.
 * Use for dashboard pages, detail views, or any route that needs a structured page header
 * with optional breadcrumb trail, inline metadata, and primary actions. Keywords: page
 * header, breadcrumb, title, actions, h1.
 */
export function PageHeading({
  title,
  description,
  breadcrumbs,
  meta,
  actions,
  className,
}: PageHeadingProps) {
  return (
    <Flex direction="column" gap="3" className={cn(className)}>
      {breadcrumbs}
      <Flex align="center" justify="between" gap="4" wrap="wrap">
        <Box minWidth="0">
          <Heading as="h1" size="7" truncate>
            {title}
          </Heading>
          {meta ? (
            <Flex gap="2" mt="1">
              {meta}
            </Flex>
          ) : undefined}
        </Box>
        {actions ? (
          <Flex gap="2" flexShrink="0">
            {actions}
          </Flex>
        ) : undefined}
      </Flex>
      {description ? (
        <Text color="gray" size="2">
          {description}
        </Text>
      ) : undefined}
    </Flex>
  );
}
