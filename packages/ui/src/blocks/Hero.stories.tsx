import { Button } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import HeroExample from '../../examples/Hero.example';
import { Hero } from './Hero';

const meta = {
  title: 'Blocks/Hero',
  component: Hero,
  // Default args + a render that spreads them, so the Controls panel drives the component.
  // Controls are derived from HeroProps (title/description/align/layout) — nothing novel.
  args: {
    title: 'Build faster with the kit',
    description: 'A themable Radix Themes design system, agent-ready, in a single import.',
    align: 'center',
    layout: 'centered',
    actions: <Button size="3">Get started</Button>,
  },
  render: (args) => <Hero {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title/description/align/layout in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <HeroExample />,
};

export const LeftAligned: Story = {
  args: { align: 'left' },
};

export const Split: Story = {
  args: {
    layout: 'split',
    description: 'A split layout places your headline and actions beside a media element.',
    actions: (
      <>
        <Button size="3">Get started</Button>
        <Button size="3" variant="soft">
          Learn more
        </Button>
      </>
    ),
    media: <AspectRatioPlaceholder />,
  },
};

/** Inline placeholder — avoids importing an image in stories. */
function AspectRatioPlaceholder() {
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
