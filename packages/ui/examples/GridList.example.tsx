import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { Avatar, Badge, GridList } from '@monorepo-boilerplate/ui';
import type { GridListItem } from '@monorepo-boilerplate/ui';

const people: readonly GridListItem[] = [
  {
    id: '1',
    media: <Avatar size="5" fallback="AC" radius="full" />,
    title: 'Alice Chen',
    description: 'Senior Product Designer',
    meta: (
      <Badge color="indigo" variant="soft" radius="full">
        <EnvelopeClosedIcon />
        alice@example.com
      </Badge>
    ),
  },
  {
    id: '2',
    media: <Avatar size="5" fallback="BM" radius="full" />,
    title: 'Bob Martinez',
    description: 'Staff Engineer',
    meta: (
      <Badge color="grass" variant="soft" radius="full">
        <EnvelopeClosedIcon />
        bob@example.com
      </Badge>
    ),
  },
  {
    id: '3',
    media: <Avatar size="5" fallback="CS" radius="full" />,
    title: 'Carol Smith',
    description: 'Engineering Manager',
    meta: (
      <Badge color="orange" variant="soft" radius="full">
        <EnvelopeClosedIcon />
        carol@example.com
      </Badge>
    ),
  },
];

/** GridList of team members — avatar media, name title, role description, and email badge meta. */
export default function GridListExample() {
  return <GridList items={people} />;
}
