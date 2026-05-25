import { FeatureGrid } from '@monorepo-boilerplate/ui';

const features = [
  { title: 'Themable', description: 'Switch accent, gray, radius, and scaling at runtime.' },
  { title: 'Agent-ready', description: 'An MCP catalog exposes every component to tooling.' },
  { title: 'Type-safe', description: 'Strict TypeScript and source-consumed HMR across packages.' },
];

/** FeatureGrid lays out a set of feature cards responsively. */
export default function FeatureGridExample() {
  return <FeatureGrid features={features} />;
}
