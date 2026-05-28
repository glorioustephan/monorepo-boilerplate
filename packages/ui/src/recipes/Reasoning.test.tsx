import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Reasoning } from './Reasoning';

describe('Reasoning', () => {
  it('renders the trigger label', () => {
    renderWithTheme(
      <Reasoning>
        <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
        <Reasoning.Content>Some reasoning text.</Reasoning.Content>
      </Reasoning>,
    );
    expect(screen.getByText('Thinking…')).toBeInTheDocument();
  });

  it('starts closed — trigger has aria-expanded="false"', () => {
    renderWithTheme(
      <Reasoning>
        <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
        <Reasoning.Content>Some reasoning text.</Reasoning.Content>
      </Reasoning>,
    );
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking the trigger toggles aria-expanded to true', () => {
    renderWithTheme(
      <Reasoning>
        <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
        <Reasoning.Content>Some reasoning text.</Reasoning.Content>
      </Reasoning>,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking the trigger twice toggles aria-expanded back to false', () => {
    renderWithTheme(
      <Reasoning>
        <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
        <Reasoning.Content>Some reasoning text.</Reasoning.Content>
      </Reasoning>,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders content when open=true (controlled)', () => {
    renderWithTheme(
      <Reasoning open>
        <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
        <Reasoning.Content>Visible reasoning.</Reasoning.Content>
      </Reasoning>,
    );
    expect(screen.getByText('Visible reasoning.')).toBeInTheDocument();
  });

  it('renders markdown content when markdown prop is set', () => {
    renderWithTheme(
      <Reasoning open>
        <Reasoning.Trigger>Thinking…</Reasoning.Trigger>
        <Reasoning.Content markdown>{'**bold text**'}</Reasoning.Content>
      </Reasoning>,
    );
    // react-markdown renders <strong>
    expect(screen.getByText('bold text')).toBeInTheDocument();
  });
});
