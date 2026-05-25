import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { FooterSection } from './FooterSection';

const groups = [
  {
    title: 'Solutions',
    links: [
      { label: 'Analytics', href: '/analytics' },
      { label: 'Automation', href: '/automation' },
    ],
  },
  {
    title: 'Company',
    links: [{ label: 'About', href: '/about' }],
  },
] as const;

describe('FooterSection', () => {
  it('renders group headings', () => {
    renderWithTheme(<FooterSection groups={groups} />);
    expect(screen.getByRole('heading', { name: 'Solutions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Company' })).toBeInTheDocument();
  });

  it('renders group links', () => {
    renderWithTheme(<FooterSection groups={groups} />);
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('renders brand slot', () => {
    renderWithTheme(<FooterSection groups={groups} brand={<span>Acme</span>} />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
  });

  it('renders bottom slot', () => {
    renderWithTheme(<FooterSection groups={groups} bottom={<span>Copyright 2025</span>} />);
    expect(screen.getByText('Copyright 2025')).toBeInTheDocument();
  });

  it('omits the separator when no bottom is provided', () => {
    const { container } = renderWithTheme(<FooterSection groups={groups} />);
    // Radix Separator renders as <hr>
    expect(container.querySelector('hr')).toBeNull();
  });
});
