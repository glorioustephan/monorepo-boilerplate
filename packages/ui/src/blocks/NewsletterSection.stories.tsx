import type { Meta, StoryObj } from '@storybook/react-vite';

import NewsletterSectionExample from '../../examples/NewsletterSection.example';
import { NewsletterSection } from './NewsletterSection';

const meta = {
  title: 'Blocks/NewsletterSection',
  component: NewsletterSection,
  args: { title: 'NewsletterSection' },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof NewsletterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NewsletterSectionExample />,
};

export const MinimalNoDescription: Story = {
  render: () => (
    <NewsletterSection
      title="Subscribe to our newsletter"
      submitLabel="Join now"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    />
  ),
};
