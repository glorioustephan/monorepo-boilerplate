import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { NewsletterSection } from './NewsletterSection';

describe('NewsletterSection', () => {
  it('renders the title', () => {
    renderWithTheme(<NewsletterSection title="Stay in the loop" />);
    expect(screen.getByRole('heading', { name: 'Stay in the loop' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    renderWithTheme(<NewsletterSection title="Newsletter" description="Get weekly updates." />);
    expect(screen.getByText('Get weekly updates.')).toBeInTheDocument();
  });

  it('renders the email input and submit button', () => {
    renderWithTheme(<NewsletterSection title="Newsletter" submitLabel="Join" />);
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument();
  });

  it('uses default placeholder and submit label', () => {
    renderWithTheme(<NewsletterSection />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', async () => {
    const onSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    });
    const { container } = renderWithTheme(
      <NewsletterSection title="Newsletter" onSubmit={onSubmit} />,
    );
    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
