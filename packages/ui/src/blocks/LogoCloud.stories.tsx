import {
  CubeIcon,
  FigmaLogoIcon,
  GitHubLogoIcon,
  NotionLogoIcon,
  VercelLogoIcon,
} from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import LogoCloudExample from '../../examples/LogoCloud.example';
import { LogoCloud } from './LogoCloud';

const meta = {
  title: 'Blocks/LogoCloud',
  component: LogoCloud,
  args: {
    title: 'Trusted by teams using',
    logos: [
      { id: 'vercel', logo: <VercelLogoIcon width={80} height={24} />, label: 'Vercel' },
      {
        id: 'github',
        logo: <GitHubLogoIcon width={80} height={24} />,
        label: 'GitHub',
        href: 'https://github.com',
      },
      { id: 'figma', logo: <FigmaLogoIcon width={80} height={24} />, label: 'Figma' },
      { id: 'notion', logo: <NotionLogoIcon width={80} height={24} />, label: 'Notion' },
      { id: 'cube', logo: <CubeIcon width={80} height={24} />, label: 'Cube' },
    ],
  },
  render: (args) => <LogoCloud {...args} />,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
} satisfies Meta<typeof LogoCloud>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title and logos in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <LogoCloudExample />,
};

export const NoTitle: Story = {
  args: {
    title: undefined,
    logos: [
      { id: 'vercel', logo: <VercelLogoIcon width={80} height={24} />, label: 'Vercel' },
      {
        id: 'github',
        logo: <GitHubLogoIcon width={80} height={24} />,
        label: 'GitHub',
        href: 'https://github.com',
      },
    ],
  },
};
