import { Avatar, Card, IconButton } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import CardHeadingExample from '../../examples/CardHeading.example';
import { CardHeading } from './CardHeading';

const meta = {
  title: 'Recipes/CardHeading',
  component: CardHeading,
  args: {
    title: 'Jane Doe',
    description: 'Product · Designer',
    avatar: <Avatar fallback="JD" radius="full" />,
    actions: (
      <IconButton variant="ghost" color="gray" aria-label="More options">
        <DotsHorizontalIcon />
      </IconButton>
    ),
  },
  render: (args) => (
    <Card style={{ maxWidth: 400 }}>
      <CardHeading {...args} />
    </Card>
  ),
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CardHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title/description/avatar/actions in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <CardHeadingExample />,
};

export const WithAvatarAndActions: Story = {
  args: {
    avatar: <Avatar fallback="JD" radius="full" />,
    title: 'Jane Doe',
    description: 'Product · Designer',
    actions: (
      <IconButton variant="ghost" color="gray" aria-label="More options">
        <DotsHorizontalIcon />
      </IconButton>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Summary',
    description: undefined,
    avatar: undefined,
    actions: undefined,
  },
};
