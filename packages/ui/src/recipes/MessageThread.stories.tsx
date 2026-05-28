import type { Meta, StoryObj } from '@storybook/react-vite';

import MessageThreadExample from '../../examples/MessageThread.example';
import { MessageThread } from './MessageThread';

const meta = {
  title: 'Recipes/Chat/MessageThread',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full user ↔ assistant exchange with markdown, a code block, and a system notice. */
export const Default: Story = {
  render: () => <MessageThreadExample />,
};

/** Streaming state — the trailing assistant turn shows a dots loader. */
export const Streaming: Story = {
  render: () => (
    <MessageThread
      isStreaming
      messages={[
        { id: '1', role: 'user', content: 'Write me a haiku.' },
        { id: '2', role: 'assistant', content: 'An old silent pond…' },
      ]}
    />
  ),
};

/** Empty thread — renders nothing. */
export const Empty: Story = {
  render: () => <MessageThread messages={[]} />,
};

/** System message only. */
export const SystemOnly: Story = {
  render: () => (
    <MessageThread
      messages={[
        {
          id: '1',
          role: 'system',
          content: 'Rate limit exceeded. Please wait 60 seconds.',
        },
      ]}
    />
  ),
};
