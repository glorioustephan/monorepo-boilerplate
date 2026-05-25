import type { Meta, StoryObj } from '@storybook/react-vite';

import NotificationExample from '../../examples/Notification.example';
import { Notification } from './Notification';

const meta = {
  title: 'Blocks/Notification',
  component: Notification,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NotificationExample />,
};

export const InlineCard: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <Notification title="Deployment complete" color="green">
        Your app is live at monorepo-boilerplate.vercel.app.
      </Notification>
    </div>
  ),
};
