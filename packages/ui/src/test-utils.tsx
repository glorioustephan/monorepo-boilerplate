import { Theme } from '@radix-ui/themes';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

/**
 * Render a kit component inside a Radix `<Theme>`, matching how it renders in the
 * app and Storybook. Radix Themes components read theme context, so component tests
 * should mount through this rather than bare `render`.
 */
export function renderWithTheme(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => <Theme>{children}</Theme>,
    ...options,
  });
}
