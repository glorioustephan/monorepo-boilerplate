import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  // Stories live next to each component (src/<tier>/<slug>.stories.tsx).
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  viteFinal: (viteConfig) => {
    // Tailwind v4 via the Vite plugin (matches the app's v4 setup, not PostCSS).
    // The kit's self-import inside examples (`@monorepo-boilerplate/ui`) resolves to
    // source via the workspace package's own `exports` — no alias needed.
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    return viteConfig;
  },
};

export default config;
