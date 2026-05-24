import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Card",
  tier: "Primitive",
  description: "Bordered surface container for grouping related content.",
  props: [{ name: "...div", type: 'ComponentPropsWithRef<"div">', required: false }],
  examples: [{ label: "default", code: "<Card>Content</Card>" }],
  intent: {
    use: ["Grouping related content on an elevated surface (bg-surface)."],
    avoid: ["Page-level layout — compose blocks/templates instead of nesting many Cards."],
  },
};
