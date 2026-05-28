import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { SystemMessage } from './SystemMessage';

describe('SystemMessage', () => {
  it('renders the body content', () => {
    renderWithTheme(<SystemMessage>Web search completed.</SystemMessage>);
    expect(screen.getByText('Web search completed.')).toBeInTheDocument();
  });

  it('defaults to the action variant (gray callout)', () => {
    const { container } = renderWithTheme(<SystemMessage>Default variant</SystemMessage>);
    // Radix Callout.Root carries data-accent-color="gray" for the action mapping.
    expect(container.querySelector('[data-accent-color="gray"]')).toBeInTheDocument();
  });

  it('maps variant="error" to red', () => {
    const { container } = renderWithTheme(
      <SystemMessage variant="error">Error occurred.</SystemMessage>,
    );
    expect(container.querySelector('[data-accent-color="red"]')).toBeInTheDocument();
  });

  it('maps variant="warning" to amber', () => {
    const { container } = renderWithTheme(
      <SystemMessage variant="warning">Rate limit approached.</SystemMessage>,
    );
    expect(container.querySelector('[data-accent-color="amber"]')).toBeInTheDocument();
  });

  it('renders a CTA button with the supplied label', () => {
    renderWithTheme(
      <SystemMessage cta={{ label: 'Retry', onClick: () => undefined }}>Body</SystemMessage>,
    );
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('fires the CTA onClick handler', () => {
    const onClick = vi.fn();
    renderWithTheme(<SystemMessage cta={{ label: 'Retry', onClick }}>Body</SystemMessage>);
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('hides the icon when isIconHidden is true', () => {
    const { container } = renderWithTheme(<SystemMessage isIconHidden>No icon</SystemMessage>);
    // Alert renders the icon slot only when icon is truthy — with isIconHidden there is no icon element.
    expect(container.querySelector('.rt-CalloutIcon')).not.toBeInTheDocument();
  });
});
