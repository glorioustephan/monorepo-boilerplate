import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { PromptSuggestion } from './PromptSuggestion';

describe('PromptSuggestion', () => {
  it('renders the suggestion text', () => {
    renderWithTheme(<PromptSuggestion>Summarise this document</PromptSuggestion>);
    expect(screen.getByText('Summarise this document')).toBeInTheDocument();
  });

  it('renders a button element', () => {
    renderWithTheme(<PromptSuggestion onClick={() => {}}>Suggestion</PromptSuggestion>);
    expect(screen.getByRole('button', { name: 'Suggestion' })).toBeInTheDocument();
  });

  it('fires onClick when clicked', () => {
    const onClick = vi.fn();
    renderWithTheme(<PromptSuggestion onClick={onClick}>Click me</PromptSuggestion>);
    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  describe('highlight mode', () => {
    it('renders the matched substring in its own text node', () => {
      renderWithTheme(
        <PromptSuggestion highlight="React">How do I use React hooks?</PromptSuggestion>,
      );
      // The match "React" appears in a separate Text element with weight="medium"
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('renders the before-match portion', () => {
      renderWithTheme(
        <PromptSuggestion highlight="React">How do I use React hooks?</PromptSuggestion>,
      );
      // Use exact:false because Testing Library normalises trailing whitespace.
      expect(screen.getByText(/how do i use/i, { exact: false })).toBeInTheDocument();
    });

    it('renders the after-match portion', () => {
      renderWithTheme(
        <PromptSuggestion highlight="React">How do I use React hooks?</PromptSuggestion>,
      );
      expect(screen.getByText(/hooks\?/, { exact: false })).toBeInTheDocument();
    });

    it('renders full text in gray when there is no match', () => {
      renderWithTheme(
        <PromptSuggestion highlight="python">Summarise this document</PromptSuggestion>,
      );
      expect(screen.getByText('Summarise this document')).toBeInTheDocument();
    });

    it('is case-insensitive for matching', () => {
      renderWithTheme(
        <PromptSuggestion highlight="react">How do I use React hooks?</PromptSuggestion>,
      );
      // The actual highlighted text preserves original casing.
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });
});
