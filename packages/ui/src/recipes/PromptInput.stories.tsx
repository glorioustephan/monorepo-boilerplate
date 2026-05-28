import type { Meta, StoryObj } from '@storybook/react-vite';

import PromptInputExample from '../../examples/PromptInput.example';
import { PromptInput } from './PromptInput';

const meta = {
  title: 'Recipes/Chat/PromptInput',
  component: PromptInput,
  // `children` is required; provide a minimal default so stories that override `render` typecheck.
  args: {
    children: null,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PromptInput>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default story — mirrors the catalog example (controlled textarea + action toolbar). */
export const Default: Story = {
  render: () => <PromptInputExample />,
};

/** Disabled state — the shell and textarea are non-interactive. */
export const Disabled: Story = {
  render: () => (
    <PromptInput value="Some draft text" disabled>
      <PromptInput.Textarea placeholder="Ask anything…" />
      <PromptInput.Actions>
        <PromptInput.Action tooltip="Send message" side="top">
          <button aria-label="Send message">Send</button>
        </PromptInput.Action>
      </PromptInput.Actions>
    </PromptInput>
  ),
};

/** Loading state — marks the shell as loading (e.g. while awaiting a response). */
export const Loading: Story = {
  render: () => (
    <PromptInput value="" isLoading>
      <PromptInput.Textarea placeholder="Ask anything…" />
    </PromptInput>
  ),
};
