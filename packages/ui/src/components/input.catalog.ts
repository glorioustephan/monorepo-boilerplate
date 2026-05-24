import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Input",
  tier: "Primitive",
  description: "Text input styled with the kit's semantic tokens.",
  props: [{ name: "...input", type: 'ComponentPropsWithRef<"input">', required: false }],
  examples: [
    {
      label: "labelled email",
      code: '<label htmlFor="email">Email<Input id="email" type="email" /></label>',
    },
  ],
  intent: {
    use: ["Single-line text entry, always paired with a <label htmlFor> or aria-label."],
    avoid: ["Relying on placeholder as the accessible name — it is not a label."],
  },
};
