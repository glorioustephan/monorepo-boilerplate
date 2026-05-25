import {
  BarChartIcon,
  CalendarIcon,
  DashboardIcon,
  GearIcon,
  PersonIcon,
  StackIcon,
} from '@radix-ui/react-icons';
import {
  Avatar,
  Badge,
  Button,
  DashboardTemplate,
  DataTable,
  Flex,
  Grid,
  Navbar,
  PageHeading,
  SidebarNav,
  StatCard,
  Text,
  type SidebarNavItem,
  type SidebarNavSection,
  type TableColumn,
} from '@monorepo-boilerplate/ui';

// ── Sidebar ──────────────────────────────────────────────────────────────────

const mainItems: readonly SidebarNavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon />, active: true },
  {
    label: 'Team',
    href: '/team',
    icon: <PersonIcon />,
    badge: (
      <Badge color="indigo" variant="soft" radius="full">
        4
      </Badge>
    ),
  },
  { label: 'Projects', href: '/projects', icon: <StackIcon /> },
  { label: 'Calendar', href: '/calendar', icon: <CalendarIcon /> },
];

const settingsItems: readonly SidebarNavItem[] = [
  { label: 'Settings', href: '/settings', icon: <GearIcon /> },
];

const sections: readonly SidebarNavSection[] = [
  { label: 'Main', items: mainItems },
  { label: 'Account', items: settingsItems, collapsible: true },
];

const sidebarHeader = (
  <Flex align="center" gap="2" px="3" py="3">
    <Avatar fallback="M" size="2" radius="full" color="indigo" />
    <Text size="3" weight="bold">
      Monorepo
    </Text>
  </Flex>
);

const sidebarFooter = (
  <Flex align="center" gap="3" px="3" py="3">
    <Avatar fallback="JB" size="2" radius="full" color="gray" variant="soft" />
    <Flex direction="column" flexGrow="1">
      <Text size="2" weight="medium">
        James Baker
      </Text>
      <Text size="1" color="gray">
        admin
      </Text>
    </Flex>
  </Flex>
);

const sidebar = <SidebarNav header={sidebarHeader} sections={sections} footer={sidebarFooter} />;

// ── Navbar ────────────────────────────────────────────────────────────────────

const header = (
  <Navbar
    brand={
      <Text size="3" weight="bold">
        Monorepo
      </Text>
    }
    links={[
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Projects', href: '/projects' },
    ]}
    actions={<Button size="2">New project</Button>}
  />
);

// ── Stats ─────────────────────────────────────────────────────────────────────

const stats = [
  { label: 'Total revenue', value: '$45,231', delta: { trend: 'up' as const, value: '+20.1%' } },
  { label: 'Active users', value: '2,350', delta: { trend: 'up' as const, value: '+180' } },
  { label: 'Pending tasks', value: '12', delta: { trend: 'neutral' as const, value: '0' } },
  { label: 'Errors today', value: '3', delta: { trend: 'down' as const, value: '-5' } },
];

// ── DataTable ─────────────────────────────────────────────────────────────────

interface Project {
  readonly id: string;
  readonly name: string;
  readonly status: 'active' | 'paused' | 'done';
  readonly owner: string;
}

const projects: readonly Project[] = [
  { id: '1', name: 'Alpha launch', status: 'active', owner: 'James Baker' },
  { id: '2', name: 'Beta redesign', status: 'paused', owner: 'Sam Lee' },
  { id: '3', name: 'Infra migration', status: 'done', owner: 'Pat Kim' },
];

const STATUS_COLOR = { active: 'green', paused: 'amber', done: 'gray' } as const;

const columns: ReadonlyArray<TableColumn<Project>> = [
  { key: 'name', header: 'Project' },
  { key: 'owner', header: 'Owner' },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge color={STATUS_COLOR[row.status]} variant="soft">
        {row.status}
      </Badge>
    ),
  },
];

/** DashboardTemplate — sidebar + navbar + stat cards + project table. */
export default function DashboardTemplateExample() {
  return (
    <DashboardTemplate sidebar={sidebar} header={header}>
      <Flex direction="column" gap="6">
        <PageHeading
          title="Dashboard"
          description="Welcome back — here's what's happening."
          actions={
            <Button>
              <BarChartIcon /> View reports
            </Button>
          }
        />
        <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="4">
          {stats.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} delta={s.delta} />
          ))}
        </Grid>
        <DataTable columns={columns} rows={projects} getRowKey={(r) => r.id} />
      </Flex>
    </DashboardTemplate>
  );
}
