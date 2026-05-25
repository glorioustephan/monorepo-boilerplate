import { Avatar, Card, IconButton } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import CardHeadingExample from '../../examples/CardHeading.example';
import { CardHeading } from './CardHeading';

const meta = {
  title: 'Recipes/CardHeading',
  component: CardHeading,
  args: { title: 'Card title' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CardHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CardHeadingExample />,
};

export const WithAvatarAndActions: Story = {
  render: () => (
    <Card style={{ maxWidth: 400 }}>
      <CardHeading
        avatar={<Avatar fallback="JD" radius="full" />}
        title="Jane Doe"
        description="Product · Designer"
        actions={
          <IconButton variant="ghost" color="gray" aria-label="More options">
            <DotsHorizontalIcon />
          </IconButton>
        }
      />
    </Card>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Card style={{ maxWidth: 400 }}>
      <CardHeading title="Summary" />
    </Card>
  ),
};
