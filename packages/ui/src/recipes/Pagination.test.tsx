import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders prev and next buttons', () => {
    renderWithTheme(<Pagination page={3} pageCount={10} onPageChange={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('disables Prev on first page', () => {
    renderWithTheme(<Pagination page={1} pageCount={5} onPageChange={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  it('disables Next on last page', () => {
    renderWithTheme(<Pagination page={5} pageCount={5} onPageChange={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('calls onPageChange with page - 1 when Prev is clicked', () => {
    const onPageChange = vi.fn();
    renderWithTheme(<Pagination page={3} pageCount={10} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with page + 1 when Next is clicked', () => {
    const onPageChange = vi.fn();
    renderWithTheme(<Pagination page={3} pageCount={10} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange with the correct page when a page button is clicked', () => {
    const onPageChange = vi.fn();
    renderWithTheme(<Pagination page={1} pageCount={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Page 4' }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('renders ellipsis for large page ranges', () => {
    renderWithTheme(<Pagination page={5} pageCount={20} onPageChange={() => undefined} />);
    const ellipses = screen.getAllByText('…');
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it('accepts custom prev and next labels', () => {
    renderWithTheme(
      <Pagination
        page={2}
        pageCount={5}
        onPageChange={() => undefined}
        prevLabel="Back"
        nextLabel="Forward"
      />,
    );
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Forward' })).toBeInTheDocument();
  });
});
