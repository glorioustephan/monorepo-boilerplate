import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChatbotEmptyExample, ChatbotSeededExample } from '../../examples/Chatbot.example';
import { Chatbot } from './Chatbot';

const meta = {
  title: 'Templates/Chat/Chatbot',
  component: Chatbot,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Chatbot>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Seeded conversation — shows user/assistant bubbles, markdown, and a code block. */
export const Default: Story = {
  render: () => <ChatbotSeededExample />,
};

/** Empty state — shows the heading and suggestion pills before any messages. */
export const EmptyState: Story = {
  render: () => <ChatbotEmptyExample />,
};
