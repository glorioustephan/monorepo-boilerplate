import type { Meta, StoryObj } from '@storybook/react-vite';

import FeedExample from '../../examples/Feed.example';
import { Feed } from './Feed';

const meta = {
  title: 'Recipes/Feed',
  component: Feed,
  args: {
    items: [
      { id: '1', content: 'Created a new project.', timestamp: 'Yesterday' },
      { id: '2', content: 'Invited three teammates.', timestamp: '2 days ago' },
      { id: '3', content: 'Published first release.', timestamp: '1 week ago' },
    ],
  },
  render: (args) => <Feed {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Feed>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit items in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <FeedExample />,
};

export const NoIcons: Story = {
  args: {
    items: [
      { id: '1', content: 'Created a new project.', timestamp: 'Yesterday' },
      { id: '2', content: 'Invited three teammates.', timestamp: '2 days ago' },
      { id: '3', content: 'Published first release.', timestamp: '1 week ago' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ id: 'only', content: 'Account created.', timestamp: 'Just now' }],
  },
};
