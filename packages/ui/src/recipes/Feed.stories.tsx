import type { Meta, StoryObj } from '@storybook/react-vite';

import FeedExample from '../../examples/Feed.example';
import { Feed } from './Feed';

const meta = {
  title: 'Recipes/Feed',
  component: Feed,
  args: { items: [] },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Feed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FeedExample />,
};

export const NoIcons: Story = {
  render: () => (
    <Feed
      items={[
        { id: '1', content: 'Created a new project.', timestamp: 'Yesterday' },
        { id: '2', content: 'Invited three teammates.', timestamp: '2 days ago' },
        { id: '3', content: 'Published first release.', timestamp: '1 week ago' },
      ]}
    />
  ),
};

export const SingleItem: Story = {
  render: () => (
    <Feed
      items={[
        {
          id: 'only',
          content: 'Account created.',
          timestamp: 'Just now',
        },
      ]}
    />
  ),
};
