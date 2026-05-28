import type { Meta, StoryObj } from '@storybook/react-vite';

import PromptSuggestionExample from '../../examples/PromptSuggestion.example';
import { PromptSuggestion } from './PromptSuggestion';

const meta = {
  title: 'Recipes/Chat/PromptSuggestion',
  component: PromptSuggestion,
  args: {
    children: 'Summarise this document',
    onClick: () => {},
  },
  render: (args) => <PromptSuggestion {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PromptSuggestion>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Reference example — pill row + highlight mode. */
export const Default: Story = {
  render: () => <PromptSuggestionExample />,
};

/** Pill mode (default) — rounded surface button. */
export const Pill: Story = {};

/** Pill row — multiple suggestions displayed together. */
export const PillRow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {['Write a poem', 'Explain this code', 'Help me debug'].map((s) => (
        <PromptSuggestion key={s} onClick={() => {}}>
          {s}
        </PromptSuggestion>
      ))}
    </div>
  ),
};

/** Highlight mode — matches a substring of the suggestion text. */
export const Highlight: Story = {
  args: {
    children: 'How do I use React hooks?',
    highlight: 'React',
  },
};

/** Highlight mode with no match — shows full text in muted color. */
export const HighlightNoMatch: Story = {
  args: {
    children: 'Write a haiku about the ocean',
    highlight: 'python',
  },
};
