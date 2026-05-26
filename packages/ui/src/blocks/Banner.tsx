'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { Callout, IconButton, Text } from '../components';
import { cn } from '../lib/cn';

/** Infer the Radix accent color type from the Callout atom this banner is built on. */
type BannerColor = ComponentProps<typeof Callout.Root>['color'];

/** Stable default dismiss glyph — hoisted to avoid re-creating on each render. */
const DEFAULT_DISMISS_ICON = <Text aria-hidden="true">✕</Text>;

export interface BannerProps {
  /** Announcement message content. */
  readonly children: ReactNode;
  /** Optional CTA slot — e.g. a `<Link>` or `<Button variant="ghost">`. */
  readonly action?: ReactNode;
  /** Called when the dismiss button is clicked. Omitting it hides the dismiss button. */
  readonly onDismiss?: () => void;
  /** Radix accent color that tints the bar (uses Callout surface variant). */
  readonly color?: BannerColor;
  /** Accessible label for the dismiss button. Defaults to "Dismiss". */
  readonly dismissLabel?: string;
  /** Dismiss glyph rendered inside the icon button. Defaults to a "✕" text mark. */
  readonly dismissIcon?: ReactNode;
  /** Additional className merged onto the root element. */
  readonly className?: string;
}

/**
 * Banner — a dismissible full-width announcement bar.
 * Use for product announcements, maintenance notices, promotional messages, or any
 * persistent notification that spans the viewport width and can be closed by the user.
 * Keywords: announcement, notification, bar, dismissible, promotion, alert, top-bar.
 */
export function Banner({
  children,
  action,
  onDismiss,
  color,
  dismissLabel = 'Dismiss',
  dismissIcon = DEFAULT_DISMISS_ICON,
  className,
}: BannerProps) {
  return (
    // `.mb-banner` overrides Callout's grid with a centered flex row so the message (a <p> via
    // Callout.Text, inline content only) sits beside the action + dismiss as valid siblings —
    // never a <div>/<button> nested inside the <p>.
    <Callout.Root color={color} variant="surface" className={cn('mb-banner', className)}>
      <Callout.Text size="2">{children}</Callout.Text>
      {action != null ? action : undefined}
      {onDismiss != null ? (
        <IconButton
          variant="ghost"
          color="gray"
          size="1"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          {dismissIcon}
        </IconButton>
      ) : undefined}
    </Callout.Root>
  );
}
