import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Hero",
  tier: "Block",
  description: "Centered page-intro section with title, copy, and action/media slots.",
  props: [
    { name: "title", type: "ReactNode", required: true },
    { name: "description", type: "ReactNode", required: false },
    { name: "actions", type: "ReactNode", required: false, description: "CTA controls slot." },
    { name: "media", type: "ReactNode", required: false, description: "Supporting visual slot." },
    { name: "className", type: "string", required: false },
  ],
  examples: [
    {
      label: "with actions",
      code: '<Hero\n  title="Ship faster"\n  description="An opinionated monorepo starter."\n  actions={<Button>Get started</Button>}\n/>',
    },
  ],
  intent: {
    use: ["Opening a landing or marketing page with a single, clear value proposition."],
    avoid: ["Dense dashboards or app shells — a Hero is for marketing-style intros."],
  },
};
