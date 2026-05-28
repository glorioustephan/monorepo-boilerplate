import type { Meta, StoryObj } from '@storybook/react-vite';

import ChatContainerExample from '../../examples/ChatContainer.example';

const meta = {
  title: 'Blocks/Chat/ChatContainer',
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full chat log with a ScrollButton pinned bottom-right — scroll up to reveal it. */
export const Default: Story = {
  render: () => <ChatContainerExample />,
};
