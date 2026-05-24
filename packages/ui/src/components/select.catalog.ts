import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Select",
  tier: "Primitive",
  description: "Accessible single-select dropdown (Radix) styled with kit tokens.",
  props: [
    { name: "Select", type: "Radix Select.Root props (value, onValueChange, …)", required: false },
    {
      name: "SelectTrigger",
      type: "ComponentPropsWithRef<typeof Select.Trigger>",
      required: false,
    },
  ],
  examples: [
    {
      label: "basic",
      code: '<Select>\n  <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="a">A</SelectItem>\n    <SelectItem value="b">B</SelectItem>\n  </SelectContent>\n</Select>',
    },
  ],
  intent: {
    use: ["Choosing one option from a small-to-medium list with full keyboard a11y."],
    avoid: [
      "Free text entry — use Input. Multi-select — compose checkboxes or a dedicated control.",
    ],
  },
};
