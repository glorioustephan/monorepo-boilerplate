import { Button } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SectionHeadingExample from '../../examples/SectionHeading.example';
import { SectionHeading } from './SectionHeading';

const meta = {
  title: 'Recipes/SectionHeading',
  component: SectionHeading,
  args: {
    title: 'Section title',
    description: 'An optional supporting description beneath the heading.',
    as: 'h2',
    actions: (
      <Button variant="soft" size="2">
        View all
      </Button>
    ),
  },
  render: (args) => <SectionHeading {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title/description/as/actions in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <SectionHeadingExample />,
};

export const NoDescription: Story = {
  args: {
    title: 'Recent activity',
    description: undefined,
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
