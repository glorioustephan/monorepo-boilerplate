import { useState } from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { PromptInput } from './PromptInput';

// ---------------------------------------------------------------------------
// Controlled harness — lets tests observe value changes and submit calls.
// ---------------------------------------------------------------------------

function ControlledPromptInput({ onSubmit }: { readonly onSubmit?: () => void }) {
  const [value, setValue] = useState('');
  return (
    <PromptInput value={value} onValueChange={setValue} onSubmit={onSubmit}>
      <PromptInput.Textarea placeholder="Ask anything…" />
    </PromptInput>
  );
}

describe('PromptInput', () => {
  it('renders the textarea with the given placeholder', () => {
    renderWithTheme(
      <PromptInput>
        <PromptInput.Textarea placeholder="Ask anything…" />
      </PromptInput>,
    );
    expect(screen.getByPlaceholderText('Ask anything…')).toBeInTheDocument();
  });

  it('typing into the textarea updates the displayed value', () => {
    renderWithTheme(<ControlledPromptInput />);
    const textarea = screen.getByPlaceholderText('Ask anything…');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    expect((textarea as HTMLTextAreaElement).value).toBe('Hello world');
  });

  it('pressing Enter fires onSubmit', () => {
    const onSubmit = vi.fn();
    renderWithTheme(<ControlledPromptInput onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText('Ask anything…');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('pressing Shift+Enter does NOT fire onSubmit', () => {
    const onSubmit = vi.fn();
    renderWithTheme(<ControlledPromptInput onSubmit={onSubmit} />);
    const textarea = screen.getByPlaceholderText('Ask anything…');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders action controls with their accessible names', () => {
    renderWithTheme(
      <PromptInput>
        <PromptInput.Textarea placeholder="Ask anything…" />
        <PromptInput.Actions>
          <PromptInput.Action tooltip="Send message" side="top">
            <button aria-label="Send message">Send</button>
          </PromptInput.Action>
        </PromptInput.Actions>
      </PromptInput>,
    );
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument();
  });

  it('disables the textarea when disabled prop is set', () => {
    renderWithTheme(
      <PromptInput disabled>
        <PromptInput.Textarea placeholder="Ask anything…" />
      </PromptInput>,
    );
    expect(screen.getByPlaceholderText('Ask anything…')).toBeDisabled();
  });
});
