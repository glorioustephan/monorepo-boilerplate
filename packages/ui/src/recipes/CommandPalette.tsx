'use client';

// This implements the WAI-ARIA combobox pattern on composed Radix elements, which trips a few
// jsx-a11y heuristics that assume native tags: role="combobox" lives on Radix's native <input>;
// options use aria-activedescendant (so they intentionally have no tabindex); and the palette
// focuses its search field on open by design.
// oxlint-disable jsx-a11y/prefer-tag-over-role
// oxlint-disable jsx-a11y/interactive-supports-focus
// oxlint-disable jsx-a11y/no-autofocus

import { type KeyboardEvent, type ReactNode, useId, useState } from 'react';

import {
  Box,
  Dialog,
  Flex,
  Kbd,
  ScrollArea,
  Separator,
  Text,
  TextField,
  VisuallyHidden,
} from '../components';

/** A single selectable command/search entry. */
export interface CommandItem {
  /** Stable id. */
  readonly id: string;
  /** Visible, searchable label. */
  readonly label: string;
  /** Optional leading icon. */
  readonly icon?: ReactNode;
  /** Optional group heading this item is listed under. */
  readonly group?: string;
  /** Extra search terms (matched in addition to `label`). */
  readonly keywords?: readonly string[];
  /** Optional trailing shortcut hint (rendered in a `Kbd`). */
  readonly shortcut?: ReactNode;
}

export interface CommandPaletteProps {
  /** Whether the palette is open. */
  readonly open: boolean;
  /** Called when the open state should change (Esc, overlay click, selection). */
  readonly onOpenChange: (open: boolean) => void;
  /** The commands to search and choose from. */
  readonly items: readonly CommandItem[];
  /** Called with the chosen item on Enter or click. */
  readonly onSelect: (item: CommandItem) => void;
  /** Input placeholder. */
  readonly placeholder?: string;
  /** Shown when the query matches no items. */
  readonly emptyMessage?: ReactNode;
  /** Accessible dialog title (visually hidden). Defaults to "Command palette". */
  readonly title?: string;
}

/**
 * CommandPalette — a ⌘K-style searchable command overlay with full keyboard navigation.
 * Use for global app commands, quick navigation, and search. Controlled via `open`/`onOpenChange`;
 * pass `items` (optionally grouped) and handle `onSelect`. Arrow keys move, Enter selects, Esc closes.
 * Keywords: command palette, cmdk, quick search, command menu, spotlight, keyboard navigation.
 */
export function CommandPalette({
  open,
  onOpenChange,
  items,
  onSelect,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No results found.',
  title = 'Command palette',
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const listboxId = useId();

  const q = query.trim().toLowerCase();
  const filtered =
    q === ''
      ? items
      : items.filter((item) =>
          [item.label, ...(item.keywords ?? [])].join(' ').toLowerCase().includes(q),
        );

  const safeIndex = filtered.length === 0 ? -1 : Math.min(activeIndex, filtered.length - 1);
  const activeId = safeIndex >= 0 ? `${listboxId}-opt-${safeIndex}` : undefined;

  const choose = (item: CommandItem | undefined) => {
    if (item === undefined) {
      return;
    }
    onSelect(item);
    onOpenChange(false);
    setQuery('');
    setActiveIndex(0);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setQuery('');
      setActiveIndex(0);
    }
    onOpenChange(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(filtered.length - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      choose(filtered[safeIndex]);
    }
  };

  // Group filtered items in encounter order, tracking each item's flat index for keyboard/aria.
  const groups: Array<{
    readonly label: string | undefined;
    readonly entries: Array<{ item: CommandItem; flatIndex: number }>;
  }> = [];
  filtered.forEach((item, flatIndex) => {
    const last = groups.at(-1);
    if (last && last.label === item.group) {
      last.entries.push({ item, flatIndex });
    } else {
      groups.push({ label: item.group, entries: [{ item, flatIndex }] });
    }
  });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Content className="mb-command-content" aria-describedby={undefined}>
        <VisuallyHidden>
          <Dialog.Title>{title}</Dialog.Title>
        </VisuallyHidden>

        <Box p="3">
          <TextField.Root
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            size="3"
            role="combobox"
            aria-expanded={true}
            aria-controls={listboxId}
            aria-activedescendant={activeId}
            aria-label={title}
            // biome-ignore lint/a11y/noAutofocus: command palettes focus their input on open by design
            autoFocus
          />
        </Box>

        <Separator size="4" />

        <ScrollArea type="auto" scrollbars="vertical" style={{ maxHeight: '320px' }}>
          <Box role="listbox" id={listboxId} aria-label={title} p="1">
            {filtered.length === 0 ? (
              <Box px="3" py="5">
                <Text align="center" as="div" color="gray" size="2">
                  {emptyMessage}
                </Text>
              </Box>
            ) : (
              groups.map((group) => (
                <Box key={group.label ?? '__ungrouped'}>
                  {group.label !== undefined ? (
                    <Box px="3" pt="2" pb="1">
                      <Text size="1" color="gray" weight="medium">
                        {group.label}
                      </Text>
                    </Box>
                  ) : undefined}
                  {group.entries.map(({ item, flatIndex }) => (
                    <Flex
                      key={item.id}
                      id={`${listboxId}-opt-${flatIndex}`}
                      role="option"
                      aria-selected={flatIndex === safeIndex}
                      data-active={flatIndex === safeIndex}
                      className="mb-command-option"
                      align="center"
                      gap="3"
                      px="3"
                      py="2"
                      onMouseMove={() => setActiveIndex(flatIndex)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => choose(item)}
                    >
                      {item.icon !== undefined ? <Box flexShrink="0">{item.icon}</Box> : undefined}
                      <Box flexGrow="1">
                        <Text as="div" size="2">
                          {item.label}
                        </Text>
                      </Box>
                      {item.shortcut !== undefined ? (
                        <Kbd size="1">{item.shortcut}</Kbd>
                      ) : undefined}
                    </Flex>
                  ))}
                </Box>
              ))
            )}
          </Box>
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  );
}
