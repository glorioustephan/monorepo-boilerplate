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
  render: (args) => <Breadcrumb {...args} />,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit items in the Controls panel. */
export const Default: Story = {};

/** Rich reference example composing the kit's atoms (mirrors the catalog example). */
export const Example: Story = {
  render: () => <BreadcrumbExample />,
};

export const SlashSeparator: Story = {
  args: {
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Breadcrumb' },
    ],
    separator: (
      <Text color="gray" aria-hidden>
        <SlashIcon />
      </Text>
    ),
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: 'Settings', href: '/settings' }, { label: 'Profile' }],
    separator: (
      <Text color="gray" aria-hidden>
        <ChevronRightIcon />
      </Text>
    ),
  },
};
