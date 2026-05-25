import type { Meta, StoryObj } from '@storybook/react-vite';

import FaqSectionExample from '../../examples/FaqSection.example';
import { FaqSection } from './FaqSection';

const meta = {
  title: 'Blocks/FaqSection',
  component: FaqSection,
  args: { items: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FaqSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FaqSectionExample />,
};

export const NoTitle: Story = {
  render: () => (
    <FaqSection
      items={[
        {
          id: 'trial',
          question: 'Do you offer a free trial?',
          answer: 'Yes — every plan includes a 14-day free trial with no credit card required.',
        },
        {
          id: 'billing',
          question: 'How does billing work?',
          answer:
            'You are billed monthly or annually depending on the plan you choose. Annual plans include a 20% discount.',
        },
        {
          id: 'cancel',
          question: 'Can I cancel at any time?',
          answer:
            'Yes. You can cancel your subscription at any time. There are no long-term contracts or cancellation fees.',
        },
      ]}
    />
  ),
};
