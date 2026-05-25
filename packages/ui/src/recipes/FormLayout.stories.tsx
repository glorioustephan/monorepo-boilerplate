import { TextField } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import FormLayoutExample from '../../examples/FormLayout.example';
import { Field } from './Field';
import { FormLayout } from './FormLayout';

const meta = {
  title: 'Recipes/FormLayout',
  component: FormLayout,
  args: {
    title: 'Section',
    children: (
      <Field label="Name" htmlFor="name">
        <TextField.Root />
      </Field>
    ),
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FormLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Two-column profile form with Save/Cancel footer. */
export const Default: Story = {
  render: () => <FormLayoutExample />,
};

/** Single-column stacked layout — useful for narrower side-panel forms. */
export const OneColumn: Story = {
  render: () => (
    <FormLayout
      title="Account"
      description="Manage your account settings."
      columns={1}
      footer={<button type="submit">Save</button>}
    >
      <Field label="Display name" htmlFor="display-name">
        <TextField.Root id="display-name" />
      </Field>
      <Field label="Bio" htmlFor="bio">
        <TextField.Root id="bio" />
      </Field>
    </FormLayout>
  ),
};
