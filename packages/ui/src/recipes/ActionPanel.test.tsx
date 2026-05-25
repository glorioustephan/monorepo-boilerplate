import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { ActionPanel } from './ActionPanel';

describe('ActionPanel', () => {
  it('renders the title', () => {
    renderWithTheme(<ActionPanel title="Delete account" />);
    expect(screen.getByRole('heading', { name: 'Delete account' })).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    renderWithTheme(
      <ActionPanel title="Delete account" description="This action cannot be undone." />,
    );
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
  });

  it('omits the description when not provided', () => {
    renderWithTheme(<ActionPanel title="Delete account" />);
    expect(screen.queryByText(/cannot/)).not.toBeInTheDocument();
  });

  it('renders the action slot when provided', () => {
    renderWithTheme(
      <ActionPanel title="Delete account" action={<Button color="red">Delete</Button>} />,
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('omits the action slot when not provided', () => {
    renderWithTheme(<ActionPanel title="Delete account" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a ReactNode title', () => {
    renderWithTheme(<ActionPanel title={<span data-testid="rich-title">Rich title</span>} />);
    expect(screen.getByTestId('rich-title')).toBeInTheDocument();
  });
});
