import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextField } from '../components';
import { renderWithTheme } from '../test-utils';
import { Field } from './Field';

describe('Field', () => {
  it('associates the label with the control via htmlFor/id', () => {
    renderWithTheme(
      <Field label="Email" htmlFor="email">
        <TextField.Root />
      </Field>,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('wires aria-describedby and aria-invalid when an error is shown', () => {
    renderWithTheme(
      <Field label="Email" htmlFor="email" error="Required">
        <TextField.Root />
      </Field>,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.getAttribute('aria-describedby')).toContain('email-error');
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders description text', () => {
    renderWithTheme(
      <Field label="Name" htmlFor="name" description="Your full name">
        <TextField.Root />
      </Field>,
    );
    expect(screen.getByText('Your full name')).toBeInTheDocument();
  });
});
