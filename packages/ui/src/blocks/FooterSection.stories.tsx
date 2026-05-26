import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../components';
import FooterSectionExample from '../../examples/FooterSection.example';
import { FooterSection } from './FooterSection';

const meta = {
  title: 'Blocks/FooterSection',
  component: FooterSection,
  args: {
    groups: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Blog', href: '/blog' },
        ],
      },
    ],
    brand: undefined,
    bottom: (
      <Text size="2" color="gray">
        &copy; 2025 Acme Inc.
      </Text>
    ),
  },
  render: (args) => <FooterSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FooterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit groups/brand/bottom in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms. */
export const Example: Story = {
  render: () => <FooterSectionExample />,
};

export const NoBrand: Story = {
  args: {
    brand: undefined,
    bottom: (
      <Text size="2" color="gray">
        &copy; {new Date().getFullYear()} Acme Inc.
      </Text>
    ),
  },
};
