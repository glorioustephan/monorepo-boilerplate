import { RadioGroup } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Forms/RadioGroup',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="1" name="plan">
      <RadioGroup.Item value="1">Free</RadioGroup.Item>
      <RadioGroup.Item value="2">Pro</RadioGroup.Item>
      <RadioGroup.Item value="3">Enterprise</RadioGroup.Item>
    </RadioGroup.Root>
  ),
};
