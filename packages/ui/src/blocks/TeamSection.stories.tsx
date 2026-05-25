import { Avatar } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TeamSectionExample from '../../examples/TeamSection.example';
import { TeamSection } from './TeamSection';

const meta = {
  title: 'Blocks/TeamSection',
  component: TeamSection,
  args: { members: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TeamSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TeamSectionExample />,
};

export const TwoColumn: Story = {
  render: () => (
    <TeamSection
      title="Leadership"
      description="The founders driving the vision."
      columns={{ initial: '1', sm: '2' }}
      members={[
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
      ]}
    />
  ),
};
