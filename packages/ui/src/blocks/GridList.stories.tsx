import { Box } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import GridListExample from '../../examples/GridList.example';
import { GridList } from './GridList';

const meta = {
  title: 'Blocks/GridList',
  component: GridList,
  args: { items: [] },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof GridList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box p="4">
      <GridListExample />
    </Box>
  ),
};

export const SingleColumn: Story = {
  render: () => (
    <Box p="4" style={{ maxWidth: '24rem' }}>
      <GridList
        columns={{ initial: '1' }}
        items={[
          { id: '1', title: 'Project Alpha', description: 'Internal tooling revamp' },
          { id: '2', title: 'Project Beta', description: 'Customer-facing dashboard' },
          { id: '3', title: 'Project Gamma', description: 'Data pipeline infrastructure' },
        ]}
      />
    </Box>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <Box p="4">
      <GridList
        items={[
          { id: '1', title: 'Home', description: 'Landing page', href: '/' },
          { id: '2', title: 'Docs', description: 'Component documentation', href: '/docs' },
          { id: '3', title: 'Blog', description: 'Latest news and updates', href: '/blog' },
        ]}
      />
    </Box>
  ),
};
