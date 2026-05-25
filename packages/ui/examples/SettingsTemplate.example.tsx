import { CalendarIcon, GearIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import {
  ActionPanel,
  Badge,
  Breadcrumb,
  Button,
  FormLayout,
  SettingsTemplate,
  TextField,
  VerticalNav,
  type VerticalNavItem,
} from '@monorepo-boilerplate/ui';

const navItems: readonly VerticalNavItem[] = [
  { label: 'Profile', href: '/settings/profile', icon: <PersonIcon />, active: true },
  { label: 'Account', href: '/settings/account', icon: <GearIcon /> },
  { label: 'Security', href: '/settings/security', icon: <LockClosedIcon /> },
  { label: 'Billing', href: '/settings/billing', icon: <CalendarIcon /> },
];

/** SettingsTemplate — vertical nav + profile form + danger-zone action panel. */
export default function SettingsTemplateExample() {
  return (
    <SettingsTemplate
      title="Settings"
      description="Manage your account preferences and profile information."
      breadcrumbs={<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Settings' }]} />}
      nav={<VerticalNav items={navItems} />}
    >
      {/* Profile form section */}
      <FormLayout
        title="Profile"
        description="Update your display name and contact details."
        columns={2}
        footer={
          <>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
            <Button>Save changes</Button>
          </>
        }
      >
        <TextField.Root placeholder="First name" defaultValue="James" aria-label="First name" />
        <TextField.Root placeholder="Last name" defaultValue="Baker" aria-label="Last name" />
        <TextField.Root
          placeholder="Email"
          defaultValue="jamesleebaker@gmail.com"
          aria-label="Email"
        />
        <TextField.Root placeholder="Job title" aria-label="Job title" />
      </FormLayout>

      {/* Notification preferences section */}
      <FormLayout
        title="Notifications"
        description="Choose which emails you'd like to receive."
        footer={<Button>Save preferences</Button>}
      >
        <TextField.Root
          placeholder="Digest frequency"
          defaultValue="Weekly"
          aria-label="Digest frequency"
        />
      </FormLayout>

      {/* Danger zone */}
      <ActionPanel
        title="Delete account"
        description="Permanently remove your account and all associated data. This action cannot be undone."
        action={
          <Button color="red" variant="soft">
            Delete account
          </Button>
        }
      />

      <ActionPanel
        title="Plan"
        description="You are on the Pro plan."
        action={
          <Badge color="indigo" variant="soft">
            Pro
          </Badge>
        }
      />
    </SettingsTemplate>
  );
}
