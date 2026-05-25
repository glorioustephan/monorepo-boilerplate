import { ImageIcon } from '@radix-ui/react-icons';

import { ContentSection, Text } from '@monorepo-boilerplate/ui';

const mediaPlaceholder = (
  <div
    style={{
      background: 'var(--accent-3)',
      borderRadius: 12,
      height: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <ImageIcon width={48} height={48} />
  </div>
);

/** ContentSection renders an editorial split-layout section with eyebrow, title, and media. */
export default function ContentSectionExample() {
  return (
    <ContentSection
      eyebrow="How it works"
      title="One monorepo, every layer covered"
      description="From typed environment variables to a shared design system, every concern has a dedicated package with clear boundaries and zero runtime coupling."
      layout="split"
      media={mediaPlaceholder}
    >
      <Text size="3" color="gray">
        Packages are consumed from source so you get instant HMR across package boundaries during
        development — no rebuild loops, no stale types.
      </Text>
      <Text size="3" color="gray">
        The React Compiler handles memoization automatically. Write clear, direct component code and
        let the toolchain optimize it.
      </Text>
    </ContentSection>
  );
}
