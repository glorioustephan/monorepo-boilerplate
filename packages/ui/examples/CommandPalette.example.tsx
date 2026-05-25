'use client';

import { useState } from 'react';

import { Button, type CommandItem, CommandPalette, Flex, Text } from '@monorepo-boilerplate/ui';
import {
  FileIcon,
  GearIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons';

const items: readonly CommandItem[] = [
  {
    id: 'dashboard',
    label: 'Go to Dashboard',
    group: 'Navigation',
    icon: <RocketIcon />,
    keywords: ['home', 'overview'],
  },
  { id: 'profile', label: 'View profile', group: 'Navigation', icon: <PersonIcon /> },
  {
    id: 'settings',
    label: 'Open settings',
    group: 'Navigation',
    icon: <GearIcon />,
    shortcut: '⌘,',
  },
  {
    id: 'new-doc',
    label: 'Create new document',
    group: 'Actions',
    icon: <FileIcon />,
    shortcut: '⌘N',
  },
  { id: 'search', label: 'Search everything', group: 'Actions', icon: <MagnifyingGlassIcon /> },
];

/** CommandPalette opens a ⌘K-style searchable command overlay with keyboard navigation. */
export default function CommandPaletteExample() {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <Flex direction="column" gap="3" align="start">
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      {chosen !== null ? (
        <Text size="2" color="gray">
          Last command: {chosen}
        </Text>
      ) : undefined}
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        onSelect={(item) => setChosen(item.label)}
      />
    </Flex>
  );
}
