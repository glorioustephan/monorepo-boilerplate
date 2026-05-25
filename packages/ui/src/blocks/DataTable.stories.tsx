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
    columns: [],
    rows: [],
    getRowKey: (row: Record<string, string>) => row['id'] ?? '',
  },
  parameters: { layout: 'padded' },
} satisfies Meta<ConcreteDataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box p="4">
      <DataTableExample />
    </Box>
  ),
};

export const Empty: Story = {
  render: () => (
    <Box p="4">
      <DataTable
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'role', header: 'Role' },
        ]}
        rows={[]}
        getRowKey={(row) => row['id'] ?? ''}
        size="2"
        variant="surface"
      />
    </Box>
  ),
};
