import { Button } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react-vite";

import HeroExample from "../../examples/Hero.example";
import { Hero } from "./Hero";

const meta = {
  title: "Blocks/Hero",
  component: Hero,
  args: { title: "Hero" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HeroExample />,
};

export const LeftAligned: Story = {
  render: () => (
    <Hero
      align="left"
      title="Ship your next idea"
      description="Left-aligned hero for content-led pages."
      actions={<Button size="3">Start building</Button>}
    />
  ),
};
