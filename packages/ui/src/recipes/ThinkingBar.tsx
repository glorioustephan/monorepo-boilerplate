'use client';

import { ChevronRightIcon } from '@radix-ui/react-icons';

import { Flex, Text } from '../components';
import { cn } from '../lib/cn';
import { TextShimmer } from './TextShimmer';

/** Props for the ThinkingBar component. */
export interface ThinkingBarProps {
  /** Shimmer label shown on the left side. Defaults to `'Thinking'`. */
  readonly text?: string;
  /** When provided, wraps the label in a button with a trailing chevron icon. */
  readonly onClick?: () => void;
  /** When provided, shows the stop control on the right side. */
  readonly onStop?: () => void;
  /** Label for the stop button. Defaults to `'Answer now'`. */
  readonly stopLabel?: string;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/**
 * ThinkingBar — a status bar shown while an AI model is reasoning.
 * Left side: a shimmering text label, optionally wrapped in a clickable button with a chevron.
 * Right side: an optional stop button to cancel generation early.
 * Composes the TextShimmer recipe.
 * Keywords: thinking, reasoning, AI, chat, loading, shimmer, stop, cancel, status bar.
 */
export function ThinkingBar({
  text = 'Thinking',
  onClick,
  onStop,
  stopLabel = 'Answer now',
  className,
}: ThinkingBarProps) {
  return (
    <Flex align="center" justify="between" className={cn('w-full', className)}>
      {/* Left: shimmering label — clickable when onClick is provided. */}
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="flex items-center gap-1 transition-opacity hover:opacity-80"
        >
          <TextShimmer className="font-medium">{text}</TextShimmer>
          <ChevronRightIcon aria-hidden="true" />
        </button>
      ) : (
        <TextShimmer className="font-medium">{text}</TextShimmer>
      )}

      {/* Right: stop control — only rendered when onStop is provided. */}
      {onStop ? (
        <button type="button" onClick={onStop} className="mb-thinking-stop">
          <Text size="2" color="gray">
            {stopLabel}
          </Text>
        </button>
      ) : undefined}
    </Flex>
  );
}
