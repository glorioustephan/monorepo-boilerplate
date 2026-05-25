import { HamburgerMenuIcon, BellIcon, PersonIcon } from '@radix-ui/react-icons';
import { Avatar, DropdownMenu, Heading, IconButton, Navbar } from '@monorepo-boilerplate/ui';

const links = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Team', href: '/team' },
  { label: 'Projects', href: '/projects' },
  { label: 'Calendar', href: '/calendar' },
] as const;

/** Navbar with brand, active link, notification bell, and a profile dropdown. */
export default function NavbarExample() {
  return (
    <Navbar
      brand={<Heading size="4">Acme</Heading>}
      links={links}
      menuIcon={<HamburgerMenuIcon />}
      actions={
        <>
          <IconButton variant="ghost" aria-label="Notifications">
            <BellIcon />
          </IconButton>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar src="" fallback="JB" size="2" radius="full" style={{ cursor: 'pointer' }} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <PersonIcon />
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item>Settings</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red">Sign out</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </>
      }
    />
  );
}
