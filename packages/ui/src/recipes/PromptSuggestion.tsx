'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { Button, Text } from '../components';
import { cn } from '../lib/cn';

/** Props for the PromptSuggestion component. */
export interface PromptSuggestionProps {
  /** Suggestion text or custom content. String required for highlight mode. */
  readonly children: ReactNode;
  /** Substring to emphasise in highlight mode (case-insensitive). Omit for pill mode. */
  readonly highlight?: string;
  /** Button variant — defaults to `'surface'` in pill mode, `'ghost'` in highlight mode. */
  readonly variant?: ComponentProps<typeof Button>['variant'];
  /** Button size — defaults to `'2'`. */
  readonly size?: ComponentProps<typeof Button>['size'];
  /** Extra class names merged onto the button. */
  readonly className?: string;
  /** Called when the suggestion button is clicked. */
  readonly onClick?: () => void;
}

/**
 * PromptSuggestion — a clickable suggestion chip for chat prompt input areas.
 * Pill mode shows a rounded surface button; highlight mode shows a ghost button with
 * the matched substring emphasised in the default accent color.
 * Use for zero-state or typeahead suggestion lists.
 * Keywords: suggestion, prompt, chip, pill, highlight, search, match, chat, AI.
 */
export function PromptSuggestion({
  children,
  highlight,
  variant,
  size = '2',
  className,
  onClick,
}: PromptSuggestionProps) {
  const isHighlightMode = highlight !== undefined && highlight.trim() !== '';
  const content = typeof children === 'string' ? children : '';

  // --- Pill mode (default) ---
  if (!isHighlightMode) {
    return (
      <Button
        variant={variant ?? 'surface'}
        size={size}
        radius="full"
        className={cn(className)}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }

  // --- Highlight mode — children must be a string for splitting ---
  if (!content) {
    return (
      <Button
        variant={variant ?? 'ghost'}
        size={size}
        className={cn('w-full justify-start', className)}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }

  const trimmedHighlight = highlight.trim();
  const contentLower = content.toLowerCase();
  const highlightLower = trimmedHighlight.toLowerCase();
  const matchIndex = contentLower.indexOf(highlightLower);

  return (
    <Button
      variant={variant ?? 'ghost'}
      size={size}
      className={cn('w-full justify-start gap-0', className)}
      onClick={onClick}
    >
      {matchIndex !== -1 ? (
        <>
          {matchIndex > 0 ? (
            <Text color="gray" className="whitespace-pre-wrap">
              {content.substring(0, matchIndex)}
            </Text>
          ) : undefined}
          <Text weight="medium" className="whitespace-pre-wrap">
            {content.substring(matchIndex, matchIndex + trimmedHighlight.length)}
          </Text>
          {matchIndex + trimmedHighlight.length < content.length ? (
            <Text color="gray" className="whitespace-pre-wrap">
              {content.substring(matchIndex + trimmedHighlight.length)}
            </Text>
          ) : undefined}
        </>
      ) : (
        <Text color="gray" className="whitespace-pre-wrap">
          {content}
        </Text>
      )}
    </Button>
  );
}
