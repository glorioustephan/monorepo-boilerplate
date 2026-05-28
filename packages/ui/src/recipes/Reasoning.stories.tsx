import type { Meta, StoryObj } from '@storybook/react-vite';

import ReasoningExample from '../../examples/Reasoning.example';
import { Reasoning } from './Reasoning';

const meta = {
  title: 'Recipes/Chat/Reasoning',
  component: Reasoning,
  args: {
    children: null,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Reasoning>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default collapsible reasoning disclosure (closed by default). */
export const Default: Story = {
  render: () => <ReasoningExample />,
};

/** Reasoning starts open — equivalent to the user expanding it. */
export const OpenByDefault: Story = {
  render: () => (
    <Reasoning open>
      <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
      <Reasoning.Content>
        I evaluated several strategies and concluded the eastern route is optimal given current
        conditions.
      </Reasoning.Content>
    </Reasoning>
  ),
};

/** `isStreaming` auto-opens the disclosure while the model is streaming. */
export const Streaming: Story = {
  render: () => (
    <Reasoning isStreaming>
      <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
      <Reasoning.Content>Generating reasoning…</Reasoning.Content>
    </Reasoning>
  ),
};

/** Markdown mode delegates to the Markdown recipe for rich rendering. */
export const WithMarkdown: Story = {
  render: () => (
    <Reasoning open>
      <Reasoning.Trigger>Detailed analysis</Reasoning.Trigger>
      <Reasoning.Content markdown>
        {`## Key findings\n\n- The eastern route is **30% faster**.\n- Cost difference is negligible.\n- Weather risk is low.`}
      </Reasoning.Content>
    </Reasoning>
  ),
};
