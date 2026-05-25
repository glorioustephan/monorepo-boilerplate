import { CheckboxGroup } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/CheckboxGroup',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CheckboxGroup.Root defaultValue={['1']} name="features">
      <CheckboxGroup.Item value="1">Fun</CheckboxGroup.Item>
      <CheckboxGroup.Item value="2">Serious</CheckboxGroup.Item>
      <CheckboxGroup.Item value="3">Smart</CheckboxGroup.Item>
    </CheckboxGroup.Root>
  ),
};
