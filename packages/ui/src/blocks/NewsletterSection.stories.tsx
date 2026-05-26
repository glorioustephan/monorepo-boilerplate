import type { Meta, StoryObj } from '@storybook/react-vite';

import NewsletterSectionExample from '../../examples/NewsletterSection.example';
import { NewsletterSection } from './NewsletterSection';

const meta = {
  title: 'Blocks/NewsletterSection',
  component: NewsletterSection,
  args: {
    title: 'Stay in the loop',
    description:
      'Get the latest updates, articles, and resources delivered straight to your inbox.',
    placeholder: 'Enter your email',
    submitLabel: 'Subscribe',
    onSubmit: () => {},
  },
  render: (args) => <NewsletterSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof NewsletterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title, description, placeholder, and submitLabel in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <NewsletterSectionExample />,
};

export const MinimalNoDescription: Story = {
  args: {
    title: 'Subscribe to our newsletter',
    description: undefined,
    submitLabel: 'Join now',
  },
};
