import { Button } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react-vite";

import ConfirmDialogExample from "../../examples/ConfirmDialog.example";
import { ConfirmDialog } from "./ConfirmDialog";

const meta = {
  title: "Recipes/ConfirmDialog",
  component: ConfirmDialog,
  args: { trigger: <Button>Delete</Button>, title: "Delete?" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ConfirmDialogExample />,
};
