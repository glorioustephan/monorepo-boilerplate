import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { ContentSection } from './ContentSection';

describe('ContentSection', () => {
  it('renders eyebrow, title, and description', () => {
    renderWithTheme(
      <ContentSection
        eyebrow="How it works"
        title="One monorepo, every layer"
        description="Clear boundaries and zero runtime coupling."
      />,
    );
    expect(screen.getByText('How it works')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'One monorepo, every layer' })).toBeInTheDocument();
    expect(screen.getByText('Clear boundaries and zero runtime coupling.')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderWithTheme(
      <ContentSection title="Title">
        <p>Rich body content</p>
      </ContentSection>,
    );
    expect(screen.getByText('Rich body content')).toBeInTheDocument();
  });

  it('renders media slot in stacked layout', () => {
    renderWithTheme(
      <ContentSection title="Title" media={<div>Media placeholder</div>} layout="stacked" />,
    );
    expect(screen.getByText('Media placeholder')).toBeInTheDocument();
  });

  it('renders media slot in split layout', () => {
    renderWithTheme(<ContentSection title="Title" media={<div>Split media</div>} layout="split" />);
    expect(screen.getByText('Split media')).toBeInTheDocument();
  });

  it('renders without crashing when all props are omitted', () => {
    renderWithTheme(<ContentSection />);
  });
});
