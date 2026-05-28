import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Source } from './Source';

describe('Source', () => {
  it('renders the trigger with the default domain label', () => {
    renderWithTheme(
      <Source href="https://example.com/page">
        <Source.Trigger />
        <Source.Content title="Example" description="A test source." />
      </Source>,
    );
    // domain is "example.com" — www. stripping does not affect this.
    expect(screen.getByText('example.com')).toBeInTheDocument();
  });

  it('renders the trigger with an explicit label override', () => {
    renderWithTheme(
      <Source href="https://react.dev">
        <Source.Trigger label="React docs" />
        <Source.Content title="React" description="A JS library." />
      </Source>,
    );
    expect(screen.getByText('React docs')).toBeInTheDocument();
  });

  it('links the trigger to the href with target blank and rel noopener', () => {
    renderWithTheme(
      <Source href="https://react.dev">
        <Source.Trigger label="React" />
        <Source.Content title="React" description="A JS library." />
      </Source>,
    );
    const link = screen.getByRole('link', { name: /react/i });
    expect(link).toHaveAttribute('href', 'https://react.dev');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('strips www. from the domain label', () => {
    renderWithTheme(
      <Source href="https://www.example.com">
        <Source.Trigger />
        <Source.Content title="Example" description="A test source." />
      </Source>,
    );
    expect(screen.getByText('example.com')).toBeInTheDocument();
  });

  it('throws when SourceTrigger is used outside Source', () => {
    // Suppress the thrown error output from jsdom.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => renderWithTheme(<Source.Trigger />)).toThrow(
      'Source.* must be used inside <Source>',
    );
    spy.mockRestore();
  });
});
