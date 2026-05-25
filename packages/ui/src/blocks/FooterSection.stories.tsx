import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../components';
import FooterSectionExample from '../../examples/FooterSection.example';
import { FooterSection } from './FooterSection';

const meta = {
  title: 'Blocks/FooterSection',
  component: FooterSection,
  args: {
    groups: [{ title: 'Links', links: [{ label: 'Home', href: '/' }] }],
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FooterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FooterSectionExample />,
};

export const NoBrand: Story = {
  render: () => (
    <FooterSection
      groups={[
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
      ]}
      bottom={
        <Text size="2" color="gray">
          &copy; {new Date().getFullYear()} Acme Inc.
        </Text>
      }
    />
  ),
};
