'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import type { ComponentProps } from 'react';
import { useStickToBottomContext } from 'use-stick-to-bottom';

import { IconButton, VisuallyHidden } from '../components';
import { cn } from '../lib/cn';

/**
 * ScrollButton — a floating round button that scrolls the chat log back to the bottom.
 * Fades out when already at the bottom; fades in when the user scrolls up.
 * **Must be rendered inside a `ChatContainer.Root`** (the StickToBottom provider).
 * Rendering outside that context will throw a missing-context error.
 * Use for AI-chat interfaces and any auto-scrolling log that needs a scroll-to-bottom affordance.
 * Keywords: scroll, chat, bottom, stick-to-bottom, floating button, scroll affordance.
 */
export interface ScrollButtonProps {
  /** IconButton variant. Defaults to `'surface'`. */
  readonly variant?: ComponentProps<typeof IconButton>['variant'];
  /** IconButton size. Defaults to `'2'`. */
  readonly size?: ComponentProps<typeof IconButton>['size'];
  /** Extra class names merged onto the button element. */
  readonly className?: string;
}

export function ScrollButton({ variant = 'surface', size = '2', className }: ScrollButtonProps) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  return (
    <IconButton
      radius="full"
      variant={variant}
      size={size}
      aria-label="Scroll to bottom"
      onClick={() => scrollToBottom()}
      data-at-bottom={String(isAtBottom)}
      className={cn('mb-scroll-button', className)}
    >
      <ChevronDownIcon />
      <VisuallyHidden>Scroll to bottom</VisuallyHidden>
    </IconButton>
  );
}
