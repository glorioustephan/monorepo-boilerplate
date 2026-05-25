import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders the message content', () => {
    renderWithTheme(<Banner>Product update available.</Banner>);
    expect(screen.getByText('Product update available.')).toBeInTheDocument();
  });

  it('renders the action slot when provided', () => {
    renderWithTheme(<Banner action={<a href="/learn">Learn more</a>}>Announcement.</Banner>);
    expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument();
  });

  it('renders a dismiss button when onDismiss is provided', () => {
    renderWithTheme(<Banner onDismiss={() => undefined}>Announcement.</Banner>);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('calls onDismiss when the dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    renderWithTheme(<Banner onDismiss={onDismiss}>Announcement.</Banner>);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('does not render a dismiss button when onDismiss is omitted', () => {
    renderWithTheme(<Banner>Announcement.</Banner>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('uses a custom dismissLabel for the button aria-label', () => {
    renderWithTheme(
      <Banner onDismiss={() => undefined} dismissLabel="Close banner">
        Announcement.
      </Banner>,
    );
    expect(screen.getByRole('button', { name: 'Close banner' })).toBeInTheDocument();
  });

  it('renders a custom dismissIcon', () => {
    renderWithTheme(
      <Banner onDismiss={() => undefined} dismissIcon={<svg data-testid="x-icon" />}>
        Announcement.
      </Banner>,
    );
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
  });
});
