import { Button } from '../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

import PageHeadingExample from '../../examples/PageHeading.example';
import { PageHeading } from './PageHeading';

const meta = {
  title: 'Recipes/PageHeading',
  component: PageHeading,
  args: { title: 'Page title' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PageHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageHeadingExample />,
};

export const TitleOnly: Story = {
  args: { title: 'Settings' },
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
