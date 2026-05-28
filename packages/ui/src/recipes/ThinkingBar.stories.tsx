import type { Meta, StoryObj } from '@storybook/react-vite';

import ThinkingBarExample from '../../examples/ThinkingBar.example';
import { ThinkingBar } from './ThinkingBar';

const meta = {
  title: 'Recipes/Chat/ThinkingBar',
  component: ThinkingBar,
  args: {
    text: 'Thinking',
    stopLabel: 'Answer now',
  },
  render: (args) => <ThinkingBar {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ThinkingBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Reference example — all three display states. */
export const Default: Story = {
  render: () => <ThinkingBarExample />,
};

/** Label-only — no interactivity. */
export const LabelOnly: Story = {};

/** With stop control — shows the cancel button on the right. */
export const WithStop: Story = {
  args: {
    onStop: () => {},
  },
};

/** Clickable label — wraps the shimmer text in a button with a chevron. */
export const ClickableLabel: Story = {
  args: {
    onClick: () => {},
    onStop: () => {},
  },
};

/** Custom labels. */
export const CustomLabels: Story = {
  args: {
    text: 'Reasoning through your question',
    stopLabel: 'Stop',
    onClick: () => {},
    onStop: () => {},
  },
};
