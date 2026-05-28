import { ResponseStream } from '@monorepo-boilerplate/ui';

const SAMPLE_TEXT =
  'Large language models work by predicting the next token in a sequence, given all prior context. ' +
  'Training on vast corpora teaches the model statistical patterns in language, which it generalises ' +
  'to answer questions, write code, or summarise documents.';

/** ResponseStream demonstrates progressive text reveal in typewriter mode. */
export default function ResponseStreamExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '480px' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Typewriter mode</p>
        <ResponseStream textStream={SAMPLE_TEXT} mode="typewriter" speed={40} />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Fade mode</p>
        <ResponseStream textStream={SAMPLE_TEXT} mode="fade" speed={40} />
      </div>
    </div>
  );
}
