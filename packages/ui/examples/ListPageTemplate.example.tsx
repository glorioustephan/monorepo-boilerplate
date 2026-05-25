'use client';

import { useState } from 'react';

import {
  Badge,
  Breadcrumb,
  Button,
  DataTable,
  ListPageTemplate,
  Pagination,
  type TableColumn,
} from '@monorepo-boilerplate/ui';
import { PlusIcon } from '@radix-ui/react-icons';

interface Invoice {
  readonly id: string;
  readonly number: string;
  readonly client: string;
  readonly status: 'paid' | 'pending' | 'overdue';
  readonly amount: string;
}

const rows: readonly Invoice[] = [
  { id: '1', number: 'INV-001', client: 'Acme Corp', status: 'paid', amount: '$1,200.00' },
  { id: '2', number: 'INV-002', client: 'Globex', status: 'pending', amount: '$850.00' },
  { id: '3', number: 'INV-003', client: 'Initech', status: 'overdue', amount: '$2,300.00' },
];

const STATUS_COLOR = { paid: 'green', pending: 'amber', overdue: 'red' } as const;

const columns: ReadonlyArray<TableColumn<Invoice>> = [
  { key: 'number', header: 'Invoice' },
  { key: 'client', header: 'Client' },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge color={STATUS_COLOR[row.status]} variant="soft">
        {row.status}
      </Badge>
    ),
  },
  { key: 'amount', header: 'Amount', align: 'right' },
];

/** ListPageTemplate wires a page heading, a data table, and pagination into a CRUD index page. */
export default function ListPageTemplateExample() {
  const [page, setPage] = useState(1);
  return (
    <ListPageTemplate
      title="Invoices"
      description="Track and manage your invoices."
      breadcrumbs={<Breadcrumb items={[{ label: 'Billing', href: '#' }, { label: 'Invoices' }]} />}
      actions={
        <Button>
          <PlusIcon /> New invoice
        </Button>
      }
      pagination={<Pagination page={page} pageCount={5} onPageChange={setPage} />}
    >
      <DataTable columns={columns} rows={rows} getRowKey={(row) => row.id} />
    </ListPageTemplate>
  );
}
