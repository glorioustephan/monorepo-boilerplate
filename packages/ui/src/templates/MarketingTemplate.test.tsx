import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { MarketingTemplate } from './MarketingTemplate';

describe('MarketingTemplate', () => {
  it('renders children in the body', () => {
    renderWithTheme(
      <MarketingTemplate>
        <p>Page body</p>
      </MarketingTemplate>,
    );
    expect(screen.getByText('Page body')).toBeInTheDocument();
  });

  it('renders the navbar slot', () => {
    renderWithTheme(
      <MarketingTemplate navbar={<nav aria-label="site-nav">Nav</nav>}>
        <p>Body</p>
      </MarketingTemplate>,
    );
    expect(screen.getByRole('navigation', { name: 'site-nav' })).toBeInTheDocument();
  });

  it('renders the footer slot', () => {
    renderWithTheme(
      <MarketingTemplate footer={<footer>Site footer</footer>}>
        <p>Body</p>
      </MarketingTemplate>,
    );
    expect(screen.getByText('Site footer')).toBeInTheDocument();
  });

  it('omits navbar and footer when not provided', () => {
    const { container } = renderWithTheme(
      <MarketingTemplate>
        <p>Body only</p>
      </MarketingTemplate>,
    );
    expect(container.querySelector('nav')).toBeNull();
    expect(container.querySelector('footer')).toBeNull();
  });
});
