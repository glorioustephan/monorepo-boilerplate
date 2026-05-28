'use client';

import { type CSSProperties, type ElementType, type ReactNode } from 'react';

import { cn } from '../lib/cn';

/** Props for the TextShimmer component. */
export interface TextShimmerProps {
  /** Content to animate with the shimmer sweep. */
  readonly children: ReactNode;
  /** HTML element or component to render. Defaults to `'span'`. */
  readonly as?: ElementType;
  /** Animation duration in seconds. Defaults to `4`. */
  readonly duration?: number;
  /** Gradient spread (5–45). Controls the width of the bright band. Defaults to `20`. */
  readonly spread?: number;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/**
 * TextShimmer — animated gradient sweep over text.
 * Use for in-progress AI responses, thinking states, or decorative headings.
 * Keywords: shimmer, gradient, animate, text, thinking, loading, AI, chat.
 */
export function TextShimmer({
  children,
  as: Tag = 'span',
  duration = 4,
  spread = 20,
  className,
}: TextShimmerProps) {
  // Clamp spread to the range [5, 45] as in the upstream component.
  const clampedSpread = Math.min(Math.max(spread, 5), 45);

  return (
    <Tag
      className={cn('mb-shimmer', className)}
      style={
        {
          '--mb-shimmer-duration': `${duration}s`,
          '--mb-shimmer-spread': `${clampedSpread}`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
