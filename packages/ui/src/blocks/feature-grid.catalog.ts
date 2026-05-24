import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "FeatureGrid",
  tier: "Block",
  description: "Responsive grid of feature cards driven by a features list.",
  props: [
    {
      name: "features",
      type: "ReadonlyArray<{ title: string; description: ReactNode; icon?: ReactNode }>",
      required: true,
    },
    { name: "columns", type: "2 | 3 | 4", required: false, default: "3" },
    { name: "className", type: "string", required: false },
  ],
  examples: [
    {
      label: "three up",
      code: '<FeatureGrid\n  features={[\n    { title: "Fast", description: "Turbopack dev server." },\n    { title: "Typed", description: "Strict TypeScript everywhere." },\n    { title: "Tested", description: "Vitest and Playwright wired in." },\n  ]}\n/>',
    },
  ],
  intent: {
    use: ["Summarizing 2–8 product capabilities in a scannable, responsive grid."],
    avoid: ["Long comparison tables or data — use a table; keep features brief."],
  },
};
