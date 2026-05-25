'use client';

// This implements the WAI-ARIA combobox pattern on composed Radix elements, which trips a few
// jsx-a11y heuristics that assume native tags: role="combobox" lives on Radix's native <input>,
// and options use aria-activedescendant (so they intentionally have no tabindex).
// oxlint-disable jsx-a11y/prefer-tag-over-role
// oxlint-disable jsx-a11y/interactive-supports-focus

import { type KeyboardEvent, type ReactNode, useId, useState } from 'react';

import { Box, Card, Flex, Text, TextField } from '../components';
import { cn } from '../lib/cn';

/** A selectable autocomplete option. `value` is the text matched against the query. */
export interface ComboboxOption {
  /** The option's value — also the searchable text and what the input is set to on select. */
  readonly value: string;
  /** Visible label (defaults to showing `value` if omitted by the caller). */
  readonly label: ReactNode;
  /** Extra search terms matched in addition to `value`. */
  readonly keywords?: readonly string[];
}

export interface ComboboxProps {
  /** The options to filter and choose from. */
  readonly options: readonly ComboboxOption[];
  /** Controlled input text. Provide with `onValueChange`. */
  readonly value?: string;
  /** Initial input text when uncontrolled. */
  readonly defaultValue?: string;
  /** Called whenever the input text changes (typing or selection). */
  readonly onValueChange?: (value: string) => void;
  /** Called when an option is chosen. */
  readonly onSelect?: (option: ComboboxOption) => void;
  /** Input placeholder. */
  readonly placeholder?: string;
  /** Shown when the query matches no options. */
  readonly emptyMessage?: ReactNode;
  /** id applied to the input (for an external `<label htmlFor>`). */
  readonly id?: string;
  readonly className?: string;
}

/**
 * Combobox — a free-text autocomplete input with a filtered, keyboard-navigable option list.
 * Use for typeahead fields the Radix `Select` can't cover (free text + filtering). Arrow keys move,
 * Enter selects, Esc closes; focus stays in the input. Controlled via `value`/`onValueChange` or
 * uncontrolled via `defaultValue`. Keywords: combobox, autocomplete, typeahead, search input, suggest.
 */
export function Combobox({
  options,
  value,
  defaultValue = '',
  onValueChange,
  onSelect,
  placeholder,
  emptyMessage = 'No results found.',
  id,
  className,
}: ComboboxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const generatedId = useId();
  const inputId = id ?? `${generatedId}-input`;
  const listId = `${generatedId}-list`;

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const query = currentValue.trim().toLowerCase();
  const filtered =
    query === ''
      ? options
      : options.filter((option) =>
          [option.value, ...(option.keywords ?? [])].join(' ').toLowerCase().includes(query),
        );

  const safeIndex = filtered.length === 0 ? -1 : Math.min(activeIndex, filtered.length - 1);
  const listVisible = open && (filtered.length > 0 || query !== '');

  const setValue = (next: string) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  const select = (option: ComboboxOption | undefined) => {
    if (option === undefined) {
      return;
    }
    setValue(option.value);
    onSelect?.(option);
    setOpen(false);
    setActiveIndex(0);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (event.key === 'Enter') {
      if (listVisible && safeIndex >= 0) {
        event.preventDefault();
        select(filtered[safeIndex]);
      }
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <Box className={cn('mb-combobox', className)}>
      <TextField.Root
        id={inputId}
        value={currentValue}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={listVisible}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          listVisible && safeIndex >= 0 ? `${listId}-opt-${safeIndex}` : undefined
        }
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={(event) => {
          setValue(event.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onKeyDown={onKeyDown}
      />

      {listVisible ? (
        <Card size="1" className="mb-combobox-list" role="listbox" id={listId}>
          {filtered.length === 0 ? (
            <Box px="3" py="2">
              <Text size="2" color="gray">
                {emptyMessage}
              </Text>
            </Box>
          ) : (
            filtered.map((option, index) => (
              <Flex
                key={option.value}
                id={`${listId}-opt-${index}`}
                role="option"
                aria-selected={index === safeIndex}
                data-active={index === safeIndex}
                className="mb-command-option"
                align="center"
                px="3"
                py="2"
                onMouseMove={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => select(option)}
              >
                <Text as="div" size="2">
                  {option.label}
                </Text>
              </Flex>
            ))
          )}
        </Card>
      ) : undefined}
    </Box>
  );
}
