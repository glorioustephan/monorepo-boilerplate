import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../components';
import EmptyStateExample from '../../examples/EmptyState.example';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Recipes/EmptyState',
  component: EmptyState,
  args: { title: 'Nothing here yet' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EmptyStateExample />,
};

export const NoResults: Story = {
  render: () => (
    <EmptyState
      icon={<MagnifyingGlassIcon width={32} height={32} />}
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
      action={
        <Button variant="soft" onClick={() => undefined}>
          Clear filters
        </Button>
      }
    />
  ),
};

export const Minimal: Story = {
  render: () => <EmptyState title="No items" />,
};
