import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { BlogSection } from './BlogSection';

describe('BlogSection', () => {
  const posts = [
    {
      id: 'post-1',
      title: 'First Post',
      excerpt: 'A short excerpt about the first post.',
      category: 'Design',
      date: 'May 1, 2026',
    },
    {
      id: 'post-2',
      title: 'Second Post',
      excerpt: 'A short excerpt about the second post.',
      href: '/posts/second',
    },
  ];

  it('renders a card per post', () => {
    renderWithTheme(<BlogSection posts={posts} />);
    expect(screen.getByRole('heading', { name: 'First Post' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Second Post' })).toBeInTheDocument();
  });

  it('renders optional section title and description', () => {
    renderWithTheme(
      <BlogSection posts={posts} title="From the Blog" description="Our latest writing." />,
    );
    expect(screen.getByRole('heading', { name: 'From the Blog' })).toBeInTheDocument();
    expect(screen.getByText('Our latest writing.')).toBeInTheDocument();
  });

  it('renders category badge when provided', () => {
    renderWithTheme(<BlogSection posts={posts} />);
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('renders excerpt when provided', () => {
    renderWithTheme(<BlogSection posts={posts} />);
    expect(screen.getByText('A short excerpt about the first post.')).toBeInTheDocument();
  });

  it('renders an empty grid without crashing', () => {
    renderWithTheme(<BlogSection posts={[]} />);
  });
});
