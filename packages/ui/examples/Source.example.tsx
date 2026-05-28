import { Source } from '@monorepo-boilerplate/ui';

/** Source demonstrates two inline citation chips in a sentence — one with a favicon, one without. */
export default function SourceExample() {
  return (
    <p style={{ lineHeight: '2' }}>
      According to{' '}
      <Source href="https://react.dev">
        <Source.Trigger showFavicon />
        <Source.Content
          title="React – A JavaScript library for building user interfaces"
          description="React lets you build user interfaces out of individual pieces called components."
        />
      </Source>{' '}
      and{' '}
      <Source href="https://radix-ui.com">
        <Source.Trigger label="Radix UI" />
        <Source.Content
          title="Radix UI — Unstyled, accessible UI component library"
          description="An open-source UI component library for building high-quality web apps."
        />
      </Source>
      , component-driven design improves maintainability.
    </p>
  );
}
