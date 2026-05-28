'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { StickToBottom } from 'use-stick-to-bottom';

import { cn } from '../lib/cn';

/** Props for the `ChatContainer.Root` scroll container. */
export interface ChatContainerRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'role' | 'aria-live'
> {
  /** Content rendered inside the scrollable log region. */
  readonly children: ReactNode;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/** Props for the `ChatContainer.Content` inner flex column. */
export interface ChatContainerContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Message turns and other content stacked vertically. */
  readonly children: ReactNode;
  /** Extra class names merged onto the content element. */
  readonly className?: string;
}

/** Props for the `ChatContainer.ScrollAnchor` 1 px spacer. */
export interface ChatContainerScrollAnchorProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-hidden'
> {
  /** Extra class names merged onto the spacer element. */
  readonly className?: string;
}

/**
 * ChatContainerRoot — the outermost scrollable log region powered by StickToBottom.
 * Provides the stick-to-bottom context consumed by `ScrollButton`.
 * Must be an ancestor of any `ScrollButton` in the tree.
 */
function ChatContainerRoot({ children, className, ...rest }: ChatContainerRootProps) {
  return (
    <StickToBottom
      className={cn('mb-chat-container', className)}
      resize="smooth"
      initial="instant"
      role="log"
      aria-live="polite"
      {...rest}
    >
      {children}
    </StickToBottom>
  );
}

/**
 * ChatContainerContent — flex column that stacks message turns inside the scroll region.
 * Render as a direct child of `ChatContainer.Root`.
 */
function ChatContainerContent({ children, className, ...rest }: ChatContainerContentProps) {
  return (
    <StickToBottom.Content className={cn('flex w-full flex-col', className)} {...rest}>
      {children}
    </StickToBottom.Content>
  );
}

/**
 * ChatContainerScrollAnchor — a 1 px invisible spacer placed at the end of the message list.
 * Ensures the scroll target has a reachable bottom edge for `scrollIntoView` / stick logic.
 */
function ChatContainerScrollAnchor({ className, ...rest }: ChatContainerScrollAnchorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('h-px w-full shrink-0 scroll-mt-4', className)}
      {...rest}
    />
  );
}

/**
 * ChatContainer — auto-scrolling chat log built on `StickToBottom`.
 * Compose `ChatContainer.Root` / `ChatContainer.Content` / `ChatContainer.ScrollAnchor`
 * around a list of message turns. `ChatContainer.Root` provides the context that
 * `ScrollButton` consumes — **ScrollButton must be rendered inside `ChatContainer.Root`**.
 * Use for AI-chat interfaces, activity feeds, and any auto-scrolling log region.
 * Keywords: chat, scroll, stick-to-bottom, log, messages, auto-scroll.
 */
export const ChatContainer = {
  Root: ChatContainerRoot,
  Content: ChatContainerContent,
  ScrollAnchor: ChatContainerScrollAnchor,
} as const;

export { ChatContainerRoot, ChatContainerContent, ChatContainerScrollAnchor };
