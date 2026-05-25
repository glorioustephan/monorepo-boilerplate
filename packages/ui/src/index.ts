// Public surface of @monorepo-boilerplate/ui.
//
// - Atoms (re-exported from Radix Themes) are generated into ./primitives and
//   re-exported here by the codegen step (see primitives/atoms.manifest.ts).
// - Composites (primitives/recipes/blocks/templates) are hand-built on those atoms.
// - This file currently exports the theme layer + cn; atoms/composites are appended
//   as those layers land.

export { cn } from "./lib/cn";

// Components — generated from components/components.manifest.ts (thin Radix Themes re-exports).
export * from "./components";

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
} from "./themes/theme-controls";
export { ThemeProvider, type ThemeProviderProps, useThemeControls } from "./themes/theme-provider";
export { ThemeSwitcher, type ThemeSwitcherProps } from "./themes/theme-switcher";
