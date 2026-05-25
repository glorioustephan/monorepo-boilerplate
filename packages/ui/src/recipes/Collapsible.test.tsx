import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Collapsible } from './Collapsible';

describe('Collapsible', () => {
  it('toggles aria-expanded and notifies onOpenChange', () => {
    const onOpenChange = vi.fn();
    renderWithTheme(
      <Collapsible trigger="More" onOpenChange={onOpenChange}>
        <p>Details</p>
      </Collapsible>,
    );

    const trigger = screen.getByRole('button', { name: 'More' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('wires the trigger to its content region', () => {
    renderWithTheme(
      <Collapsible defaultOpen trigger="Open">
        <p>Body</p>
      </Collapsible>,
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    const controls = trigger.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
    expect(document.getElementById(controls ?? '')).toContainElement(screen.getByText('Body'));
  });
});
