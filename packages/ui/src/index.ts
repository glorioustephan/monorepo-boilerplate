// Public surface of @monorepo-boilerplate/ui.
//
// - Components (thin re-exports of Radix Themes) are generated into ./components from
//   components/components.manifest.ts by `pnpm ui:codegen` and re-exported via ./components.
// - Composites (recipes/blocks/templates) are hand-built on those components.
// - The theme layer (ThemeProvider/ThemeSwitcher/controls) + cn round out the surface.

export { cn } from './lib/cn';

// Components — generated from components/components.manifest.ts (thin Radix Themes re-exports).
export * from './components';

// Authored composition layers, built on the components above.
export * from './recipes';
export * from './blocks';
export * from './templates';

export {
  type AccentColor,
  ACCENT_COLORS,
  type Appearance,
  APPEARANCES,
  type GrayColor,
  GRAY_COLORS,
  type Radius,
  RADIUS_OPTIONS,
  type Scaling,
  SCALING_OPTIONS,
} from './themes/theme-controls';
export { ThemeProvider, type ThemeProviderProps, useThemeControls } from './themes/ThemeProvider';
export { ThemeSwitcher, type ThemeSwitcherProps } from './themes/ThemeSwitcher';
