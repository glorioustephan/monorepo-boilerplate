import type { Meta, StoryObj } from '@storybook/react-vite';

import ActionPanelExample from '../../examples/ActionPanel.example';
import { ActionPanel } from './ActionPanel';

const meta = {
  title: 'Recipes/ActionPanel',
  component: ActionPanel,
  args: { title: 'Setting' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ActionPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ActionPanelExample />,
};

export const TitleOnly: Story = {
  render: () => <ActionPanel title="Enable notifications" />,
};

export const WithDescription: Story = {
  render: () => (
    <ActionPanel
      title="Export data"
      description="Download a full export of your account data in JSON format."
    />
  ),
};
