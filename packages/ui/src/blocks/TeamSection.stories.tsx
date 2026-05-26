import { Avatar } from '@monorepo-boilerplate/ui';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TeamSectionExample from '../../examples/TeamSection.example';
import { TeamSection } from './TeamSection';

const meta = {
  title: 'Blocks/TeamSection',
  component: TeamSection,
  args: {
    title: 'Meet the team',
    description: 'The people behind the boilerplate.',
    columns: { initial: '1', sm: '2', lg: '4' },
    members: [
      {
        id: 'alice',
        name: 'Alice Chen',
        role: 'Co-founder & CEO',
        avatar: <Avatar size="5" fallback="AC" radius="full" />,
        bio: 'Passionate about developer experience and open-source tooling.',
        socials: (
          <>
            <a href="https://twitter.com" aria-label="Twitter">
              <TwitterLogoIcon />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <LinkedInLogoIcon />
            </a>
          </>
        ),
      },
      {
        id: 'ben',
        name: 'Ben Okafor',
        role: 'CTO',
        avatar: <Avatar size="5" fallback="BO" radius="full" />,
        bio: 'Turborepo enthusiast. Lover of typed APIs and zero-runtime CSS.',
        socials: (
          <>
            <a href="https://github.com" aria-label="GitHub">
              <GitHubLogoIcon />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <TwitterLogoIcon />
            </a>
          </>
        ),
      },
      {
        id: 'cara',
        name: 'Cara Patel',
        role: 'Design Lead',
        avatar: <Avatar size="5" fallback="CP" radius="full" />,
        bio: 'Radix Themes contributor. Brings order to design systems.',
        socials: (
          <a href="https://twitter.com" aria-label="Twitter">
            <TwitterLogoIcon />
          </a>
        ),
      },
      {
        id: 'dan',
        name: 'Dan Müller',
        role: 'Platform Engineer',
        avatar: <Avatar size="5" fallback="DM" radius="full" />,
        bio: 'Keeps CI green and deployments boring.',
        socials: (
          <a href="https://github.com" aria-label="GitHub">
            <GitHubLogoIcon />
          </a>
        ),
      },
    ],
  },
  render: (args) => <TeamSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TeamSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title, description, columns, and members in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <TeamSectionExample />,
};

export const TwoColumn: Story = {
  args: {
    title: 'Leadership',
    description: 'The founders driving the vision.',
    columns: { initial: '1', sm: '2' },
    members: [
      {
        id: 'eve',
        name: 'Eve Torres',
        role: 'CEO',
        avatar: <Avatar size="5" fallback="ET" radius="full" />,
      },
      {
        id: 'frank',
        name: 'Frank Kim',
        role: 'CTO',
        avatar: <Avatar size="5" fallback="FK" radius="full" />,
      },
    ],
  },
};
