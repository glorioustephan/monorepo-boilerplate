'use client';

/*
 * Kit theme provider. Composition (per Radix's next-themes integration):
 *
 *   next-themes ThemeProvider  → owns light/dark via `class` on <html> (.dark)
 *     └─ Radix <Theme>         → owns accentColor / grayColor / radius / scaling
 *
 * Radix dark styles (and our accents.css) key off a `.dark` ancestor, so we leave
 * the Radix `appearance` prop at its default ("inherit") and let next-themes toggle
 * the class. The accent/gray/radius/scaling axes are held in React state, persisted
 * to localStorage, and exposed via `useThemeControls()` for the ThemeSwitcher.
 */
import { Theme } from '@radix-ui/themes';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  type AccentColor,
  type Appearance,
  DEFAULT_THEME_CONTROLS,
  type GrayColor,
  type Radius,
  type Scaling,
  THEME_STORAGE_KEY,
  type ThemeControls,
} from './theme-controls';

/** Radix's accent type doesn't include our custom accents; cast through this on the prop. */
type RadixAccent = NonNullable<ComponentProps<typeof Theme>['accentColor']>;

interface ThemeControlsContextValue extends ThemeControls {
  readonly appearance: Appearance;
  /** The appearance actually applied once `system` is resolved ("light" | "dark"). */
  readonly resolvedAppearance: 'light' | 'dark' | undefined;
  setAccentColor: (value: AccentColor) => void;
  setGrayColor: (value: GrayColor) => void;
  setRadius: (value: Radius) => void;
  setScaling: (value: Scaling) => void;
  setAppearance: (value: Appearance) => void;
}

const ThemeControlsContext = createContext<ThemeControlsContextValue | undefined>(undefined);

/** Read the runtime theme controls. Throws if used outside `<ThemeProvider>`. */
export function useThemeControls(): ThemeControlsContextValue {
  const ctx = useContext(ThemeControlsContext);
  if (!ctx) throw new Error('useThemeControls must be used within <ThemeProvider>');
  return ctx;
}

function readStored(): ThemeControls {
  if (typeof window === 'undefined') return DEFAULT_THEME_CONTROLS;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return DEFAULT_THEME_CONTROLS;
    return { ...DEFAULT_THEME_CONTROLS, ...(JSON.parse(raw) as Partial<ThemeControls>) };
  } catch {
    return DEFAULT_THEME_CONTROLS;
  }
}

function ThemeControlsProvider({ children }: { children: ReactNode }) {
  // Start from defaults on both server and first client render (no hydration
  // mismatch); hydrate from localStorage in an effect.
  const [controls, setControls] = useState<ThemeControls>(DEFAULT_THEME_CONTROLS);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setControls(readStored());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(controls));
    } catch {
      // Ignore storage failures (private mode, quota) — controls still work in-session.
    }
  }, [controls]);

  const value: ThemeControlsContextValue = {
    ...controls,
    appearance: (theme as Appearance | undefined) ?? 'system',
    resolvedAppearance:
      resolvedTheme === 'dark' ? 'dark' : resolvedTheme === 'light' ? 'light' : undefined,
    setAccentColor: (accentColor) => setControls((c) => ({ ...c, accentColor })),
    setGrayColor: (grayColor) => setControls((c) => ({ ...c, grayColor })),
    setRadius: (radius) => setControls((c) => ({ ...c, radius })),
    setScaling: (scaling) => setControls((c) => ({ ...c, scaling })),
    setAppearance: (appearance) => setTheme(appearance),
  };

  return (
    // React Compiler memoizes this context value; per repo convention we don't hand-write
    // useMemo (see AGENTS.md "don't hand-memoize"), so the constructed-value rule is moot here.
    // oxlint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeControlsContext.Provider value={value}>
      {/* Radix renders `data-accent-color` from this prop — even for custom values
          like "brand", which accents.css then styles. */}
      <Theme
        accentColor={controls.accentColor as RadixAccent}
        grayColor={controls.grayColor}
        radius={controls.radius}
        scaling={controls.scaling}
      >
        {children}
      </Theme>
    </ThemeControlsContext.Provider>
  );
}

export interface ThemeProviderProps {
  readonly children: ReactNode;
  /** Default appearance before a user choice is stored. */
  readonly defaultAppearance?: Appearance;
}

/** Wrap the app once near the root. Requires `suppressHydrationWarning` on `<html>`. */
export function ThemeProvider({ children, defaultAppearance = 'system' }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultAppearance}
      enableSystem
      disableTransitionOnChange
      storageKey="mb-appearance"
    >
      <ThemeControlsProvider>{children}</ThemeControlsProvider>
    </NextThemesProvider>
  );
}
