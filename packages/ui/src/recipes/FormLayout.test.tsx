import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextField } from '../components';
import { renderWithTheme } from '../test-utils';
import { Field } from './Field';
import { FormLayout } from './FormLayout';

describe('FormLayout', () => {
  it('renders the section title and description', () => {
    renderWithTheme(
      <FormLayout title="Profile" description="Update your info." columns={1}>
        <Field label="Name" htmlFor="name">
          <TextField.Root />
        </Field>
      </FormLayout>,
    );
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByText('Update your info.')).toBeInTheDocument();
  });

  it('renders field children', () => {
    renderWithTheme(
      <FormLayout columns={2}>
        <Field label="First name" htmlFor="first-name">
          <TextField.Root id="first-name" />
        </Field>
        <Field label="Last name" htmlFor="last-name">
          <TextField.Root id="last-name" />
        </Field>
      </FormLayout>,
    );
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
  });

  it('renders the footer action slot', () => {
    renderWithTheme(
      <FormLayout footer={<button type="submit">Save changes</button>}>
        <Field label="Email" htmlFor="email">
          <TextField.Root />
        </Field>
      </FormLayout>,
    );
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });
});
