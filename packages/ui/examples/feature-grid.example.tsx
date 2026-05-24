import { FeatureGrid } from "@monorepo-boilerplate/ui";

export default function FeatureGridExample() {
  return (
    <FeatureGrid
      features={[
        { title: "Fast", description: "Turbopack dev server with cross-package HMR." },
        { title: "Typed", description: "Strict TypeScript and a generated component catalog." },
        { title: "Tested", description: "Vitest and Playwright wired in from the start." },
      ]}
    />
  );
}
