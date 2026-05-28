'use client';

import { type ReactNode } from 'react';

import { Avatar, Box, Flex, Text, Tooltip } from '../components';
import { cn } from '../lib/cn';
import { Markdown } from './Markdown';

// ---------------------------------------------------------------------------
// Prop interfaces
// ---------------------------------------------------------------------------

/** Props for the Message root — a single chat turn. */
export interface MessageProps {
  /** Content of the turn (typically .Avatar + .Content + .Actions). */
  readonly children: ReactNode;
  /** Extra class names merged onto the root flex element. */
  readonly className?: string;
}

/** Props for Message.Avatar — the participant's avatar. */
export interface MessageAvatarProps {
  /** Image URL for the avatar. */
  readonly src: string;
  /** Accessible alt text for the avatar image. Required. */
  readonly alt: string;
  /** Fallback initials or text shown while the image loads. */
  readonly fallback?: string;
  /** Radix Avatar size scale. Default '2'. */
  readonly size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  /** Border radius of the avatar. Default 'full'. */
  readonly radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  /** Extra class names merged onto the avatar element. */
  readonly className?: string;
}

/** Props for Message.Content — the body of a turn. */
export interface MessageContentProps {
  /** Message body. Pass a string when `markdown` is true. */
  readonly children: ReactNode;
  /** When true, renders children as markdown via the Markdown recipe. */
  readonly markdown?: boolean;
  /** Extra class names merged onto the content element. */
  readonly className?: string;
}

/** Props for Message.Actions — the action toolbar below a turn. */
export interface MessageActionsProps {
  /** Action controls, typically one or more Message.Action elements. */
  readonly children: ReactNode;
  /** Extra class names merged onto the flex row. */
  readonly className?: string;
}

/** Props for Message.Action — wraps an IconButton in a Tooltip. */
export interface MessageActionProps {
  /** Tooltip content shown on hover/focus. */
  readonly tooltip: ReactNode;
  /** The trigger control — must have an `aria-label`. */
  readonly children: ReactNode;
  /** Which side the tooltip appears on. Default 'top'. */
  readonly side?: 'top' | 'bottom' | 'left' | 'right';
  /** Extra class names (forwarded to the tooltip content). */
  readonly className?: string;
}

// ---------------------------------------------------------------------------
// MessageAvatar
// ---------------------------------------------------------------------------

/**
 * MessageAvatar — participant avatar rendered as the Radix Avatar atom.
 * `alt` is required for screen reader support.
 * Keywords: avatar, message, user, assistant, image, fallback.
 */
export function MessageAvatar({
  src,
  alt,
  fallback = '',
  size = '2',
  radius = 'full',
  className,
}: MessageAvatarProps) {
  return (
    <Avatar
      src={src}
      alt={alt}
      fallback={fallback}
      size={size}
      radius={radius}
      className={cn('shrink-0', className)}
    />
  );
}

// ---------------------------------------------------------------------------
// MessageContent
// ---------------------------------------------------------------------------

/**
 * MessageContent — the body of a single chat turn.
 * When `markdown` is true, delegates to the Markdown recipe for rich rendering
 * (headings, code blocks, tables, etc.). Otherwise renders a plain bubble.
 * Keywords: message, content, bubble, markdown, chat.
 */
export function MessageContent({ children, markdown = false, className }: MessageContentProps) {
  if (markdown) {
    return (
      <Markdown className={cn('mb-message-content', className)}>{children as string}</Markdown>
    );
  }

  return <Box className={cn('mb-message-content', className)}>{children}</Box>;
}

// ---------------------------------------------------------------------------
// MessageActions
// ---------------------------------------------------------------------------

/**
 * MessageActions — flex row of action controls below a chat turn.
 * Keywords: message, actions, toolbar, copy, feedback.
 */
export function MessageActions({ children, className }: MessageActionsProps) {
  return (
    <Flex align="center" gap="2" className={cn(className)}>
      <Text color="gray" asChild>
        <span style={{ display: 'contents' }}>{children}</span>
      </Text>
    </Flex>
  );
}

// ---------------------------------------------------------------------------
// MessageAction
// ---------------------------------------------------------------------------

/**
 * MessageAction — wraps an IconButton in an accessible Tooltip.
 * The child IconButton must carry its own `aria-label`.
 * Keywords: message, action, tooltip, icon button, copy, react.
 */
export function MessageAction({ tooltip, children, side = 'top', className }: MessageActionProps) {
  return (
    <Tooltip content={tooltip} side={side}>
      <span style={{ display: 'contents' }} className={cn(className)}>
        {children}
      </span>
    </Tooltip>
  );
}

// ---------------------------------------------------------------------------
// Message root
// ---------------------------------------------------------------------------

/**
 * Message — a single chat turn composing avatar, content, and actions.
 * Role-agnostic — user vs. assistant differentiation (alignment, colour) is the
 * template's responsibility. Compose with `Message.Avatar`, `Message.Content`,
 * `Message.Actions`, and `Message.Action`.
 * Keywords: message, chat, turn, avatar, content, actions, assistant, user.
 */
export function Message({ children, className }: MessageProps) {
  return (
    <Flex gap="3" className={cn(className)}>
      {children}
    </Flex>
  );
}

// Compound namespace
Message.Avatar = MessageAvatar;
Message.Content = MessageContent;
Message.Actions = MessageActions;
Message.Action = MessageAction;
