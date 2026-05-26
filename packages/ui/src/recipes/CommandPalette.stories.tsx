import { type CommandItem, CommandPalette } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

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

/** Proves type-to-filter narrows the list (content lives in a Dialog portal). */
export const FiltersOnType: Story = {
  play: async ({ canvasElement, userEvent }) => {
    // The palette renders into a Dialog portal, so query the document body, not the canvas.
    const body = within(canvasElement.ownerDocument.body);
    const input = await body.findByRole('combobox');
    await userEvent.type(input, 'settings');
    await expect(body.getByRole('option', { name: /Open settings/ })).toBeInTheDocument();
    await expect(body.queryByRole('option', { name: /Go to Dashboard/ })).not.toBeInTheDocument();
  },
};

/** Reference example: a trigger button that opens the palette and tracks the last command. */
export const Example: Story = {
  render: () => <CommandPaletteExample />,
};
