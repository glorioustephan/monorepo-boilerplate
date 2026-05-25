import { Box } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SidebarNavExample from '../../examples/SidebarNav.example';
import { SidebarNav } from './SidebarNav';

const meta = {
  title: 'Blocks/SidebarNav',
  component: SidebarNav,
  args: { sections: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SidebarNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box width="280px" height="100vh">
      <SidebarNavExample />
    </Box>
  ),
};

export const PlainSections: Story = {
  render: () => (
    <Box width="280px" height="100vh">
      <SidebarNav
        sections={[
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
        ]}
      />
    </Box>
  ),
};
