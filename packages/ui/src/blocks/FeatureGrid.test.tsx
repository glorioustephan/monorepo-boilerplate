import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { FeatureGrid } from './FeatureGrid';

const features = [
  { title: 'Fast', description: 'Quick to build' },
  { title: 'Safe', description: 'Type-checked' },
];

describe('FeatureGrid', () => {
  it('renders a card per feature', () => {
    renderWithTheme(<FeatureGrid features={features} />);
    expect(screen.getByRole('heading', { name: 'Fast' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Safe' })).toBeInTheDocument();
    expect(screen.getByText('Quick to build')).toBeInTheDocument();
  });

  it('renders the split layout with media beside the feature list', () => {
    renderWithTheme(
      <FeatureGrid
        layout="split"
        features={features}
        media={<img alt="illustration" src="/illustration.png" />}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Fast' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Safe' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'illustration' })).toBeInTheDocument();
  });

  it('falls back to grid layout when layout=split but media is omitted', () => {
    renderWithTheme(<FeatureGrid layout="split" features={features} />);
    expect(screen.getByRole('heading', { name: 'Fast' })).toBeInTheDocument();
  });
});
