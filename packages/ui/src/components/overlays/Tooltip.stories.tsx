import { Button, Tooltip } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Overlays/Tooltip',
  parameters: { layout: 'centered' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip content="Adds the item to your cart">
      <Button variant="soft">Add to cart</Button>
    </Tooltip>
  ),
};
