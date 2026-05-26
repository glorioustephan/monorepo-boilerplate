import type { Meta, StoryObj } from '@storybook/react-vite';

import PaginationExample from '../../examples/Pagination.example';
import { Pagination } from './Pagination';

const meta = {
  title: 'Recipes/Pagination',
  component: Pagination,
  args: { page: 1, pageCount: 10, onPageChange: () => {} },
  render: (args) => <Pagination {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit page/pageCount in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <PaginationExample />,
};

export const MiddlePage: Story = {
  args: { page: 5, pageCount: 10 },
};

export const FewPages: Story = {
  args: { page: 2, pageCount: 4 },
};
