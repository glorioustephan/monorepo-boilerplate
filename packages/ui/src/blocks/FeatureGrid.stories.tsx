import type { Meta, StoryObj } from '@storybook/react-vite';

import FeatureGridExample from '../../examples/FeatureGrid.example';
import { FeatureGrid } from './FeatureGrid';

const meta = {
  title: 'Blocks/FeatureGrid',
  component: FeatureGrid,
  args: { features: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FeatureGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FeatureGridExample />,
};

const features = [
  { title: 'Themable', description: 'Switch accent, gray, radius, and scaling at runtime.' },
  { title: 'Agent-ready', description: 'An MCP catalog exposes every component to tooling.' },
  { title: 'Type-safe', description: 'Strict TypeScript and source-consumed HMR across packages.' },
];

export const Split: Story = {
  render: () => <FeatureGrid layout="split" features={features} media={<MediaPlaceholder />} />,
};

/** Inline placeholder — avoids importing an image in stories. */
function MediaPlaceholder() {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: 'var(--radius-3)',
        background: 'var(--accent-a3)',
      }}
    />
  );
}
