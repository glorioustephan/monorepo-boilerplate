import { Box } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DataTableExample from '../../examples/DataTable.example';
import { DataTable } from './DataTable';

// Storybook requires concrete args for the generic component; pin TRow to Record<string, string>.
type ConcreteDataTable = typeof DataTable<Record<string, string>>;

const meta = {
  title: 'Blocks/DataTable',
  component: DataTable as ConcreteDataTable,
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'role', header: 'Role' },
      { key: 'status', header: 'Status' },
    ],
    rows: [
      { id: '1', name: 'Alice', role: 'Engineer', status: 'Active' },
      { id: '2', name: 'Bob', role: 'Designer', status: 'Active' },
      { id: '3', name: 'Carol', role: 'Manager', status: 'Away' },
    ],
    getRowKey: (row: Record<string, string>) => row['id'] ?? '',
  },
  render: (args) => (
    <Box p="4">
      <DataTable {...args} />
    </Box>
  ),
  parameters: { layout: 'padded' },
} satisfies Meta<ConcreteDataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit columns/rows in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms. */
export const Example: Story = {
  render: () => (
    <Box p="4">
      <DataTableExample />
    </Box>
  ),
};

export const Empty: Story = {
  args: {
    rows: [],
  },
};
