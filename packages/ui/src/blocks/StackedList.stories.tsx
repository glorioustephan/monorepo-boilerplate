import { Box } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import StackedListExample from '../../examples/StackedList.example';
import { StackedList } from './StackedList';

const meta = {
  title: 'Blocks/StackedList',
  component: StackedList,
  args: { items: [] },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StackedList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box p="4" style={{ maxWidth: '36rem' }}>
      <StackedListExample />
    </Box>
  ),
};

export const Empty: Story = {
  render: () => (
    <Box p="4" style={{ maxWidth: '36rem' }}>
      <StackedList items={[]} />
    </Box>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <Box p="4" style={{ maxWidth: '36rem' }}>
      <StackedList
        items={[
          { id: '1', title: 'Home', description: 'The landing page', href: '/' },
          { id: '2', title: 'Docs', description: 'Component documentation', href: '/docs' },
          { id: '3', title: 'Blog', description: 'Latest news and updates', href: '/blog' },
        ]}
      />
    </Box>
  ),
};
