import type { ReactNode } from 'react';

import { Flex, Heading, Text } from '../components';
import { cn } from '../lib/cn';

/** CardHeadingProps — props for the CardHeading recipe. */
export interface CardHeadingProps {
  /** Card title, rendered as an `<h3>`. */
  readonly title: ReactNode;
  /** Optional supporting description rendered beneath the title. */
  readonly description?: ReactNode;
  /** Avatar slot — pass a rendered `<Avatar>` component. */
  readonly avatar?: ReactNode;
  /** Action slot — icon buttons, menus, etc. flush to the trailing edge. */
  readonly actions?: ReactNode;
  readonly className?: string;
}

/**
 * CardHeading — header row for inside a Card, with an optional avatar, title, description,
 * and trailing actions. Use as the top row of any Card that represents a person, resource,
 * or entity with contextual actions. Keywords: card header, avatar, h3, card title, actions.
 */
export function CardHeading({ title, description, avatar, actions, className }: CardHeadingProps) {
  return (
    <Flex align="center" justify="between" gap="3" className={cn(className)}>
      <Flex align="center" gap="3">
        {avatar}
        <Flex direction="column">
          <Heading as="h3" size="3">
            {title}
          </Heading>
          {description ? (
            <Text size="2" color="gray">
              {description}
            </Text>
          ) : undefined}
        </Flex>
      </Flex>
      {actions}
    </Flex>
  );
}
