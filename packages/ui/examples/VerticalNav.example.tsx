import { CalendarIcon, DashboardIcon, PersonIcon, StackIcon } from '@radix-ui/react-icons';
import { Badge, VerticalNav } from '@monorepo-boilerplate/ui';
import type { VerticalNavItem } from '@monorepo-boilerplate/ui';

const items: readonly VerticalNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
    active: true,
  },
  {
    label: 'Team',
    href: '/team',
    icon: <PersonIcon />,
    badge: (
      <Badge color="indigo" variant="soft" radius="full">
        12
      </Badge>
    ),
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: <StackIcon />,
  },
  {
    label: 'Calendar',
    href: '/calendar',
    icon: <CalendarIcon />,
  },
];

/** VerticalNav sidebar — Dashboard active, Team with a member count badge, Projects, Calendar. */
export default function VerticalNavExample() {
  return <VerticalNav items={items} />;
}
