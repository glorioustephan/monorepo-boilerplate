import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { DataTable } from './DataTable';

interface Row {
  id: string;
  name: string;
  role: string;
}

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
] as const;

const rows: Row[] = [
  { id: '1', name: 'Alice', role: 'Admin' },
  { id: '2', name: 'Bob', role: 'Viewer' },
];

describe('DataTable', () => {
  it('renders column headers', () => {
    renderWithTheme(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
  });

  it('renders row data', () => {
    renderWithTheme(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders default empty state when rows is empty', () => {
    renderWithTheme(<DataTable<Row> columns={columns} rows={[]} getRowKey={(r) => r.id} />);
    expect(screen.getByText('No data to display.')).toBeInTheDocument();
  });

  it('renders a custom empty node when provided', () => {
    renderWithTheme(
      <DataTable<Row>
        columns={columns}
        rows={[]}
        getRowKey={(r) => r.id}
        empty={<span>Nothing here</span>}
      />,
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders a caption when provided', () => {
    renderWithTheme(
      <DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} caption="User table" />,
    );
    expect(screen.getByText('User table')).toBeInTheDocument();
  });

  it('uses a custom cell renderer', () => {
    const customColumns = [
      { key: 'name', header: 'Name', cell: (r: Row) => <strong>{r.name.toUpperCase()}</strong> },
    ] as const;
    renderWithTheme(<DataTable columns={customColumns} rows={rows} getRowKey={(r) => r.id} />);
    expect(screen.getByText('ALICE')).toBeInTheDocument();
  });
});
