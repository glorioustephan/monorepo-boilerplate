import type { CatalogSidecar } from "../catalog-schema";

export const meta: CatalogSidecar = {
  name: "ConfirmDialog",
  tier: "Recipe",
  description: "Dialog wired to a confirm/cancel decision; owns its open state.",
  props: [
    { name: "trigger", type: "ReactNode", required: true, description: "Control that opens it." },
    { name: "title", type: "ReactNode", required: true },
    { name: "description", type: "ReactNode", required: false },
    { name: "confirmLabel", type: "string", required: false, default: '"Confirm"' },
    { name: "cancelLabel", type: "string", required: false, default: '"Cancel"' },
    { name: "destructive", type: "boolean", required: false, default: "false" },
    { name: "onConfirm", type: "() => void | Promise<void>", required: true },
  ],
  examples: [
    {
      label: "destructive",
      code: '<ConfirmDialog\n  trigger={<Button variant="destructive">Delete</Button>}\n  title="Delete project?"\n  description="This cannot be undone."\n  destructive\n  onConfirm={() => deleteProject(id)}\n/>',
    },
  ],
  intent: {
    use: [
      "Guarding a destructive or irreversible action behind an explicit confirm step.",
      "Keeping the client boundary in one leaf so server parents pass slot props only.",
    ],
    avoid: ["Non-blocking notices — use a toast. Multi-step flows — compose Dialog directly."],
  },
};
