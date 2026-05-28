import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('renders the trigger button', () => {
    renderWithTheme(
      <FileUpload onFilesAdded={() => undefined}>
        <FileUpload.Trigger>Upload files</FileUpload.Trigger>
        <FileUpload.Content>Drop here</FileUpload.Content>
      </FileUpload>,
    );
    expect(screen.getByRole('button', { name: /upload files/i })).toBeInTheDocument();
  });

  it('renders a hidden file input', () => {
    const { container } = renderWithTheme(
      <FileUpload onFilesAdded={() => undefined}>
        <FileUpload.Trigger>Upload</FileUpload.Trigger>
        <FileUpload.Content>Drop here</FileUpload.Content>
      </FileUpload>,
    );
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-hidden');
  });

  it('calls onFilesAdded when files are selected via the input', () => {
    const onFilesAdded = vi.fn();
    const { container } = renderWithTheme(
      <FileUpload onFilesAdded={onFilesAdded}>
        <FileUpload.Trigger>Upload</FileUpload.Trigger>
        <FileUpload.Content>Drop here</FileUpload.Content>
      </FileUpload>,
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [file], configurable: true });

    fireEvent.change(input);
    expect(onFilesAdded).toHaveBeenCalledOnce();
    expect(onFilesAdded).toHaveBeenCalledWith([file]);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(
      <FileUpload onFilesAdded={() => undefined} disabled>
        <FileUpload.Trigger>Upload</FileUpload.Trigger>
        <FileUpload.Content>Drop here</FileUpload.Content>
      </FileUpload>,
    );
    expect(screen.getByRole('button', { name: /upload/i })).toBeDisabled();
  });

  it('throws when FileUpload.Trigger is used outside FileUpload', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => renderWithTheme(<FileUpload.Trigger>Upload</FileUpload.Trigger>)).toThrow(
      'FileUpload.* must be used inside <FileUpload>',
    );
    spy.mockRestore();
  });

  it('passes the multiple attribute to the hidden input', () => {
    const { container } = renderWithTheme(
      <FileUpload onFilesAdded={() => undefined} multiple>
        <FileUpload.Trigger>Upload</FileUpload.Trigger>
        <FileUpload.Content>Drop here</FileUpload.Content>
      </FileUpload>,
    );
    const input = container.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('multiple');
  });
});
