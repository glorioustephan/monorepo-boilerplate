import type { Meta, StoryObj } from '@storybook/react-vite';

import DescriptionListExample from '../../examples/DescriptionList.example';
import { DescriptionList } from './DescriptionList';

const meta = {
  title: 'Recipes/DescriptionList',
  component: DescriptionList,
  args: {
    orientation: 'horizontal',
    items: [
      { term: 'Full name', value: 'Alex Johnson' },
      { term: 'Email', value: 'alex.johnson@example.com' },
      { term: 'Title', value: 'Senior Product Designer' },
      { term: 'Role', value: 'Admin' },
    ],
  },
  render: (args) => <DescriptionList {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit orientation/items in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <DescriptionListExample />,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    items: [
      { term: 'Full name', value: 'Alex Johnson' },
      { term: 'Email', value: 'alex.johnson@example.com' },
      { term: 'Title', value: 'Senior Product Designer' },
      { term: 'Role', value: 'Admin' },
    ],
  },
};
