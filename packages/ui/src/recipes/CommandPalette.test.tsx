import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { type CommandItem, CommandPalette } from './CommandPalette';
import { renderWithTheme } from '../test-utils';

const items: readonly CommandItem[] = [
  { id: 'a', label: 'Go to Dashboard', group: 'Navigation' },
  { id: 'b', label: 'Open settings', group: 'Navigation' },
  { id: 'c', label: 'Create document', group: 'Actions' },
];

const noop = () => {};

describe('CommandPalette', () => {
  it('renders the search input and options when open', () => {
    renderWithTheme(<CommandPalette open onOpenChange={noop} items={items} onSelect={noop} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Go to Dashboard/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Create document/ })).toBeInTheDocument();
  });

  it('filters options by query', () => {
    renderWithTheme(<CommandPalette open onOpenChange={noop} items={items} onSelect={noop} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'settings' } });
    expect(screen.getByRole('option', { name: /Open settings/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Dashboard/ })).not.toBeInTheDocument();
  });

  it('selects the matching option on Enter', () => {
    const onSelect = vi.fn();
    renderWithTheme(<CommandPalette open onOpenChange={noop} items={items} onSelect={onSelect} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'document' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'c' }));
  });

  it('moves the active option with ArrowDown before selecting', () => {
    const onSelect = vi.fn();
    renderWithTheme(<CommandPalette open onOpenChange={noop} items={items} onSelect={onSelect} />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'b' }));
  });

  it('shows the empty message when nothing matches', () => {
    renderWithTheme(
      <CommandPalette
        open
        onOpenChange={noop}
        items={items}
        onSelect={noop}
        emptyMessage="Nothing here"
      />,
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzzz' } });
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });
});
