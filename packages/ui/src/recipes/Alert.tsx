'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { Callout, Flex, IconButton, Text } from '../components';
import { cn } from '../lib/cn';

/** Infer the Callout.Root color type from the compound atom. */
type CalloutColor = ComponentProps<typeof Callout.Root>['color'];
type CalloutVariant = ComponentProps<typeof Callout.Root>['variant'];

/** Alert props — status/intent banner with optional dismiss and action slots. */
export interface AlertProps {
  /** Optional heading rendered in medium weight above the body. */
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
    <Callout.Root color={color} variant={variant} className={cn(className)}>
      {icon ? <Callout.Icon>{icon}</Callout.Icon> : undefined}
      <Callout.Text>
        <Flex direction="column" gap="1">
          {title ? (
            <Text as="span" weight="medium">
              {title}
            </Text>
          ) : undefined}
          {children}
        </Flex>
      </Callout.Text>
      {actions ? (
        <Flex gap="3" mt="2">
          {actions}
        </Flex>
      ) : undefined}
      {onDismiss ? (
        <IconButton variant="ghost" color="gray" aria-label={dismissLabel} onClick={onDismiss}>
          {dismissIcon}
        </IconButton>
      ) : undefined}
    </Callout.Root>
  );
}
