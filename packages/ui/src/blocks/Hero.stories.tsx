import { Button } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import HeroExample from '../../examples/Hero.example';
import { Hero } from './Hero';

const meta = {
  title: 'Blocks/Hero',
  component: Hero,
  args: { title: 'Hero' },
  parameters: { layout: 'fullscreen' },
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

export const Split: Story = {
  render: () => (
    <Hero
      layout="split"
      title="Ship your next idea"
      description="A split layout places your headline and actions beside a media element."
      actions={
        <>
          <Button size="3">Get started</Button>
          <Button size="3" variant="soft">
            Learn more
          </Button>
        </>
      }
      media={<AspectRatioPlaceholder />}
    />
  ),
};

/** Inline placeholder — avoids importing an image in stories. */
function AspectRatioPlaceholder() {
  // Box with a fixed aspect ratio using Radix props only (no Tailwind color).
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: 'var(--radius-3)',
        background: 'var(--accent-a3)',
      }}
    />
  );
}
