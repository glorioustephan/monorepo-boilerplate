'use client';

// PromptInputAction wraps an interactive child (IconButton/Button, which carries its own role and
// keyboard handling) in a display:contents span solely to stop click propagation to the shell's
// focus handler — the span itself is intentionally non-interactive.
// oxlint-disable jsx-a11y/click-events-have-key-events
// oxlint-disable jsx-a11y/no-static-element-interactions

import {
  createContext,
  type KeyboardEvent,
  type ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { type TextAreaProps } from '@radix-ui/themes';

import { Box, Flex, TextArea, Tooltip } from '../components';
import { cn } from '../lib/cn';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface PromptInputContextValue {
  readonly isLoading: boolean;
  readonly value: string;
  readonly setValue: (value: string) => void;
  readonly maxHeight: number | string;
  readonly onSubmit: (() => void) | undefined;
  readonly disabled: boolean;
  readonly textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const PromptInputContext = createContext<PromptInputContextValue | null>(null);

/**
 * Internal hook — throws when used outside a PromptInput root.
 */
function usePromptInput(): PromptInputContextValue {
  const ctx = useContext(PromptInputContext);
  if (!ctx) {
    throw new Error('usePromptInput must be used inside a <PromptInput> root.');
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Prop interfaces
// ---------------------------------------------------------------------------

/** Props for the PromptInput root — the composer shell. */
export interface PromptInputProps {
  /** Content rendered inside the shell (typically .Textarea + .Actions). */
  readonly children: ReactNode;
  /** Controlled value. Pair with `onValueChange`. */
  readonly value?: string;
  /** Called whenever the textarea value changes. */
  readonly onValueChange?: (value: string) => void;
  /** When true, disables input and marks the shell as loading. */
  readonly isLoading?: boolean;
  /** Maximum height the textarea may grow to before scrolling (px number or CSS string). Default 240. */
  readonly maxHeight?: number | string;
  /** Called when the user presses Enter (without Shift). */
  readonly onSubmit?: () => void;
  /** When true, the shell and textarea are non-interactive. */
  readonly disabled?: boolean;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/** Props for PromptInput.Textarea — extends TextArea atom, omitting controlled value/onChange. */
export interface PromptInputTextareaProps extends Omit<TextAreaProps, 'value' | 'onChange'> {
  /** When true, disables the scroll-height autosize behaviour. */
  readonly disableAutosize?: boolean;
}

/** Props for PromptInput.Actions — the toolbar row. */
export interface PromptInputActionsProps {
  /** Action controls, typically one or more PromptInput.Action elements. */
  readonly children: ReactNode;
  /** Extra class names merged onto the flex row. */
  readonly className?: string;
}

/** Props for PromptInput.Action — wraps a control in a Tooltip. */
export interface PromptInputActionProps {
  /** Tooltip content shown on hover/focus. */
  readonly tooltip: ReactNode;
  /** The trigger control (IconButton or Button). */
  readonly children: ReactNode;
  /** Which side the tooltip appears on. Default 'top'. */
  readonly side?: 'top' | 'bottom' | 'left' | 'right';
  /** Extra class names (applied to the tooltip content). */
  readonly className?: string;
}

// ---------------------------------------------------------------------------
// PromptInputTextarea
// ---------------------------------------------------------------------------

/**
 * PromptInputTextarea — the auto-sizing textarea inside a PromptInput.
 * Reads value/onSubmit/disabled from the PromptInput context.
 * Enter submits; Shift+Enter inserts a newline.
 * Keywords: textarea, autosize, prompt, chat input.
 */
export function PromptInputTextarea({
  disableAutosize = false,
  className,
  onKeyDown,
  ...props
}: PromptInputTextareaProps) {
  const { value, setValue, maxHeight, onSubmit, disabled, textareaRef } = usePromptInput();

  /** Grow the textarea to fit content, capped at maxHeight. */
  function adjustHeight(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    if (typeof maxHeight === 'number') {
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    } else {
      el.style.height = `min(${el.scrollHeight}px, ${maxHeight})`;
    }
  }

  /** Sync the ref and run an immediate height pass. */
  function handleRef(el: HTMLTextAreaElement | null) {
    (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
    if (el && !disableAutosize) adjustHeight(el);
  }

  useLayoutEffect(() => {
    if (!textareaRef.current || disableAutosize) return;
    adjustHeight(textareaRef.current);
    // Re-run when value or cap changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, maxHeight, disableAutosize]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!disableAutosize) adjustHeight(e.target);
    setValue(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  }

  return (
    <TextArea
      ref={handleRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      rows={1}
      disabled={disabled}
      className={cn('mb-prompt-input-textarea', className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// PromptInputActions
// ---------------------------------------------------------------------------

/**
 * PromptInputActions — flex row housing action controls (attach, send, etc.).
 * Place inside a PromptInput root below the Textarea.
 * Keywords: prompt, actions, toolbar, chat.
 */
export function PromptInputActions({ children, className }: PromptInputActionsProps) {
  return (
    <Flex align="center" gap="2" className={cn(className)}>
      {children}
    </Flex>
  );
}

// ---------------------------------------------------------------------------
// PromptInputAction
// ---------------------------------------------------------------------------

/**
 * PromptInputAction — wraps a control (IconButton/Button) in an accessible Tooltip.
 * Stops click propagation so clicking an action does not re-focus the textarea via the shell handler.
 * Keywords: prompt, action, tooltip, icon button.
 */
export function PromptInputAction({
  tooltip,
  children,
  side = 'top',
  className,
}: PromptInputActionProps) {
  const { disabled } = usePromptInput();

  return (
    <Tooltip content={tooltip} side={side}>
      <span
        style={{ display: 'contents' }}
        onClick={(e) => e.stopPropagation()}
        aria-disabled={disabled || undefined}
        className={cn(className)}
      >
        {children}
      </span>
    </Tooltip>
  );
}

// ---------------------------------------------------------------------------
// PromptInput root
// ---------------------------------------------------------------------------

/**
 * PromptInput — AI-chat composer shell with autosize textarea and action toolbar.
 * Use for the message entry area in chatbot interfaces. Supports controlled and uncontrolled modes.
 * Clicking the shell focuses the textarea. Enter submits; Shift+Enter inserts a newline.
 * Compose with `PromptInput.Textarea`, `PromptInput.Actions`, and `PromptInput.Action`.
 * Keywords: prompt, chat input, composer, autosize, submit, loading.
 */
export function PromptInput({
  children,
  value,
  onValueChange,
  isLoading = false,
  maxHeight = 240,
  onSubmit,
  disabled = false,
  className,
}: PromptInputProps) {
  const [internalValue, setInternalValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  function handleClick() {
    if (!disabled) textareaRef.current?.focus();
  }

  return (
    <PromptInputContext.Provider
      value={{
        isLoading,
        value: currentValue,
        setValue,
        maxHeight,
        onSubmit,
        disabled,
        textareaRef,
      }}
    >
      <Box
        onClick={handleClick}
        data-disabled={disabled || undefined}
        className={cn('mb-prompt-input', className)}
      >
        {children}
      </Box>
    </PromptInputContext.Provider>
  );
}

// Compound namespace
PromptInput.Textarea = PromptInputTextarea;
PromptInput.Actions = PromptInputActions;
PromptInput.Action = PromptInputAction;
