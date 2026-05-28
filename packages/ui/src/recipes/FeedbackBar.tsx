'use client';

import { type ReactNode } from 'react';

import { ChevronDownIcon, ChevronUpIcon, Cross2Icon } from '@radix-ui/react-icons';

import { Card, Flex, IconButton, Separator, Text } from '../components';
import { cn } from '../lib/cn';

/** Props for `FeedbackBar`. */
export interface FeedbackBarProps {
  /**
   * Short heading rendered beside the leading icon.
   * E.g. `"Was this response helpful?"`.
   */
  readonly title?: string;
  /** Optional leading icon slot — pass any `ReactNode`. */
  readonly icon?: ReactNode;
  /** Called when the "Helpful" (thumbs-up) button is clicked. */
  readonly onHelpful?: () => void;
  /** Called when the "Not helpful" (thumbs-down) button is clicked. */
  readonly onNotHelpful?: () => void;
  /** Called when the close button is clicked. */
  readonly onClose?: () => void;
  readonly className?: string;
}

/**
 * FeedbackBar — a compact feedback row for AI responses. Renders a title with an optional leading
 * icon, "Helpful" / "Not helpful" thumbs buttons (using `ChevronUpIcon` / `ChevronDownIcon` as
 * thumbs surrogates — `@radix-ui/react-icons` has no ThumbsUp/Down equivalent), a vertical
 * separator, and a close button. Use at the bottom of an assistant message turn. Keywords:
 * feedback, thumbs, helpful, rating, chat, AI response quality.
 */
export function FeedbackBar({
  title,
  icon,
  onHelpful,
  onNotHelpful,
  onClose,
  className,
}: FeedbackBarProps) {
  return (
    <Card variant="surface" className={cn('inline-flex', className)}>
      <Flex align="center" gap="3">
        {icon}
        {title ? (
          <Text size="2" weight="medium">
            {title}
          </Text>
        ) : undefined}

        <Flex align="center" gap="1">
          <IconButton variant="ghost" size="1" aria-label="Helpful" onClick={onHelpful}>
            <ChevronUpIcon />
          </IconButton>
          <IconButton variant="ghost" size="1" aria-label="Not helpful" onClick={onNotHelpful}>
            <ChevronDownIcon />
          </IconButton>
        </Flex>

        <Separator orientation="vertical" size="1" />

        <IconButton variant="ghost" size="1" color="gray" aria-label="Close" onClick={onClose}>
          <Cross2Icon />
        </IconButton>
      </Flex>
    </Card>
  );
}
