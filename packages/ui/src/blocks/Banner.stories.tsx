import type { Meta, StoryObj } from '@storybook/react-vite';

import BannerExample from '../../examples/Banner.example';
import { Banner } from './Banner';

const meta = {
  title: 'Blocks/Banner',
  component: Banner,
  args: { children: 'Announcement text.' },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BannerExample />,
};

export const MessageOnly: Story = {
  render: () => <Banner color="grass">Your account has been verified. Welcome aboard!</Banner>,
};

export const WithDismiss: Story = {
  render: () => (
    <Banner color="amber" onDismiss={() => undefined}>
      Scheduled maintenance on Saturday, 02:00–04:00 UTC. Expect brief downtime.
    </Banner>
  ),
};
