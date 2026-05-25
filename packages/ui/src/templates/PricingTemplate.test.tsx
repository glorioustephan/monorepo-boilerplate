import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { PricingTemplate } from './PricingTemplate';

describe('PricingTemplate', () => {
  it('renders the pricing slot', () => {
    renderWithTheme(
      <PricingTemplate pricing={<section aria-label="pricing">Pricing grid</section>} />,
    );
    expect(screen.getByRole('region', { name: 'pricing' })).toBeInTheDocument();
  });

  it('renders the title and description intro', () => {
    renderWithTheme(
      <PricingTemplate
        title="Simple pricing"
        description="No hidden fees."
        pricing={<div>Tiers</div>}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Simple pricing' })).toBeInTheDocument();
    expect(screen.getByText('No hidden fees.')).toBeInTheDocument();
  });

  it('renders navbar, faq, cta, and footer slots', () => {
    renderWithTheme(
      <PricingTemplate
        navbar={<nav aria-label="site-nav">Nav</nav>}
        pricing={<div>Tiers</div>}
        faq={<section aria-label="faq">FAQ</section>}
        cta={<section aria-label="cta">CTA</section>}
        footer={<footer>Footer</footer>}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'site-nav' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'faq' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'cta' })).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('omits intro heading when title and description are absent', () => {
    const { container } = renderWithTheme(<PricingTemplate pricing={<div>Tiers</div>} />);
    expect(container.querySelector('h1')).toBeNull();
  });
});
