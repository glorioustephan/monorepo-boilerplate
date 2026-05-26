import type { Meta, StoryObj } from '@storybook/react-vite';

import ActionPanelExample from '../../examples/ActionPanel.example';
import { ActionPanel } from './ActionPanel';

const meta = {
  title: 'Recipes/ActionPanel',
  component: ActionPanel,
  args: {
    title: 'Export data',
    description: 'Download a full export of your account data in JSON format.',
  },
  render: (args) => <ActionPanel {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ActionPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title/description/action in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <ActionPanelExample />,
};

export const TitleOnly: Story = {
  args: {
    title: 'Enable notifications',
    description: undefined,
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Export data',
    description: 'Download a full export of your account data in JSON format.',
  },
};
