import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { PricingSection, type PricingPeriod, type PricingTier } from './PricingSection';

const periods: readonly PricingPeriod[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual' },
];

const tiers: readonly PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individuals getting started.',
    price: { monthly: '$9', annual: '$7' },
    priceSuffix: '/ month',
    features: ['5 projects', 'Email support'],
    cta: <Button>Get started</Button>,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams.',
    price: { monthly: '$29', annual: '$23' },
    priceSuffix: '/ month',
    features: ['Unlimited projects', 'Priority support'],
    cta: <Button>Start trial</Button>,
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Dedicated infrastructure.',
    price: { monthly: '$99', annual: '$79' },
    priceSuffix: '/ month',
    features: ['SSO & SAML', 'SLA guarantee'],
    cta: <Button>Contact sales</Button>,
  },
];

describe('PricingSection', () => {
  it('renders all tier names', () => {
    renderWithTheme(<PricingSection tiers={tiers} />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders the default (monthly) price for each tier', () => {
    renderWithTheme(<PricingSection tiers={tiers} periods={periods} />);
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('renders feature lists for each tier', () => {
    renderWithTheme(<PricingSection tiers={tiers} />);
    expect(screen.getByText('5 projects')).toBeInTheDocument();
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument();
    expect(screen.getByText('SSO & SAML')).toBeInTheDocument();
  });

  it('switches displayed price when the billing toggle changes', () => {
    renderWithTheme(<PricingSection tiers={tiers} periods={periods} />);

    // Monthly prices visible initially.
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();

    const annualButton = screen.getByRole('radio', { name: 'Annual' });
    fireEvent.click(annualButton);

    // Annual prices now visible.
    expect(screen.getByText('$7')).toBeInTheDocument();
    expect(screen.getByText('$23')).toBeInTheDocument();
    expect(screen.getByText('$79')).toBeInTheDocument();

    // Monthly prices gone.
    expect(screen.queryByText('$9')).not.toBeInTheDocument();
  });

  it('shows the Popular badge on the highlighted tier', () => {
    renderWithTheme(<PricingSection tiers={tiers} />);
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('does not show Popular badge on non-highlighted tiers', () => {
    const flatTiers: readonly PricingTier[] = [
      {
        id: 'basic',
        name: 'Basic',
        price: '$5',
        features: ['1 project'],
        cta: <Button>Sign up</Button>,
      },
    ];
    renderWithTheme(<PricingSection tiers={flatTiers} />);
    expect(screen.queryByText('Popular')).not.toBeInTheDocument();
  });

  it('renders title and description when provided', () => {
    renderWithTheme(
      <PricingSection
        tiers={tiers}
        title="Our pricing"
        description="Choose the plan that fits your needs."
      />,
    );
    expect(screen.getByRole('heading', { name: 'Our pricing' })).toBeInTheDocument();
    expect(screen.getByText('Choose the plan that fits your needs.')).toBeInTheDocument();
  });

  it('does not render the toggle when fewer than 2 periods are supplied', () => {
    renderWithTheme(
      <PricingSection tiers={tiers} periods={[{ id: 'monthly', label: 'Monthly' }]} />,
    );
    expect(screen.queryByRole('radio', { name: 'Monthly' })).not.toBeInTheDocument();
  });

  it('renders a flat (non-record) price unchanged regardless of selected period', () => {
    const flatTier: PricingTier = {
      id: 'custom',
      name: 'Custom',
      price: 'Contact us',
      features: ['Everything'],
      cta: <Button>Talk to us</Button>,
    };
    renderWithTheme(<PricingSection tiers={[flatTier]} periods={periods} />);
    expect(screen.getByText('Contact us')).toBeInTheDocument();

    const annualButton = screen.getByRole('radio', { name: 'Annual' });
    fireEvent.click(annualButton);

    expect(screen.getByText('Contact us')).toBeInTheDocument();
  });
});
