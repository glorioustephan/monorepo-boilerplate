import { TextField } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react-vite";

import FieldExample from "../../examples/Field.example";
import { Field } from "./Field";

const meta = {
  title: "Recipes/Field",
  component: Field,
  args: { label: "Email", htmlFor: "email", children: <TextField.Root /> },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FieldExample />,
};

export const WithError: Story = {
  render: () => (
    <Field label="Email" htmlFor="email-error" error="Enter a valid email address." required>
      <TextField.Root type="email" defaultValue="not-an-email" />
    </Field>
  ),
};
