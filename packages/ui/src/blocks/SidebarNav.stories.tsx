import { Box } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SidebarNavExample from '../../examples/SidebarNav.example';
import { SidebarNav } from './SidebarNav';

const meta = {
  title: 'Blocks/SidebarNav',
  component: SidebarNav,
  args: {
    sections: [
      {
        label: 'General',
        items: [
          { label: 'Overview', href: '/overview', active: true },
          { label: 'Activity', href: '/activity' },
          { label: 'Reports', href: '/reports' },
        ],
      },
      {
        label: 'Account',
        items: [
          { label: 'Profile', href: '/profile' },
          { label: 'Billing', href: '/billing' },
          { label: 'Notifications', href: '/notifications' },
        ],
      },
    ],
    header: undefined,
    footer: undefined,
  },
  render: (args) => (
    <Box width="280px" height="100vh">
      <SidebarNav {...args} />
    </Box>
  ),
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SidebarNav>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit sections/header/footer in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms. */
export const Example: Story = {
  render: () => (
    <Box width="280px" height="100vh">
      <SidebarNavExample />
    </Box>
  ),
};

export const PlainSections: Story = {
  args: {
    sections: [
      {
        label: 'General',
        items: [
          { label: 'Overview', href: '/overview', active: true },
          { label: 'Activity', href: '/activity' },
          { label: 'Reports', href: '/reports' },
        ],
      },
      {
        label: 'Account',
        items: [
          { label: 'Profile', href: '/profile' },
          { label: 'Billing', href: '/billing' },
          { label: 'Notifications', href: '/notifications' },
        ],
      },
    ],
  },
};

export const Collapsible: Story = {
  args: {
    sections: [
      {
        label: 'Navigation',
        collapsible: true,
        defaultOpen: true,
        items: [
          { label: 'Dashboard', href: '/dashboard', active: true },
          { label: 'Analytics', href: '/analytics' },
          { label: 'Settings', href: '/settings' },
        ],
      },
    ],
  },
};
