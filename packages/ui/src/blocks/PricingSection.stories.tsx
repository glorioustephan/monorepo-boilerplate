import { Button } from '@monorepo-boilerplate/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

import PricingSectionExample from '../../examples/PricingSection.example';
import { PricingSection } from './PricingSection';

const meta = {
  title: 'Blocks/PricingSection',
  component: PricingSection,
  args: { tiers: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PricingSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PricingSectionExample />,
};

export const NoToggle: Story = {
  render: () => (
    <PricingSection
      title="One plan, one price"
      description="No billing toggle. Flat rate for everyone."
      tiers={[
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
      ]}
    />
  ),
};
