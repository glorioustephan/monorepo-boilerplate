import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders the body content', () => {
    renderWithTheme(<Alert>Something went wrong.</Alert>);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    renderWithTheme(<Alert title="Error">Details here.</Alert>);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders the icon slot', () => {
    renderWithTheme(<Alert icon={<span data-testid="icon" />}>Body</Alert>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders the actions slot', () => {
    renderWithTheme(<Alert actions={<Button>Retry</Button>}>Body</Alert>);
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders a dismiss button when onDismiss is provided', () => {
    const onDismiss = vi.fn();
    renderWithTheme(<Alert onDismiss={onDismiss}>Body</Alert>);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('calls onDismiss when the dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    renderWithTheme(<Alert onDismiss={onDismiss}>Body</Alert>);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('does not render a dismiss button when onDismiss is omitted', () => {
    renderWithTheme(<Alert>Body</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });
});
