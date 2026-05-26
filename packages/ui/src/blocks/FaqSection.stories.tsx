import type { Meta, StoryObj } from '@storybook/react-vite';

import FaqSectionExample from '../../examples/FaqSection.example';
import { FaqSection } from './FaqSection';

const meta = {
  title: 'Blocks/FaqSection',
  component: FaqSection,
  args: {
    title: 'Frequently asked questions',
    description: 'Everything you need to know about the product and billing.',
    items: [
      {
        id: 'trial',
        question: 'Do you offer a free trial?',
        answer:
          'Yes — every plan includes a 14-day free trial with no credit card required. You can upgrade, downgrade, or cancel at any time from your account settings.',
      },
      {
        id: 'billing',
        question: 'How does billing work?',
        answer:
          'You are billed monthly or annually depending on the plan you choose. Annual plans include a 20% discount.',
      },
      {
        id: 'seats',
        question: 'Can I add team members to my account?',
        answer:
          'Absolutely. All paid plans support multiple seats. You can invite teammates from the Members page in your dashboard.',
      },
      {
        id: 'data',
        question: 'What happens to my data if I cancel?',
        answer:
          'Your data remains accessible for 30 days after cancellation so you can export anything you need.',
      },
    ],
  },
  render: (args) => <FaqSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FaqSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title, description, and items in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <FaqSectionExample />,
};

export const NoTitle: Story = {
  args: {
    title: undefined,
    description: undefined,
    items: [
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
    ],
  },
};
