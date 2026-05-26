import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../components';
import EmptyStateExample from '../../examples/EmptyState.example';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Recipes/EmptyState',
  component: EmptyState,
  args: {
    title: 'Nothing here yet',
    description: 'Get started by creating your first item.',
    icon: <MagnifyingGlassIcon width={32} height={32} />,
    action: <Button variant="soft">Get started</Button>,
  },
  render: (args) => <EmptyState {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title/description/icon/action in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <EmptyStateExample />,
};

export const NoResults: Story = {
  args: {
    icon: <MagnifyingGlassIcon width={32} height={32} />,
    title: 'No results found',
    description: "Try adjusting your search or filters to find what you're looking for.",
    action: (
      <Button variant="soft" onClick={() => {}}>
        Clear filters
      </Button>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: 'No items',
    description: undefined,
    icon: undefined,
    action: undefined,
  },
};
