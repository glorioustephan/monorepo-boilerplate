'use client';

import { type ReactNode } from 'react';

import { CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons';

import { Button } from '../components';
import { Alert } from './Alert';

/** Variant of `SystemMessage` — maps to an `Alert` color. */
export type SystemMessageVariant = 'action' | 'error' | 'warning';

/** Props for `SystemMessage`. */
export interface SystemMessageProps {
  /** Message body content. */
  readonly children: ReactNode;
  /** Intent variant. `'action'` (default) → gray; `'error'` → red; `'warning'` → amber. */
  readonly variant?: SystemMessageVariant;
  /** Custom leading icon. When omitted a default icon is derived from `variant`. */
  readonly icon?: ReactNode;
  /** Suppress the leading icon entirely. Default `false`. */
  readonly isIconHidden?: boolean;
  /** Optional call-to-action rendered as a soft button inside the banner. */
  readonly cta?: {
    readonly label: string;
    readonly onClick?: () => void;
  };
  readonly className?: string;
}

const VARIANT_COLOR = {
  action: 'gray',
  error: 'red',
  warning: 'amber',
} as const;

const VARIANT_DEFAULT_ICON: Record<SystemMessageVariant, ReactNode> = {
  action: <InfoCircledIcon />,
  error: <CrossCircledIcon />,
  warning: <ExclamationTriangleIcon />,
};

/**
 * SystemMessage — AI system notification banner. Wraps the `Alert` recipe and maps a semantic
 * `variant` (`'action'` | `'error'` | `'warning'`) to the appropriate Radix color. Supports an
 * optional call-to-action button and icon customisation. Use inside a chat UI to surface tool
 * errors, warnings, and action prompts from the assistant. Keywords: system message, alert, banner,
 * chat, error, warning, action, AI notification.
 */
export function SystemMessage({
  children,
  variant = 'action',
  icon,
  isIconHidden = false,
  cta,
  className,
}: SystemMessageProps) {
  const color = VARIANT_COLOR[variant];
  const resolvedIcon = isIconHidden ? undefined : (icon ?? VARIANT_DEFAULT_ICON[variant]);

  return (
    <Alert
      color={color}
      icon={resolvedIcon}
      actions={
        cta ? (
          <Button size="1" color={color} variant="soft" onClick={cta.onClick}>
            {cta.label}
          </Button>
        ) : undefined
      }
      className={className}
    >
      {children}
    </Alert>
  );
}
