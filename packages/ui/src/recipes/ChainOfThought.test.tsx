import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { ChainOfThought } from './ChainOfThought';

describe('ChainOfThought', () => {
  it('renders step trigger labels', () => {
    renderWithTheme(
      <ChainOfThought>
        <ChainOfThought.Step>
          <ChainOfThought.Trigger>Search the web</ChainOfThought.Trigger>
          <ChainOfThought.Content>
            <ChainOfThought.Item>Found 12 results.</ChainOfThought.Item>
          </ChainOfThought.Content>
        </ChainOfThought.Step>
        <ChainOfThought.Step>
          <ChainOfThought.Trigger>Draft answer</ChainOfThought.Trigger>
          <ChainOfThought.Content>
            <ChainOfThought.Item>Compiled summary.</ChainOfThought.Item>
          </ChainOfThought.Content>
        </ChainOfThought.Step>
      </ChainOfThought>,
    );
    expect(screen.getByText('Search the web')).toBeInTheDocument();
    expect(screen.getByText('Draft answer')).toBeInTheDocument();
  });

  it('clicking a trigger toggles aria-expanded', () => {
    renderWithTheme(
      <ChainOfThought>
        <ChainOfThought.Step>
          <ChainOfThought.Trigger>Search the web</ChainOfThought.Trigger>
          <ChainOfThought.Content>
            <ChainOfThought.Item>Found results.</ChainOfThought.Item>
          </ChainOfThought.Content>
        </ChainOfThought.Step>
      </ChainOfThought>,
    );
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('stamps data-last on the final step and marks the rest as not-last', () => {
    const { container } = renderWithTheme(
      <ChainOfThought>
        <ChainOfThought.Step>
          <ChainOfThought.Trigger>Step one</ChainOfThought.Trigger>
          <ChainOfThought.Content>
            <ChainOfThought.Item>Content one.</ChainOfThought.Item>
          </ChainOfThought.Content>
        </ChainOfThought.Step>
        <ChainOfThought.Step>
          <ChainOfThought.Trigger>Step two</ChainOfThought.Trigger>
          <ChainOfThought.Content>
            <ChainOfThought.Item>Content two.</ChainOfThought.Item>
          </ChainOfThought.Content>
        </ChainOfThought.Step>
      </ChainOfThought>,
    );

    const steps = Array.from(container.querySelectorAll('[data-last]'));
    expect(steps).toHaveLength(2);
    expect(steps[0]).toHaveAttribute('data-last', 'false');
    expect(steps[1]).toHaveAttribute('data-last', 'true');
  });

  it('renders the continuous chain rail container around the steps', () => {
    const { container } = renderWithTheme(
      <ChainOfThought>
        <ChainOfThought.Step>
          <ChainOfThought.Trigger>Step one</ChainOfThought.Trigger>
          <ChainOfThought.Content>
            <ChainOfThought.Item>Content one.</ChainOfThought.Item>
          </ChainOfThought.Content>
        </ChainOfThought.Step>
        <ChainOfThought.Step>
          <ChainOfThought.Trigger>Step two</ChainOfThought.Trigger>
          <ChainOfThought.Content>
            <ChainOfThought.Item>Content two.</ChainOfThought.Item>
          </ChainOfThought.Content>
        </ChainOfThought.Step>
      </ChainOfThought>,
    );

    // The connector is now a single rail drawn on the .mb-cot root (a CSS ::before), not a
    // per-step element. Assert the rail container wraps the steps.
    const root = container.querySelector('.mb-cot');
    expect(root).toBeTruthy();
    expect(root?.querySelectorAll('.mb-cot-step')).toHaveLength(2);
  });

  it('renders items when a step is open', () => {
    renderWithTheme(
      <ChainOfThought>
        <ChainOfThought.Step defaultOpen>
          <ChainOfThought.Trigger>Search</ChainOfThought.Trigger>
          <ChainOfThought.Content>
            <ChainOfThought.Item>Found 5 results.</ChainOfThought.Item>
          </ChainOfThought.Content>
        </ChainOfThought.Step>
      </ChainOfThought>,
    );
    expect(screen.getByText('Found 5 results.')).toBeInTheDocument();
  });
});
