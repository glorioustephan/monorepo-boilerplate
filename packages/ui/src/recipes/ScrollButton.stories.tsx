import type { Meta, StoryObj } from '@storybook/react-vite';

import ScrollButtonExample from '../../examples/ScrollButton.example';
import { ScrollButton } from './ScrollButton';

const meta = {
  title: 'Recipes/Chat/ScrollButton',
  component: ScrollButton,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ScrollButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default — rendered inside a tall ChatContainer so you can scroll up to reveal the button.
 * The button fades out when already at the bottom.
 */
export const Default: Story = {
  render: () => <ScrollButtonExample />,
};
