import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the title as a heading', () => {
    renderWithTheme(<Hero title="Welcome" />);
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument();
  });

  it('renders description and actions', () => {
    renderWithTheme(
      <Hero title="Welcome" description="Subtitle here" actions={<Button>Go</Button>} />,
    );
    expect(screen.getByText('Subtitle here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});
