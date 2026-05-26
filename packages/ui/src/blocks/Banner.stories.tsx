import type { Meta, StoryObj } from '@storybook/react-vite';

import BannerExample from '../../examples/Banner.example';
import { Banner } from './Banner';

const meta = {
  title: 'Blocks/Banner',
  component: Banner,
  args: {
    children: 'Announcement text.',
    color: undefined,
    dismissLabel: 'Dismiss',
    onDismiss: undefined,
    action: undefined,
  },
  render: (args) => <Banner {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit children/color/onDismiss in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms. */
export const Example: Story = {
  render: () => <BannerExample />,
};

export const MessageOnly: Story = {
  args: { color: 'grass', children: 'Your account has been verified. Welcome aboard!' },
};

export const WithDismiss: Story = {
  args: {
    color: 'amber',
    children: 'Scheduled maintenance on Saturday, 02:00–04:00 UTC. Expect brief downtime.',
    onDismiss: () => {},
  },
};
