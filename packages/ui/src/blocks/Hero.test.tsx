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

  it('renders the split layout with media', () => {
    renderWithTheme(
      <Hero
        layout="split"
        title="Split Hero"
        description="Side by side"
        actions={<Button>Act</Button>}
        media={<img alt="placeholder" src="/placeholder.png" />}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Split Hero' })).toBeInTheDocument();
    expect(screen.getByText('Side by side')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Act' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'placeholder' })).toBeInTheDocument();
  });

  it('falls back to centered layout when layout=split but media is omitted', () => {
    renderWithTheme(<Hero layout="split" title="No Media" />);
    expect(screen.getByRole('heading', { name: 'No Media' })).toBeInTheDocument();
  });
});
