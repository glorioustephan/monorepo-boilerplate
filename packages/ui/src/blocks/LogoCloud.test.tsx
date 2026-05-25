import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { LogoCloud } from './LogoCloud';

const LOGOS = [
  { id: 'alpha', logo: <span>Alpha</span>, label: 'Alpha Co' },
  { id: 'beta', logo: <span>Beta</span>, label: 'Beta Inc', href: 'https://beta.example' },
  { id: 'gamma', logo: <span>Gamma</span> },
] as const;

describe('LogoCloud', () => {
  it('renders all logo slots', () => {
    renderWithTheme(<LogoCloud logos={LOGOS} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('wraps a logo in a link when href is provided', () => {
    renderWithTheme(<LogoCloud logos={LOGOS} />);
    const link = screen.getByRole('link', { name: 'Beta Inc' });
    expect(link).toHaveAttribute('href', 'https://beta.example');
  });

  it('renders the optional title', () => {
    renderWithTheme(<LogoCloud logos={LOGOS} title="Trusted by" />);
    expect(screen.getByText('Trusted by')).toBeInTheDocument();
  });

  it('omits the title when not provided', () => {
    renderWithTheme(<LogoCloud logos={LOGOS} />);
    expect(screen.queryByText('Trusted by')).toBeNull();
  });
});
