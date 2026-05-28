import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { ThinkingBar } from './ThinkingBar';

describe('ThinkingBar', () => {
  it('renders the default Thinking label', () => {
    renderWithTheme(<ThinkingBar />);
    expect(screen.getByText('Thinking')).toBeInTheDocument();
  });

  it('renders a custom text label', () => {
    renderWithTheme(<ThinkingBar text="Reasoning…" />);
    expect(screen.getByText('Reasoning…')).toBeInTheDocument();
  });

  it('does not render the stop button when onStop is omitted', () => {
    renderWithTheme(<ThinkingBar />);
    expect(screen.queryByText('Answer now')).not.toBeInTheDocument();
  });

  it('renders the stop button with default label when onStop is provided', () => {
    renderWithTheme(<ThinkingBar onStop={() => {}} />);
    expect(screen.getByRole('button', { name: /answer now/i })).toBeInTheDocument();
  });

  it('fires onStop when the stop button is clicked', () => {
    const onStop = vi.fn();
    renderWithTheme(<ThinkingBar onStop={onStop} />);
    fireEvent.click(screen.getByRole('button', { name: /answer now/i }));
    expect(onStop).toHaveBeenCalledOnce();
  });

  it('renders a custom stop label', () => {
    renderWithTheme(<ThinkingBar onStop={() => {}} stopLabel="Stop now" />);
    expect(screen.getByRole('button', { name: /stop now/i })).toBeInTheDocument();
  });

  it('wraps the label in a button when onClick is provided', () => {
    const onClick = vi.fn();
    renderWithTheme(<ThinkingBar onClick={onClick} text="Thinking" />);
    // The label button and the text inside it should both be accessible.
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('fires onClick when the label button is clicked', () => {
    const onClick = vi.fn();
    renderWithTheme(<ThinkingBar onClick={onClick} text="Click me" />);
    // Find the button containing "Click me"
    const button = screen.getAllByRole('button').find((b) => b.textContent?.includes('Click me'));
    expect(button).toBeDefined();
    fireEvent.click(button!);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders as bare shimmer (no button) when onClick is omitted', () => {
    renderWithTheme(<ThinkingBar text="Bare shimmer" />);
    // Without onClick or onStop there should be no buttons
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Bare shimmer')).toBeInTheDocument();
  });
});
