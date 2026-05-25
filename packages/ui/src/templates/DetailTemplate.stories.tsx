import type { Meta, StoryObj } from '@storybook/react-vite';

import DetailTemplateExample from '../../examples/DetailTemplate.example';

const meta = {
  title: 'Templates/DetailTemplate',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DetailTemplateExample />,
};
