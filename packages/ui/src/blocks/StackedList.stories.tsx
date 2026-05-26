import { Box } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import StackedListExample from '../../examples/StackedList.example';
import { StackedList } from './StackedList';

const meta = {
  title: 'Blocks/StackedList',
  component: StackedList,
  args: {
    items: [
      { id: '1', title: 'Home', description: 'The landing page' },
      { id: '2', title: 'Docs', description: 'Component documentation' },
      { id: '3', title: 'Blog', description: 'Latest news and updates' },
    ],
  },
  render: (args) => (
    <Box p="4" style={{ maxWidth: '36rem' }}>
      <StackedList {...args} />
    </Box>
  ),
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StackedList>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit items in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms. */
export const Example: Story = {
  render: () => (
    <Box p="4" style={{ maxWidth: '36rem' }}>
      <StackedListExample />
    </Box>
  ),
};

export const Empty: Story = {
  args: { items: [] },
};

export const WithLinks: Story = {
  args: {
    items: [
      { id: '1', title: 'Home', description: 'The landing page', href: '/' },
      { id: '2', title: 'Docs', description: 'Component documentation', href: '/docs' },
      { id: '3', title: 'Blog', description: 'Latest news and updates', href: '/blog' },
    ],
  },
};
