import type { Meta, StoryObj } from '@storybook/react-vite';

import CommandPaletteExample from '../../examples/CommandPalette.example';

const meta = {
  title: 'Recipes/CommandPalette',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CommandPaletteExample />,
};
