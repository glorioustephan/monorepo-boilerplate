import {
  ImageIcon,
  LightningBoltIcon,
  LockClosedIcon,
  MixIcon,
  RocketIcon,
} from '@radix-ui/react-icons';

import { BentoGrid } from '@monorepo-boilerplate/ui';

const mediaBox = (icon: React.ReactNode, accent: string) => (
  <div
    style={{
      background: accent,
      borderRadius: 8,
      height: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {icon}
  </div>
);

const items = [
  {
    id: 'bento-1',
    title: 'Ship Faster',
    description: 'Turborepo remote caching cuts CI time by up to 80% across all packages.',
    media: mediaBox(<RocketIcon width={36} height={36} />, 'var(--accent-3)'),
    colSpan: 2 as const,
  },
  {
    id: 'bento-2',
    title: 'Type-Safe by Default',
    description: 'Strict TypeScript with noUncheckedIndexedAccess across every workspace.',
    media: mediaBox(<LightningBoltIcon width={36} height={36} />, 'var(--accent-4)'),
  },
  {
    id: 'bento-3',
    title: 'Radix Design System',
    description: 'A single vocabulary of accessible, themeable components.',
    media: mediaBox(<MixIcon width={36} height={36} />, 'var(--accent-5)'),
    rowSpan: 2 as const,
  },
  {
    id: 'bento-4',
    title: 'Secure by Construction',
    description: 'Env validation, signed sessions, and closed-fail webhook guards out of the box.',
    media: mediaBox(<LockClosedIcon width={36} height={36} />, 'var(--accent-6)'),
  },
  {
    id: 'bento-5',
    title: 'Agent-Ready',
    description: 'MCP servers expose your component catalog and tooling to AI agents.',
    media: mediaBox(<ImageIcon width={36} height={36} />, 'var(--accent-7)'),
  },
];

/** BentoGrid renders an asymmetric feature showcase with mixed column and row spans. */
export default function BentoGridExample() {
  return <BentoGrid items={items} />;
}
