'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { Box, Callout, Flex, IconButton, Text } from '../components';
import { cn } from '../lib/cn';

/** Infer the Callout.Root color type from the compound atom. */
type CalloutColor = ComponentProps<typeof Callout.Root>['color'];
type CalloutVariant = ComponentProps<typeof Callout.Root>['variant'];

/** Alert props — status/intent banner with optional dismiss and action slots. */
export interface AlertProps {
  /** Optional heading rendered in bold above the body. */
  readonly title?: ReactNode;
  /** Alert body content. */
  readonly children: ReactNode;
  /** Radix Themes color token — drives intent (green=success, red=error, amber=warning, blue=info). */
  readonly color?: CalloutColor;
  /** Callout variant: 'soft' (default), 'surface', 'outline'. */
  readonly variant?: CalloutVariant;
  /** Leading icon slot — pass a ReactNode (e.g. an icon from @radix-ui/react-icons). */
  readonly icon?: ReactNode;
  /** Dismiss glyph rendered inside the dismiss button. Defaults to a "✕" text mark. */
  readonly dismissIcon?: ReactNode;
  /** Accessible label for the dismiss button. Defaults to "Dismiss". */
  readonly dismissLabel?: string;
  /** Action slot — rendered below the body (e.g. one or two `<Button>`s). */
  readonly actions?: ReactNode;
  /** Called when the dismiss button is clicked. Omitting it hides the dismiss button. */
  readonly onDismiss?: () => void;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/** Stable default for the dismiss glyph (avoids re-creating the element each render). */
const DEFAULT_DISMISS_ICON = <Text aria-hidden="true">✕</Text>;

/**
 * Alert — status/intent banner built over the Callout atom.
 * Use for feedback messages: success, error, warning, info, with optional actions and dismissal.
 * Keywords: banner, notification, status, feedback, callout, dismiss, info, warning, error, success.
 */
export function Alert({
  title,
  children,
  color,
  variant,
  icon,
  dismissIcon = DEFAULT_DISMISS_ICON,
  dismissLabel = 'Dismiss',
  actions,
  onDismiss,
  className,
}: AlertProps) {
  return (
    // `.mb-alert` overrides Callout's internal grid with a flex row (icon | content | dismiss)
    // so actions stack below the message and the dismiss aligns to the first line.
    <Callout.Root color={color} variant={variant} className={cn('mb-alert', className)}>
      {icon ? <Callout.Icon>{icon}</Callout.Icon> : undefined}

      <Flex direction="column" gap="1" flexGrow="1" minWidth="0">
        {title ? (
          <Callout.Text size="2" weight="medium" highContrast>
            {title}
          </Callout.Text>
        ) : undefined}
        <Callout.Text size="2">{children}</Callout.Text>
        {actions ? (
          <Flex gap="3" align="center" wrap="wrap" mt="2">
            {actions}
          </Flex>
        ) : undefined}
      </Flex>

      {onDismiss ? (
        <Box flexShrink="0" ml="auto">
          <IconButton
            size="1"
            variant="ghost"
            color={color}
            aria-label={dismissLabel}
            onClick={onDismiss}
          >
            {dismissIcon}
          </IconButton>
        </Box>
      ) : undefined}
    </Callout.Root>
  );
}
