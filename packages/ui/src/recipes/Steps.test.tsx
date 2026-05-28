import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Steps } from './Steps';

describe('Steps', () => {
  it('renders the trigger label', () => {
    renderWithTheme(
      <Steps>
        <Steps.Trigger>Execution plan</Steps.Trigger>
        <Steps.Content>
          <Steps.Item>Step one.</Steps.Item>
        </Steps.Content>
      </Steps>,
    );
    expect(screen.getByText('Execution plan')).toBeInTheDocument();
  });

  it('starts open by default — trigger has aria-expanded="true"', () => {
    renderWithTheme(
      <Steps>
        <Steps.Trigger>Execution plan</Steps.Trigger>
        <Steps.Content>
          <Steps.Item>Step one.</Steps.Item>
        </Steps.Content>
      </Steps>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('items are visible when open', () => {
    renderWithTheme(
      <Steps>
        <Steps.Trigger>Plan</Steps.Trigger>
        <Steps.Content>
          <Steps.Item>Step one.</Steps.Item>
          <Steps.Item>Step two.</Steps.Item>
        </Steps.Content>
      </Steps>,
    );
    expect(screen.getByText('Step one.')).toBeInTheDocument();
    expect(screen.getByText('Step two.')).toBeInTheDocument();
  });

  it('clicking the trigger toggles aria-expanded to false when defaultOpen', () => {
    renderWithTheme(
      <Steps>
        <Steps.Trigger>Plan</Steps.Trigger>
        <Steps.Content>
          <Steps.Item>Step one.</Steps.Item>
        </Steps.Content>
      </Steps>,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking the trigger twice reveals items again', () => {
    renderWithTheme(
      <Steps>
        <Steps.Trigger>Plan</Steps.Trigger>
        <Steps.Content>
          <Steps.Item>Step content.</Steps.Item>
        </Steps.Content>
      </Steps>,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Step content.')).toBeInTheDocument();
  });

  it('respects defaultOpen=false', () => {
    renderWithTheme(
      <Steps defaultOpen={false}>
        <Steps.Trigger>Plan</Steps.Trigger>
        <Steps.Content>
          <Steps.Item>Hidden step.</Steps.Item>
        </Steps.Content>
      </Steps>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });
});
