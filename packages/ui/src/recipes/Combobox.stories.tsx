import type { Meta, StoryObj } from '@storybook/react-vite';

import ComboboxExample from '../../examples/Combobox.example';

const meta = {
  title: 'Recipes/Combobox',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ComboboxExample />,
};
