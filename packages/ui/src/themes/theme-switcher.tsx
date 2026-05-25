"use client";

/*
 * Runtime theme switcher. Drives the same axes as Radix's ThemePanel —
 * appearance (light/dark/system), accent color, gray color, radius, scaling —
 * through `useThemeControls()`. Built from Radix Themes controls so it inherits
 * the active theme. Itself a catalogued kit component (see theme-switcher.catalog.ts).
 */
import { Flex, SegmentedControl, Select, Text } from "@radix-ui/themes";

import { cn } from "../lib/cn";
import {
  type AccentColor,
  ACCENT_COLORS,
  type Appearance,
  type GrayColor,
  GRAY_COLORS,
  type Radius,
  RADIUS_OPTIONS,
  type Scaling,
  SCALING_OPTIONS,
} from "./theme-controls";
import { useThemeControls } from "./theme-provider";

const APPEARANCE_OPTIONS: readonly Appearance[] = ["light", "dark", "system"];

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** A labelled control row. */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Flex direction="column" gap="1">
      <Text as="label" size="1" color="gray" weight="medium">
        {label}
      </Text>
      {children}
    </Flex>
  );
}

export interface ThemeSwitcherProps {
  /** Lay the controls out in a row (default) or a column. */
  readonly orientation?: "horizontal" | "vertical";
  readonly className?: string;
}

export function ThemeSwitcher({ orientation = "horizontal", className }: ThemeSwitcherProps) {
  const {
    appearance,
    accentColor,
    grayColor,
    radius,
    scaling,
    setAppearance,
    setAccentColor,
    setGrayColor,
    setRadius,
    setScaling,
  } = useThemeControls();

  return (
    <Flex
      align={orientation === "horizontal" ? "end" : "stretch"}
      direction={orientation === "horizontal" ? "row" : "column"}
      gap="4"
      wrap="wrap"
      className={cn(className)}
    >
      <Field label="Appearance">
        <SegmentedControl.Root
          value={appearance}
          onValueChange={(value) => setAppearance(value as Appearance)}
          size="1"
        >
          {APPEARANCE_OPTIONS.map((option) => (
            <SegmentedControl.Item key={option} value={option}>
              {titleCase(option)}
            </SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
      </Field>

      <Field label="Accent">
        <Select.Root
          value={accentColor}
          onValueChange={(value) => setAccentColor(value as AccentColor)}
          size="1"
        >
          <Select.Trigger />
          <Select.Content>
            {ACCENT_COLORS.map((option) => (
              <Select.Item key={option} value={option}>
                {titleCase(option)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Field>

      <Field label="Gray">
        <Select.Root
          value={grayColor}
          onValueChange={(value) => setGrayColor(value as GrayColor)}
          size="1"
        >
          <Select.Trigger />
          <Select.Content>
            {GRAY_COLORS.map((option) => (
              <Select.Item key={option} value={option}>
                {titleCase(option)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Field>

      <Field label="Radius">
        <Select.Root value={radius} onValueChange={(value) => setRadius(value as Radius)} size="1">
          <Select.Trigger />
          <Select.Content>
            {RADIUS_OPTIONS.map((option) => (
              <Select.Item key={option} value={option}>
                {titleCase(option)}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Field>

      <Field label="Scaling">
        <Select.Root
          value={scaling}
          onValueChange={(value) => setScaling(value as Scaling)}
          size="1"
        >
          <Select.Trigger />
          <Select.Content>
            {SCALING_OPTIONS.map((option) => (
              <Select.Item key={option} value={option}>
                {option}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Field>
    </Flex>
  );
}
