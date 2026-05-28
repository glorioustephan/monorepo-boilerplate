'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { Flex, Text } from '../components';
import { cn } from '../lib/cn';
import { Collapsible } from './Collapsible';
import { Markdown } from './Markdown';

// ---------- Context ----------

interface ReasoningContextValue {
  readonly isOpen: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

const ReasoningContext = createContext<ReasoningContextValue | undefined>(undefined);

function useReasoningContext(): ReasoningContextValue {
  const ctx = useContext(ReasoningContext);
  if (!ctx) throw new Error('useReasoningContext must be used within a Reasoning provider');
  return ctx;
}

// ---------- Prop interfaces ----------

export interface ReasoningProps {
  /** The compound children — `Reasoning.Trigger` + `Reasoning.Content`. */
  readonly children: ReactNode;
  /** Controlled open state. Provide together with `onOpenChange`. */
  readonly open?: boolean;
  /** Notified whenever the open state changes. */
  readonly onOpenChange?: (open: boolean) => void;
  /** When true, auto-opens while streaming and auto-closes when streaming ends. */
  readonly isStreaming?: boolean;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

export interface ReasoningTriggerProps {
  /** Trigger label content (text, icon, or any ReactNode). */
  readonly children: ReactNode;
  /** Extra class names merged onto the trigger wrapper. */
  readonly className?: string;
}

export interface ReasoningContentProps {
  /** Content to display when expanded. Pass a string and enable `markdown` for rich rendering. */
  readonly children: ReactNode;
  /** When true, delegates rendering to the Markdown recipe. */
  readonly markdown?: boolean;
  /** Extra class names merged onto the content wrapper. */
  readonly className?: string;
}

// ---------- Parts ----------

/**
 * ReasoningTrigger — the clickable label row of a Reasoning disclosure.
 * Renders inside Reasoning; the Collapsible owns the button element.
 */
export function ReasoningTrigger({ children, className }: ReasoningTriggerProps) {
  const { isOpen } = useReasoningContext();

  return (
    <Flex align="center" gap="2" className={cn(className)}>
      {children}
      <ChevronDownIcon
        aria-hidden="true"
        style={{
          transition: 'transform 200ms',
          transform: isOpen ? 'rotate(180deg)' : undefined,
        }}
      />
    </Flex>
  );
}

/**
 * ReasoningContent — the collapsible body of a Reasoning disclosure.
 * Muted gray text; pass `markdown` to delegate to the Markdown recipe.
 */
export function ReasoningContent({ children, markdown, className }: ReasoningContentProps) {
  return (
    <div className={cn('pt-2', className)}>
      {markdown && typeof children === 'string' ? (
        <Markdown>{children}</Markdown>
      ) : (
        <Text as="p" color="gray" size="2">
          {children}
        </Text>
      )}
    </div>
  );
}

// ---------- Root ----------

/**
 * Reasoning — collapsible reasoning/thinking disclosure built over the Collapsible recipe.
 * Use for AI chain-of-thought output rendered beside assistant messages. Supports controlled
 * and uncontrolled open state; `isStreaming` auto-opens while the model streams and
 * auto-closes when it stops.
 *
 * ```tsx
 * <Reasoning isStreaming={isStreaming}>
 *   <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
 *   <Reasoning.Content>{reasoningText}</Reasoning.Content>
 * </Reasoning>
 * ```
 *
 * Keywords: reasoning, thinking, chain-of-thought, collapsible, AI, disclosure.
 */
export function Reasoning({
  children,
  open,
  onOpenChange,
  isStreaming,
  className,
}: ReasoningProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const wasAutoOpenedRef = useRef(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  // isStreaming latch: auto-open on stream start, auto-close on stream end.
  useEffect(() => {
    if (isStreaming && !wasAutoOpenedRef.current) {
      if (!isControlled) setInternalOpen(true);
      wasAutoOpenedRef.current = true;
    }
    if (!isStreaming && wasAutoOpenedRef.current) {
      if (!isControlled) setInternalOpen(false);
      wasAutoOpenedRef.current = false;
    }
  }, [isStreaming, isControlled]);

  // Split compound children into trigger node and content node.
  const childArray = Children.toArray(children);
  const triggerNode = childArray.find((c) => isValidElement(c) && c.type === ReasoningTrigger);
  const contentNode = childArray.find((c) => isValidElement(c) && c.type === ReasoningContent);

  return (
    <ReasoningContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
        trigger={triggerNode ?? null}
        className={cn(className)}
      >
        {contentNode}
      </Collapsible>
    </ReasoningContext.Provider>
  );
}

Reasoning.Trigger = ReasoningTrigger;
Reasoning.Content = ReasoningContent;
