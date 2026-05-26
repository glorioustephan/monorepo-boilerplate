import { Avatar } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TestimonialSectionExample from '../../examples/TestimonialSection.example';
import { TestimonialSection } from './TestimonialSection';

const meta = {
  title: 'Blocks/TestimonialSection',
  component: TestimonialSection,
  args: {
    title: 'What our customers say',
    columns: { initial: '1', md: '2' },
    testimonials: [
      {
        id: 'alice',
        quote:
          'This kit saved us weeks of setup. The Radix Themes integration is seamless and the agent tooling is genuinely useful in day-to-day work.',
        authorName: 'Alice Hoffman',
        authorTitle: 'CTO, Shipfast',
        avatar: <Avatar fallback="AH" />,
        rating: 5,
      },
      {
        id: 'ben',
        quote:
          'The monorepo conventions kept our team aligned from day one. I especially appreciate the strict TypeScript config and the zero-config formatter.',
        authorName: 'Ben Torres',
        authorTitle: 'Lead Engineer, Acme Corp',
        avatar: <Avatar fallback="BT" />,
        rating: 4,
      },
      {
        id: 'chen',
        quote:
          'Storybook integration with the MCP catalog is a game-changer. Our designers and agents share the same vocabulary now.',
        authorName: 'Chen Wei',
        authorTitle: 'Product Designer, Launchpad',
        avatar: <Avatar fallback="CW" />,
        rating: 5,
      },
    ],
  },
  render: (args) => <TestimonialSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TestimonialSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title, columns, and testimonials in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <TestimonialSectionExample />,
};

export const SingleColumn: Story = {
  args: {
    title: 'From our users',
    columns: { initial: '1' },
    testimonials: [
      {
        id: 'dana',
        quote: 'The setup was remarkably smooth. Our team was productive within an hour.',
        authorName: 'Dana Park',
        authorTitle: 'Staff Engineer',
        rating: 5,
      },
      {
        id: 'eli',
        quote: 'Best monorepo starting point I have used. The lint rules catch real problems.',
        authorName: 'Eli Santos',
        rating: 4,
      },
    ],
  },
};
