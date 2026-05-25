import type { ComponentProps, ReactNode } from 'react';

import { Table, Text } from '../components';
import { cn } from '../lib/cn';
import type { TableColumn } from '../types';

/**
 * DataTable — a generic, server-rendered data table block.
 * Use for displaying structured row data with typed column definitions,
 * optional empty states, and pass-through Radix Table sizing/variant props.
 * Keywords: table, list, grid, rows, columns, data, records.
 */
export interface DataTableProps<TRow> extends Omit<ComponentProps<typeof Table.Root>, 'children'> {
  /** Column definitions — header, key, optional cell renderer, width, and alignment. */
  readonly columns: ReadonlyArray<TableColumn<TRow>>;
  /** Row data to display. */
  readonly rows: readonly TRow[];
  /** Returns a stable key for each row. */
  readonly getRowKey: (row: TRow) => string;
  /** Rendered when `rows` is empty. Defaults to a gray "No data" message. */
  readonly empty?: ReactNode;
  /** Optional caption rendered above the table header. */
  readonly caption?: ReactNode;
  /** Additional className merged onto the root element wrapper. */
  readonly className?: string;
}

/** DataTable — a generic, server-rendered data table block. Use for displaying structured row data with typed column definitions, optional empty states, and pass-through Radix Table sizing/variant props. Keywords: table, list, grid, rows, columns, data, records. */
export function DataTable<TRow>({
  columns,
  rows,
  getRowKey,
  empty,
  caption,
  className,
  ...tableRootProps
}: DataTableProps<TRow>) {
  const emptyNode = empty ?? (
    <Text color="gray" size="2">
      No data to display.
    </Text>
  );

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <Table.Root {...tableRootProps}>
        {caption ? <caption>{caption}</caption> : undefined}
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell
                key={col.key}
                align={col.align}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>{emptyNode}</Table.Cell>
            </Table.Row>
          ) : (
            rows.map((row) => (
              <Table.Row key={getRowKey(row)}>
                {columns.map((col) => (
                  <Table.Cell key={col.key} align={col.align}>
                    {col.cell
                      ? col.cell(row)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
