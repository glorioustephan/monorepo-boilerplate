import { Button } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import PricingSectionExample from '../../examples/PricingSection.example';
import { PricingSection } from './PricingSection';

const meta = {
  title: 'Blocks/PricingSection',
  component: PricingSection,
  args: {
    title: 'Simple, transparent pricing',
    description: "Start free. Upgrade when you're ready. No hidden fees.",
    periods: [
      { id: 'monthly', label: 'Monthly' },
      { id: 'annual', label: 'Annual' },
    ],
    defaultPeriodId: 'monthly',
    onPeriodChange: () => {},
    columns: { initial: '1', md: '3' },
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Everything you need to get started.',
        price: { monthly: '$9', annual: '$7' },
        priceSuffix: '/ month',
        features: ['5 projects', '10 GB storage', 'Basic analytics', 'Email support'],
        cta: (
          <Button variant="outline" size="3" style={{ width: '100%' }}>
            Get started
          </Button>
        ),
      },
      {
        id: 'pro',
        name: 'Pro',
        description: 'For growing teams that need more power.',
        price: { monthly: '$29', annual: '$23' },
        priceSuffix: '/ month',
        features: [
          'Unlimited projects',
          '100 GB storage',
          'Advanced analytics',
          'Priority support',
          'Custom integrations',
        ],
        cta: (
          <Button variant="solid" size="3" style={{ width: '100%' }}>
            Start free trial
          </Button>
        ),
        highlighted: true,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Dedicated infrastructure and white-glove onboarding.',
        price: { monthly: '$99', annual: '$79' },
        priceSuffix: '/ month',
        features: [
          'Unlimited projects',
          '1 TB storage',
          'Enterprise analytics',
          'Dedicated account manager',
          'SSO & SAML',
          'SLA guarantee',
        ],
        cta: (
          <Button variant="outline" size="3" style={{ width: '100%' }}>
            Contact sales
          </Button>
        ),
      },
    ],
  },
  render: (args) => <PricingSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PricingSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title, description, tiers, and periods in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <PricingSectionExample />,
};

export const NoToggle: Story = {
  args: {
    periods: undefined,
    title: 'One plan, one price',
    description: 'No billing toggle. Flat rate for everyone.',
    tiers: [
      {
        id: 'solo',
        name: 'Solo',
        description: 'Perfect for individual makers.',
        price: '$19',
        priceSuffix: '/ month',
        features: ['10 projects', '20 GB storage', 'Community support'],
        cta: (
          <Button variant="solid" size="3" style={{ width: '100%' }}>
            Get started
          </Button>
        ),
      },
      {
        id: 'team',
        name: 'Team',
        description: 'Built for small and growing teams.',
        price: '$49',
        priceSuffix: '/ month',
        features: ['Unlimited projects', '100 GB storage', 'Email support', 'Team dashboard'],
        cta: (
          <Button variant="solid" size="3" style={{ width: '100%' }}>
            Start free trial
          </Button>
        ),
        highlighted: true,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Custom contracts and dedicated support.',
        price: 'Custom',
        features: ['Everything in Team', 'SSO & SAML', 'Dedicated CSM', 'SLA guarantee'],
        cta: (
          <Button variant="outline" size="3" style={{ width: '100%' }}>
            Contact sales
          </Button>
        ),
      },
    ],
  },
};
