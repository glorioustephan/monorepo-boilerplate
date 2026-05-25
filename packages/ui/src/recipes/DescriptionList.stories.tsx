import type { Meta, StoryObj } from '@storybook/react-vite';

import DescriptionListExample from '../../examples/DescriptionList.example';
import { DescriptionList } from './DescriptionList';

const meta = {
  title: 'Recipes/DescriptionList',
  component: DescriptionList,
  args: { items: [{ term: 'Key', value: 'Value' }] },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DescriptionListExample />,
};

export const Vertical: Story = {
  render: () => (
    <DescriptionList
      orientation="vertical"
      items={[
        { term: 'Full name', value: 'Alex Johnson' },
        { term: 'Email', value: 'alex.johnson@example.com' },
        { term: 'Title', value: 'Senior Product Designer' },
        { term: 'Role', value: 'Admin' },
      ]}
    />
  ),
};
