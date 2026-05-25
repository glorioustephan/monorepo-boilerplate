import type { Meta, StoryObj } from '@storybook/react-vite';

import ListPageTemplateExample from '../../examples/ListPageTemplate.example';

const meta = {
  title: 'Templates/ListPageTemplate',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ListPageTemplateExample />,
};
