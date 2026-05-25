import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Combobox, type ComboboxOption } from './Combobox';
import { renderWithTheme } from '../test-utils';

const options: readonly ComboboxOption[] = [
  { value: 'Apple', label: 'Apple' },
  { value: 'Banana', label: 'Banana' },
  { value: 'Cherry', label: 'Cherry' },
];

describe('Combobox', () => {
  it('reveals options on focus', () => {
    renderWithTheme(<Combobox options={options} />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    fireEvent.focus(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
  });

  it('filters options by typed text', () => {
    renderWithTheme(<Combobox options={options} />);
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ban' } });
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
  });

  it('selects an option on click', () => {
    const onSelect = vi.fn();
    const onValueChange = vi.fn();
    renderWithTheme(
      <Combobox options={options} onSelect={onSelect} onValueChange={onValueChange} />,
    );
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    const cherry = screen.getByRole('option', { name: 'Cherry' });
    fireEvent.mouseDown(cherry);
    fireEvent.click(cherry);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: 'Cherry' }));
    expect(onValueChange).toHaveBeenCalledWith('Cherry');
  });

  it('selects the active option with the keyboard', () => {
    const onSelect = vi.fn();
    renderWithTheme(<Combobox options={options} onSelect={onSelect} />);
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: 'Banana' }));
  });
});
