import { LightningBoltIcon, LockClosedIcon, MixIcon, RocketIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BentoGridExample from '../../examples/BentoGrid.example';
import { BentoGrid } from './BentoGrid';

function MediaBox({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: accent,
        borderRadius: 8,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: 'Blocks/BentoGrid',
  component: BentoGrid,
  args: {
    items: [
      {
        id: 'bento-1',
        title: 'Ship Faster',
        description: 'Turborepo remote caching cuts CI time by up to 80% across all packages.',
        media: (
          <MediaBox accent="var(--accent-3)">
            <RocketIcon width={36} height={36} />
          </MediaBox>
        ),
        colSpan: 2,
      },
      {
        id: 'bento-2',
        title: 'Type-Safe by Default',
        description: 'Strict TypeScript with noUncheckedIndexedAccess across every workspace.',
        media: (
          <MediaBox accent="var(--accent-4)">
            <LightningBoltIcon width={36} height={36} />
          </MediaBox>
        ),
      },
      {
        id: 'bento-3',
        title: 'Radix Design System',
        description: 'A single vocabulary of accessible, themeable components.',
        media: (
          <MediaBox accent="var(--accent-5)">
            <MixIcon width={36} height={36} />
          </MediaBox>
        ),
        rowSpan: 2,
      },
      {
        id: 'bento-4',
        title: 'Secure by Construction',
        description:
          'Env validation, signed sessions, and closed-fail webhook guards out of the box.',
        media: (
          <MediaBox accent="var(--accent-6)">
            <LockClosedIcon width={36} height={36} />
          </MediaBox>
        ),
      },
    ],
  },
  render: (args) => <BentoGrid {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BentoGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit items in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <BentoGridExample />,
};

export const Uniform: Story = {
  args: {
    items: [
      { id: 'u1', title: 'Alpha', description: 'First feature of the product.' },
      { id: 'u2', title: 'Beta', description: 'Second feature of the product.' },
      { id: 'u3', title: 'Gamma', description: 'Third feature of the product.' },
      { id: 'u4', title: 'Delta', description: 'Fourth feature of the product.' },
      { id: 'u5', title: 'Epsilon', description: 'Fifth feature of the product.' },
      { id: 'u6', title: 'Zeta', description: 'Sixth feature of the product.' },
    ],
  },
};
