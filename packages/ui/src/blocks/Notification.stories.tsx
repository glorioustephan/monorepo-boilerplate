import type { Meta, StoryObj } from '@storybook/react-vite';

import NotificationExample from '../../examples/Notification.example';
import { Notification } from './Notification';

const meta = {
  title: 'Blocks/Notification',
  component: Notification,
  args: {
    title: 'Deployment complete',
    children: 'Your app is live at monorepo-boilerplate.vercel.app.',
    color: 'green',
    onDismiss: () => {},
  },
  render: (args) => (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <Notification {...args} />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven single toast — edit title/body/color or toggle the dismiss button in Controls. */
export const Default: Story = {};

/** Reference example: a portal'd NotificationRegion stacking dismissable toasts in a corner. */
export const Region: Story = {
  render: () => <NotificationExample />,
};
