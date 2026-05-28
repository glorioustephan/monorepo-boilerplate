import type { Meta, StoryObj } from '@storybook/react-vite';

import ToolCallingExample from '../../examples/ToolCalling.example';
import { ToolCalling } from './ToolCalling';

const meta = {
  title: 'Templates/Chat/ToolCalling',
  component: ToolCalling,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ToolCalling>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Seeded conversation: Reasoning (open) → Steps → two Tool blocks
 * (one completed, one errored) → a markdown answer with a code block.
 * Best surface for light/dark QA.
 */
export const Default: Story = {
  render: () => <ToolCallingExample />,
};

/** Empty state — no initial messages; type and send to trigger the mock streamer. */
export const Empty: Story = {
  render: () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToolCalling placeholder="Ask with tool calling…" />
    </div>
  ),
};
