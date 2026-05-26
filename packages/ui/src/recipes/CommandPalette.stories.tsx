import { type CommandItem, CommandPalette } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CommandPaletteExample from '../../examples/CommandPalette.example';

const items: readonly CommandItem[] = [
  { id: 'dashboard', label: 'Go to Dashboard', group: 'Navigation' },
  { id: 'profile', label: 'View profile', group: 'Navigation' },
  { id: 'settings', label: 'Open settings', group: 'Navigation', shortcut: '⌘,' },
  { id: 'new', label: 'Create new document', group: 'Actions', shortcut: '⌘N' },
  { id: 'search', label: 'Search everything', group: 'Actions' },
];

const meta = {
  title: 'Recipes/CommandPalette',
  component: CommandPalette,
  // `open` is a boolean control; toggle it (or edit placeholder/title) in the Controls panel.
  args: { open: true, items, onOpenChange: () => {}, onSelect: () => {} },
  render: (args) => <CommandPalette {...args} />,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CommandPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — toggle `open`, edit `placeholder`/`emptyMessage`/`title` in Controls. */
export const Default: Story = {};

/** Reference example: a trigger button that opens the palette and tracks the last command. */
export const Example: Story = {
  render: () => <CommandPaletteExample />,
};
