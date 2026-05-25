import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from '../components';
import { renderWithTheme } from '../test-utils';
import { TestimonialSection } from './TestimonialSection';

const TESTIMONIALS = [
  {
    id: 't1',
    quote: 'Absolutely fantastic product.',
    authorName: 'Jane Smith',
    authorTitle: 'CEO, Acme',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'Changed how our team works.',
    authorName: 'Bob Lee',
    avatar: <Avatar fallback="BL" />,
  },
] as const;

describe('TestimonialSection', () => {
  it('renders all quotes', () => {
    renderWithTheme(<TestimonialSection testimonials={TESTIMONIALS} />);
    expect(screen.getByText('Absolutely fantastic product.')).toBeInTheDocument();
    expect(screen.getByText('Changed how our team works.')).toBeInTheDocument();
  });

  it('renders author names and titles', () => {
    renderWithTheme(<TestimonialSection testimonials={TESTIMONIALS} />);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('CEO, Acme')).toBeInTheDocument();
    expect(screen.getByText('Bob Lee')).toBeInTheDocument();
  });

  it('renders an optional title heading', () => {
    renderWithTheme(<TestimonialSection testimonials={TESTIMONIALS} title="Our customers" />);
    expect(screen.getByRole('heading', { name: 'Our customers' })).toBeInTheDocument();
  });

  it('renders star glyphs for a rating', () => {
    renderWithTheme(<TestimonialSection testimonials={TESTIMONIALS} />);
    expect(screen.getByText('★★★★★')).toBeInTheDocument();
  });

  it('omits the title when not provided', () => {
    renderWithTheme(<TestimonialSection testimonials={TESTIMONIALS} />);
    expect(screen.queryByRole('heading')).toBeNull();
  });
});
