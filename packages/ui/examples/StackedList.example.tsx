import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Avatar, Badge, DropdownMenu, IconButton, StackedList } from '@monorepo-boilerplate/ui';
import type { StackedListItem } from '@monorepo-boilerplate/ui';

const people: readonly StackedListItem[] = [
  {
    id: '1',
    leading: <Avatar size="2" fallback="AC" radius="full" />,
    title: 'Alice Chen',
    description: 'alice@example.com',
    meta: (
      <Badge color="indigo" variant="soft" radius="full">
        Admin
      </Badge>
    ),
    trailing: (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" size="1" aria-label="Actions for Alice Chen">
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>View profile</DropdownMenu.Item>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">Remove</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    ),
  },
  {
    id: '2',
    leading: <Avatar size="2" fallback="BM" radius="full" />,
    title: 'Bob Martinez',
    description: 'bob@example.com',
    meta: (
      <Badge color="grass" variant="soft" radius="full">
        Editor
      </Badge>
    ),
    trailing: (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" size="1" aria-label="Actions for Bob Martinez">
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>View profile</DropdownMenu.Item>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">Remove</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    ),
  },
  {
    id: '3',
    leading: <Avatar size="2" fallback="CS" radius="full" />,
    title: 'Carol Smith',
    description: 'carol@example.com',
    meta: (
      <Badge color="gray" variant="soft" radius="full">
        Viewer
      </Badge>
    ),
    trailing: (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" size="1" aria-label="Actions for Carol Smith">
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>View profile</DropdownMenu.Item>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">Remove</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    ),
  },
];

/** StackedList of team members — avatar, name + email, role badge, and an actions dropdown. */
export default function StackedListExample() {
  return <StackedList items={people} />;
}
