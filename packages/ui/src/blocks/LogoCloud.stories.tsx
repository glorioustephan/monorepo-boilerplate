import { GitHubLogoIcon, VercelLogoIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import LogoCloudExample from '../../examples/LogoCloud.example';
import { LogoCloud } from './LogoCloud';

const meta = {
  title: 'Blocks/LogoCloud',
  component: LogoCloud,
  args: { logos: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LogoCloud>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LogoCloudExample />,
};

export const NoTitle: Story = {
  render: () => (
    <LogoCloud
      logos={[
        { id: 'vercel', logo: <VercelLogoIcon width={80} height={24} />, label: 'Vercel' },
        {
          id: 'github',
          logo: <GitHubLogoIcon width={80} height={24} />,
          label: 'GitHub',
          href: 'https://github.com',
        },
      ]}
    />
  ),
};
