import { ThinkingBar } from '@monorepo-boilerplate/ui';

/** ThinkingBar shows a shimmering AI reasoning indicator with an optional stop control. */
export default function ThinkingBarExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Basic (label only)</p>
        <ThinkingBar />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>With stop control</p>
        <ThinkingBar onStop={() => undefined} />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Clickable label + stop control</p>
        <ThinkingBar
          text="Reasoning through your question"
          onClick={() => undefined}
          onStop={() => undefined}
          stopLabel="Stop"
        />
      </div>
    </div>
  );
}
