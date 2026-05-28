import { TextShimmer } from '@monorepo-boilerplate/ui';

/** TextShimmer renders a sweeping gradient animation over text — ideal for AI thinking states. */
export default function TextShimmerExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextShimmer>Generating response…</TextShimmer>
      <TextShimmer duration={2} spread={30} as="p">
        Thinking about your question…
      </TextShimmer>
      <TextShimmer duration={6} spread={10} className="font-medium" as="h3">
        Crafting the perfect answer
      </TextShimmer>
    </div>
  );
}
