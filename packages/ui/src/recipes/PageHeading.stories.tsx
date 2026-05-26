import { Button } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import PageHeadingExample from '../../examples/PageHeading.example';
import { PageHeading } from './PageHeading';

const meta = {
  title: 'Recipes/PageHeading',
  component: PageHeading,
  args: {
    title: 'Page title',
    description: 'A supporting description for this page.',
    actions: (
      <>
        <Button variant="soft">Filter</Button>
        <Button>Deploy now</Button>
      </>
    ),
  },
  render: (args) => <PageHeading {...args} />,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
} satisfies Meta<typeof PageHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title/description/actions in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <PageHeadingExample />,
};

export const TitleOnly: Story = {
  args: {
    title: 'Settings',
    description: undefined,
    actions: undefined,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Deployments',
    description: 'View and manage your recent deployment history.',
    actions: (
      <>
        <Button variant="soft">Filter</Button>
        <Button>Deploy now</Button>
      </>
    ),
  },
};
