import type { ReactNode } from 'react';

import { Flex, Heading, Text } from '../components';
import { cn } from '../lib/cn';

/** SectionHeadingProps — props for the SectionHeading recipe. */
export interface SectionHeadingProps {
  /** Section title. */
  readonly title: ReactNode;
  /** Optional supporting description rendered beneath the title. */
  readonly description?: ReactNode;
  /** Action slot — buttons, links, or menus flush to the trailing edge. */
  readonly actions?: ReactNode;
  /** Heading element level; defaults to `'h2'`. */
  readonly as?: 'h2' | 'h3';
  readonly className?: string;
}

/**
 * SectionHeading — within-page section header with optional description and trailing actions.
 * Use to introduce distinct content sections on a page, data tables, or feature groups.
 * Keywords: section header, h2, h3, divider heading, with actions.
 */
export function SectionHeading({
  title,
  description,
  actions,
  as = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <Flex align="end" justify="between" gap="4" wrap="wrap" className={cn(className)}>
      <Flex direction="column" gap="1">
        <Heading as={as} size="5">
          {title}
        </Heading>
        {description ? (
          <Text color="gray" size="2">
            {description}
          </Text>
        ) : undefined}
      </Flex>
      {actions}
    </Flex>
  );
}
