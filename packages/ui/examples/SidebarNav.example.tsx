import {
  CalendarIcon,
  DashboardIcon,
  GearIcon,
  PersonIcon,
  StackIcon,
} from '@radix-ui/react-icons';
import {
  Avatar,
  Badge,
  Flex,
  SidebarNav,
  type SidebarNavItem,
  type SidebarNavSection,
  Text,
} from '@monorepo-boilerplate/ui';

const mainItems: readonly SidebarNavItem[] = [
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

const settingsItems: readonly SidebarNavItem[] = [
  {
    label: 'General',
    href: '/settings/general',
    icon: <GearIcon />,
  },
  {
    label: 'Profile',
    href: '/settings/profile',
    icon: <PersonIcon />,
  },
];

const sections: readonly SidebarNavSection[] = [
  {
    label: 'Navigation',
    items: mainItems,
  },
  {
    label: 'Settings',
    items: settingsItems,
    collapsible: true,
    defaultOpen: true,
  },
];

const brand = (
  <Flex align="center" gap="2" px="3" py="2">
    <Avatar fallback="M" size="2" radius="full" color="indigo" />
    <Text size="3" weight="bold">
      Monorepo
    </Text>
  </Flex>
);

const footer = (
  <Flex align="center" gap="3" px="3" py="3">
    <Avatar fallback="JB" size="2" radius="full" color="gray" variant="soft" />
    <Flex direction="column" flexGrow="1">
      <Text size="2" weight="medium">
        James Baker
      </Text>
      <Text size="1" color="gray">
        jamesleebaker@gmail.com
      </Text>
    </Flex>
  </Flex>
);

/** SidebarNav — brand header, a plain nav section with an active item + badge, a collapsible settings section, and a user footer. */
export default function SidebarNavExample() {
  return <SidebarNav header={brand} sections={sections} footer={footer} />;
}
