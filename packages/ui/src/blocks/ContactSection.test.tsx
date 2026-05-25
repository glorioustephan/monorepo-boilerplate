import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  it('renders the title', () => {
    renderWithTheme(<ContactSection title="Get in touch" />);
    expect(screen.getByRole('heading', { name: 'Get in touch' })).toBeInTheDocument();
  });

  it('renders name, email, and message fields', () => {
    renderWithTheme(<ContactSection />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders the default submit label', () => {
    renderWithTheme(<ContactSection />);
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument();
  });

  it('renders a custom submit label', () => {
    renderWithTheme(<ContactSection submitLabel="Submit" />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders the aside slot in side-by-side layout', () => {
    renderWithTheme(<ContactSection title="Contact" aside={<span>Contact details panel</span>} />);
    expect(screen.getByText('Contact details panel')).toBeInTheDocument();
    // Form fields still present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    });
    const { container } = renderWithTheme(<ContactSection onSubmit={onSubmit} />);
    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
