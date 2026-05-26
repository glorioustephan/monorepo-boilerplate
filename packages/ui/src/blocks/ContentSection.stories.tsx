import { ImageIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ContentSectionExample from '../../examples/ContentSection.example';
import { ContentSection } from './ContentSection';

function MediaPlaceholder() {
  return (
    <div
      style={{
        background: 'var(--accent-3)',
        borderRadius: 12,
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ImageIcon width={48} height={48} />
    </div>
  );
}

const meta = {
  title: 'Blocks/ContentSection',
  component: ContentSection,
  args: {
    eyebrow: 'How it works',
    title: 'One monorepo, every layer covered',
    description:
      'From typed environment variables to a shared design system, every concern has a dedicated package with clear boundaries and zero runtime coupling.',
    layout: 'split',
    media: <MediaPlaceholder />,
  },
  render: (args) => <ContentSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit eyebrow, title, description, and layout (radio: stacked/split) in Controls. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <ContentSectionExample />,
};

export const Stacked: Story = {
  args: {
    eyebrow: 'Our mission',
    title: 'Built for teams that ship',
    description:
      'We believe great developer experience and production quality are not trade-offs. This boilerplate is the starting point we wish we had.',
    layout: 'stacked',
    media: undefined,
  },
};
