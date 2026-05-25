import type { ReactNode } from 'react';

import { Card, Flex, Heading, Text } from '../components';
import { cn } from '../lib/cn';

export interface ActionPanelProps {
  /** Primary heading for the settings row (e.g. "Delete account"). */
  readonly title: ReactNode;
  /** Supporting copy rendered below the title. */
  readonly description?: ReactNode;
  /** Action slot — typically a `<Button>` or `<Link>`. */
  readonly action?: ReactNode;
  /** Additional className merged onto the root element. */
  readonly className?: string;
}

/**
 * ActionPanel — a settings-row card pairing a title + description with an action slot.
 * Use for settings pages, account management rows, subscription changes, or any
 * "label + destructive/confirmable action" pattern.
 * Keywords: settings, action, row, card, description, panel, management, account.
 */
export function ActionPanel({ title, description, action, className }: ActionPanelProps) {
  return (
    <Card className={cn(className)}>
      <Flex align="center" justify="between" gap="4" wrap="wrap">
        <Flex direction="column" gap="1" flexGrow="1" minWidth="0">
          <Heading as="h3" size="3">
            {title}
          </Heading>
          {description != null ? (
            <Text size="2" color="gray">
              {description}
            </Text>
          ) : undefined}
        </Flex>
        {action != null ? <Flex flexShrink="0">{action}</Flex> : undefined}
      </Flex>
    </Card>
  );
}
