import type { ReactNode } from 'react';

import { Flex, Heading, Text } from '../components';
import { cn } from '../lib/cn';

/** EmptyState props — centered placeholder for zero-data views. */
export interface EmptyStateProps {
  /** Optional icon rendered above the heading — pass a ReactNode (e.g. an icon from @radix-ui/react-icons). */
  readonly icon?: ReactNode;
  /** Primary heading for the empty state. */
  readonly title: ReactNode;
  /** Supporting description rendered below the heading. */
  readonly description?: ReactNode;
  /** Action slot — typically a primary `<Button>` to create or add content. */
  readonly action?: ReactNode;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/**
 * EmptyState — centered placeholder for zero-data views.
 * Use for empty lists, search results with no matches, or onboarding prompts.
 * Keywords: empty, placeholder, zero-data, no results, onboarding, blank slate.
 */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <Flex direction="column" align="center" gap="3" py="8" className={cn(className)}>
      {icon ? icon : undefined}
      <Heading as="h3" size="4" align="center">
        {title}
      </Heading>
      {description ? (
        <Text size="2" color="gray" align="center">
          {description}
        </Text>
      ) : undefined}
      {action ? action : undefined}
    </Flex>
  );
}
