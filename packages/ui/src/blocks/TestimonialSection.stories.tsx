import type { Meta, StoryObj } from '@storybook/react-vite';

import TestimonialSectionExample from '../../examples/TestimonialSection.example';
import { TestimonialSection } from './TestimonialSection';

const meta = {
  title: 'Blocks/TestimonialSection',
  component: TestimonialSection,
  args: { testimonials: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TestimonialSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TestimonialSectionExample />,
};

export const SingleColumn: Story = {
  render: () => (
    <TestimonialSection
      title="From our users"
      columns={{ initial: '1' }}
      testimonials={[
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
      ]}
    />
  ),
};
