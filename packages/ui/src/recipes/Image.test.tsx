import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Image } from './Image';

/** Minimal valid base64 PNG (1×1 red pixel). */
const RED_PIXEL_PNG =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

describe('Image', () => {
  it('renders an img element with the correct alt when base64 is provided', () => {
    renderWithTheme(<Image base64={RED_PIXEL_PNG} mediaType="image/png" alt="Generated image" />);
    expect(screen.getByRole('img', { name: 'Generated image' })).toBeInTheDocument();
  });

  it('builds a data URI src from base64 + mediaType', () => {
    renderWithTheme(<Image base64={RED_PIXEL_PNG} mediaType="image/png" alt="Generated image" />);
    const img = screen.getByRole('img', { name: 'Generated image' });
    expect(img).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
  });

  it('renders a skeleton placeholder when no image data is provided', () => {
    const { container } = renderWithTheme(
      <Image alt="Loading image" style={{ width: 100, height: 100 }} />,
    );
    // Skeleton wraps with aria-hidden + inert so the placeholder is in the DOM but not the a11y tree.
    // Query the container directly for the role="img" Box element.
    const placeholder = container.querySelector('[role="img"][aria-label="Loading image"]');
    expect(placeholder).toBeInTheDocument();
    // No actual <img> element should be present.
    expect(container.querySelector('img')).toBeNull();
  });

  it('defaults mediaType to image/png', () => {
    renderWithTheme(<Image base64={RED_PIXEL_PNG} alt="Default media type" />);
    const img = screen.getByRole('img', { name: 'Default media type' });
    expect(img).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,'));
  });
});
