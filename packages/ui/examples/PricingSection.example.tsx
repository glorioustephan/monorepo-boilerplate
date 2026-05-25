import {
  Button,
  PricingSection,
  type PricingPeriod,
  type PricingTier,
} from '@monorepo-boilerplate/ui';

const periods: readonly PricingPeriod[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual' },
];

const tiers: readonly PricingTier[] = [
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
];

/** PricingSection with three tiers and a monthly/annual billing toggle. */
export default function PricingSectionExample() {
  return (
    <PricingSection
      title="Simple, transparent pricing"
      description="Start free. Upgrade when you're ready. No hidden fees."
      periods={periods}
      tiers={tiers}
    />
  );
}
