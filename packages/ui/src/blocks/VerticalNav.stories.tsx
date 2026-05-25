import { Box } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import VerticalNavExample from '../../examples/VerticalNav.example';
import { VerticalNav } from './VerticalNav';

const meta = {
  title: 'Blocks/VerticalNav',
  component: VerticalNav,
  args: { items: [] },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof VerticalNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box p="4" style={{ maxWidth: '16rem' }}>
      <VerticalNavExample />
    </Box>
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <Box p="4" style={{ maxWidth: '16rem' }}>
      <VerticalNav
        items={[
          { label: 'General', href: '/settings/general', active: true },
          { label: 'Security', href: '/settings/security' },
          { label: 'Billing', href: '/settings/billing' },
          { label: 'Notifications', href: '/settings/notifications' },
        ]}
      />
    </Box>
  ),
};
