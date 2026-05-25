import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { SignInForm } from './SignInForm';

describe('SignInForm', () => {
  it('renders email and password fields', () => {
    renderWithTheme(<SignInForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderWithTheme(<SignInForm submitLabel="Sign in" />);
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('fires onSubmit when the form is submitted', () => {
    const onSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    });
    renderWithTheme(<SignInForm onSubmit={onSubmit} />);
    const form = screen.getByRole('button', { name: 'Sign in' }).closest('form') as HTMLFormElement;
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('renders the custom title', () => {
    renderWithTheme(<SignInForm title="Welcome back" />);
    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  });

  it('renders the oauth slot when provided', () => {
    renderWithTheme(<SignInForm oauth={<button type="button">GitHub</button>} />);
    expect(screen.getByRole('button', { name: 'GitHub' })).toBeInTheDocument();
  });
});
