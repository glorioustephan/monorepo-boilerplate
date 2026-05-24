import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "Dialog",
  tier: "Primitive",
  description: "Modal dialog (Radix) with overlay, focus trap, and keyboard handling.",
  props: [
    { name: "Dialog", type: "Radix Dialog.Root props (open, onOpenChange, …)", required: false },
    {
      name: "DialogContent",
      type: "ComponentPropsWithRef<typeof Dialog.Content>",
      required: false,
    },
  ],
  examples: [
    {
      label: "basic",
      code: "<Dialog>\n  <DialogTrigger>Open</DialogTrigger>\n  <DialogContent>\n    <DialogTitle>Title</DialogTitle>\n    <DialogDescription>Body</DialogDescription>\n  </DialogContent>\n</Dialog>",
    },
  ],
  intent: {
    use: ["Blocking, focus-trapped interactions: confirmations, forms, detail overlays."],
    avoid: ["Non-blocking transient hints — use Tooltip. Always render DialogTitle for a11y."],
  },
};
