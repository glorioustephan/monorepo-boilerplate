import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Badge,
  DataTable,
  Flex,
  IconButton,
  Text,
  VisuallyHidden,
} from '@monorepo-boilerplate/ui';
import type { TableColumn } from '@monorepo-boilerplate/ui';

interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatarFallback: string;
  readonly role: string;
  readonly status: 'active' | 'inactive' | 'pending';
}

const users: readonly User[] = [
  {
    id: '1',
    name: 'Alice Chen',
    email: 'alice@example.com',
    avatarFallback: 'AC',
    role: 'Admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Bob Martinez',
    email: 'bob@example.com',
    avatarFallback: 'BM',
    role: 'Editor',
    status: 'active',
  },
  {
    id: '3',
    name: 'Carol Smith',
    email: 'carol@example.com',
    avatarFallback: 'CS',
    role: 'Viewer',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david@example.com',
    avatarFallback: 'DP',
    role: 'Editor',
    status: 'pending',
  },
];

const STATUS_COLOR = {
  active: 'green',
  inactive: 'gray',
  pending: 'amber',
} as const;

const columns: ReadonlyArray<TableColumn<User>> = [
  {
    key: 'name',
    header: 'Name',
    width: '14rem',
    cell: (row) => (
      <Flex align="center" gap="3">
        <Avatar size="2" fallback={row.avatarFallback} radius="full" />
        <Flex direction="column" gap="1">
          <Text size="2" weight="medium">
            {row.name}
          </Text>
          <Text size="1" color="gray">
            {row.email}
          </Text>
        </Flex>
      </Flex>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    width: '8rem',
  },
  {
    key: 'status',
    header: 'Status',
    width: '8rem',
    cell: (row) => (
      <Badge color={STATUS_COLOR[row.status]} variant="soft" radius="full" highContrast>
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: <VisuallyHidden>Actions</VisuallyHidden>,
    width: '3rem',
    align: 'right',
    cell: () => (
      <IconButton variant="ghost" size="1" aria-label="Row actions">
        <DotsHorizontalIcon />
      </IconButton>
    ),
  },
];

/** DataTable with user records — names with avatar + email, role, status badge, and row actions. */
export default function DataTableExample() {
  return (
    <DataTable
      columns={columns}
      rows={users}
      getRowKey={(row) => row.id}
      size="2"
      variant="surface"
    />
  );
}
