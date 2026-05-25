import type { Meta, StoryObj } from '@storybook/react-vite';

import PaginationExample from '../../examples/Pagination.example';
import { Pagination } from './Pagination';

const meta = {
  title: 'Recipes/Pagination',
  component: Pagination,
  args: { page: 1, pageCount: 10, onPageChange: () => undefined },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PaginationExample />,
};

export const MiddlePage: Story = {
  args: { page: 5, pageCount: 10 },
};

export const FewPages: Story = {
  args: { page: 2, pageCount: 4 },
};
