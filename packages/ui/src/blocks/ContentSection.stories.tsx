import type { Meta, StoryObj } from '@storybook/react-vite';

import ContentSectionExample from '../../examples/ContentSection.example';
import { ContentSection } from './ContentSection';

const meta = {
  title: 'Blocks/ContentSection',
  component: ContentSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ContentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ContentSectionExample />,
};

export const Stacked: Story = {
  render: () => (
    <ContentSection
      eyebrow="Our mission"
      title="Built for teams that ship"
      description="We believe great developer experience and production quality are not trade-offs. This boilerplate is the starting point we wish we had."
      layout="stacked"
    />
  ),
};
