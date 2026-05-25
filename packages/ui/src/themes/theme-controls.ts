/*
 * Theme control constants + types. Pure module (no React) so it can be imported
 * anywhere — the provider, the switcher, Storybook's toolbar, and tests all share
 * one source of truth. The option lists are derived from Radix Themes' own
 * `themePropDefs` so they never drift from the library.
 */
import { themePropDefs } from "@radix-ui/themes/props";

/** Accent colors not built into Radix — defined in `accents.css` and merged in here. */
export const CUSTOM_ACCENT_COLORS = ["brand"] as const;

/** All accent colors offered in the switcher: Radix's 26 built-ins + our custom ones. */
export const ACCENT_COLORS = [
  ...themePropDefs.accentColor.values,
  ...CUSTOM_ACCENT_COLORS,
] as const;
export type AccentColor = (typeof ACCENT_COLORS)[number];

// Snapshot Radix's value tuples into this module (spread + `as const`) so the derived
// unions stay literal even if a future Radix version widens the upstream type to string[].
export const GRAY_COLORS = [...themePropDefs.grayColor.values] as const;
export type GrayColor = (typeof GRAY_COLORS)[number];

export const RADIUS_OPTIONS = [...themePropDefs.radius.values] as const;
export type Radius = (typeof RADIUS_OPTIONS)[number];

export const SCALING_OPTIONS = [...themePropDefs.scaling.values] as const;
export type Scaling = (typeof SCALING_OPTIONS)[number];

/** Light/dark/system — `system` follows the OS preference (next-themes `enableSystem`). */
export const APPEARANCES = ["light", "dark", "system"] as const;
export type Appearance = (typeof APPEARANCES)[number];

/** The Radix `<Theme>` axes we let users drive at runtime (appearance is next-themes'). */
export interface ThemeControls {
  readonly accentColor: AccentColor;
  readonly grayColor: GrayColor;
  readonly radius: Radius;
  readonly scaling: Scaling;
}

export const DEFAULT_THEME_CONTROLS: ThemeControls = {
  accentColor: "indigo",
  grayColor: "auto",
  radius: "medium",
  scaling: "100%",
};

/** localStorage key for persisted control selections. */
export const THEME_STORAGE_KEY = "mb-theme-controls";
