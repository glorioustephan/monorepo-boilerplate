import { Button } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SectionHeadingExample from '../../examples/SectionHeading.example';
import { SectionHeading } from './SectionHeading';

const meta = {
  title: 'Recipes/SectionHeading',
  component: SectionHeading,
  args: { title: 'Section title' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SectionHeadingExample />,
};

export const NoDescription: Story = {
  args: {
    title: 'Recent activity',
    actions: (
      <Button variant="soft" size="2">
        View all
      </Button>
    ),
  },
};

export const H3Subsection: Story = {
  args: {
    title: 'Linked accounts',
    description: 'Connected OAuth providers for this user.',
    as: 'h3',
  },
};
