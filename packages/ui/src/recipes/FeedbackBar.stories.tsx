import type { Meta, StoryObj } from '@storybook/react-vite';

import FeedbackBarExample from '../../examples/FeedbackBar.example';
import { FeedbackBar } from './FeedbackBar';

const meta = {
  title: 'Recipes/Chat/FeedbackBar',
  component: FeedbackBar,
  args: {
    title: 'Was this response helpful?',
    onHelpful: () => undefined,
    onNotHelpful: () => undefined,
    onClose: () => undefined,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FeedbackBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default feedback bar with a title and all handlers. Mirrors the catalog example. */
export const Default: Story = {
  render: () => <FeedbackBarExample />,
};

/** Without a title — icon-only feedback row. */
export const NoTitle: Story = {
  args: { title: undefined },
};

/** Controls panel editable — adjust title and toggle handlers. */
export const Configurable: Story = {};
