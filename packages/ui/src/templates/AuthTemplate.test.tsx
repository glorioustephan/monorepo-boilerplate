import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { SignInForm } from '../recipes/SignInForm';
import { AuthTemplate } from './AuthTemplate';

describe('AuthTemplate', () => {
  it('renders children centered in a full-screen wrapper', () => {
    renderWithTheme(
      <AuthTemplate>
        <SignInForm />
      </AuthTemplate>,
    );
    // SignInForm renders the default heading — confirms children are mounted
    expect(screen.getByRole('heading', { name: 'Sign in to your account' })).toBeInTheDocument();
  });

  it('renders the aside slot when provided', () => {
    renderWithTheme(
      <AuthTemplate aside={<div>Promo panel</div>}>
        <SignInForm />
      </AuthTemplate>,
    );
    expect(screen.getByText('Promo panel')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sign in to your account' })).toBeInTheDocument();
  });
});
