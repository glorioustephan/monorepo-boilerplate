import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { FeedbackBar } from './FeedbackBar';

describe('FeedbackBar', () => {
  it('renders the title', () => {
    renderWithTheme(<FeedbackBar title="Was this helpful?" />);
    expect(screen.getByText('Was this helpful?')).toBeInTheDocument();
  });

  it('renders a "Helpful" button with the correct accessible name', () => {
    renderWithTheme(<FeedbackBar />);
    expect(screen.getByRole('button', { name: 'Helpful' })).toBeInTheDocument();
  });

  it('renders a "Not helpful" button with the correct accessible name', () => {
    renderWithTheme(<FeedbackBar />);
    expect(screen.getByRole('button', { name: 'Not helpful' })).toBeInTheDocument();
  });

  it('renders a "Close" button with the correct accessible name', () => {
    renderWithTheme(<FeedbackBar />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('fires onHelpful when the Helpful button is clicked', () => {
    const onHelpful = vi.fn();
    renderWithTheme(<FeedbackBar onHelpful={onHelpful} />);
    fireEvent.click(screen.getByRole('button', { name: 'Helpful' }));
    expect(onHelpful).toHaveBeenCalledOnce();
  });

  it('fires onNotHelpful when the Not helpful button is clicked', () => {
    const onNotHelpful = vi.fn();
    renderWithTheme(<FeedbackBar onNotHelpful={onNotHelpful} />);
    fireEvent.click(screen.getByRole('button', { name: 'Not helpful' }));
    expect(onNotHelpful).toHaveBeenCalledOnce();
  });

  it('fires onClose when the Close button is clicked', () => {
    const onClose = vi.fn();
    renderWithTheme(<FeedbackBar onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders the leading icon slot', () => {
    renderWithTheme(<FeedbackBar icon={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
