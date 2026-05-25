'use client';

import { type ComponentProps, type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Box, Card, Flex, IconButton, Text } from '../components';
import { cn } from '../lib/cn';

/** Infer the Radix accent color type from the IconButton the color is applied to. */
type NotificationColor = ComponentProps<typeof IconButton>['color'];

/** Stable default dismiss glyph — avoids re-creating the element each render. */
const DEFAULT_DISMISS_ICON = <Text aria-hidden="true">✕</Text>;

/** NotificationProps — props for the Notification toast card. */
export interface NotificationProps {
  /** Optional title rendered in medium weight above the body. */
  readonly title?: ReactNode;
  /** Notification body content (description). */
  readonly children?: ReactNode;
  /** Leading icon slot — pass a ReactNode; no icon library imported here. */
  readonly icon?: ReactNode;
  /** Radix Themes color token drives intent (green=success, red=error, amber=warning, blue=info). */
  readonly color?: NotificationColor;
  /** Optional action slot rendered below the body (e.g. a Button). */
  readonly action?: ReactNode;
  /** Called when the dismiss button is clicked; omitting it hides the button. */
  readonly onDismiss?: () => void;
  /** Accessible label for the dismiss button. Defaults to "Dismiss". */
  readonly dismissLabel?: string;
  /** Dismiss glyph rendered inside the dismiss button. Defaults to a "✕" text mark. */
  readonly dismissIcon?: ReactNode;
  /** Extra class names merged onto the root Card element. */
  readonly className?: string;
}

/**
 * Notification — a toast card for transient feedback messages.
 * Use for success confirmations, error alerts, info nudges, and warning notices.
 * Compose inside NotificationRegion to portal the stack into a screen corner.
 * Keywords: toast, notification, alert, feedback, dismiss, success, error, warning, info.
 */
export function Notification({
  title,
  children,
  icon,
  color,
  action,
  onDismiss,
  dismissLabel = 'Dismiss',
  dismissIcon = DEFAULT_DISMISS_ICON,
  className,
}: NotificationProps) {
  return (
    <Card size="2" className={cn(className)}>
      <Flex gap="3" align="start">
        {icon ? <Box flexShrink="0">{icon}</Box> : undefined}
        <Flex direction="column" gap="1" flexGrow="1">
          {title ? (
            <Text as="p" weight="medium">
              {title}
            </Text>
          ) : undefined}
          {children}
          {action ? <Box mt="1">{action}</Box> : undefined}
        </Flex>
        {onDismiss ? (
          <IconButton
            variant="ghost"
            color={color ?? 'gray'}
            aria-label={dismissLabel}
            onClick={onDismiss}
          >
            {dismissIcon}
          </IconButton>
        ) : undefined}
      </Flex>
    </Card>
  );
}

/** NotificationRegionProps — props for the portal'd aria-live notification container. */
export interface NotificationRegionProps {
  /** The notification children to stack in the region. */
  readonly children: ReactNode;
  /** Corner of the viewport to anchor the region. Defaults to "bottom-right". */
  readonly position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Accessible label for the region landmark. Defaults to "Notifications". */
  readonly label?: string;
  /** Extra class names merged onto the region element. */
  readonly className?: string;
}

/**
 * NotificationRegion — a portal'd, fixed aria-live container that stacks toast notifications
 * in a screen corner. Pairs with Notification for transient feedback UI.
 * SSR-safe: renders null on the server and mounts the portal after hydration.
 * Keywords: toast region, notification stack, aria-live, portal, corner overlay.
 */
export function NotificationRegion({
  children,
  position = 'bottom-right',
  label = 'Notifications',
  className,
}: NotificationRegionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  // Portal into the nearest Radix Theme root so notifications inherit theme tokens + appearance
  // (createPortal to bare document.body would render them outside the theme, unstyled).
  const target = document.querySelector('.radix-themes') ?? document.body;

  return createPortal(
    <section
      className={cn('mb-notification-region', className)}
      data-position={position}
      aria-live="polite"
      aria-label={label}
    >
      {children}
    </section>,
    target,
  );
}
