import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from './page';

describe('HomePage', () => {
  it('renders the hero greeting and UI-kit call-to-action buttons', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /hello, monorepo/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Get started' }).length).toBeGreaterThan(0);
  });
});
