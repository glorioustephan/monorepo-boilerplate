import { ChevronRightIcon, SlashIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../components';
import BreadcrumbExample from '../../examples/Breadcrumb.example';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Recipes/Breadcrumb',
  component: Breadcrumb,
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current page' },
    ],
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BreadcrumbExample />,
};

export const SlashSeparator: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Docs', href: '/docs' },
        { label: 'Components', href: '/docs/components' },
        { label: 'Breadcrumb' },
      ]}
      separator={
        <Text color="gray" aria-hidden>
          <SlashIcon />
        </Text>
      }
    />
  ),
};

export const TwoLevels: Story = {
  render: () => (
    <Breadcrumb
      items={[{ label: 'Settings', href: '/settings' }, { label: 'Profile' }]}
      separator={
        <Text color="gray" aria-hidden>
          <ChevronRightIcon />
        </Text>
      }
    />
  ),
};
