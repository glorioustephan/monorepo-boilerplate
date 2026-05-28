import { PromptSuggestion } from '@monorepo-boilerplate/ui';

const SUGGESTIONS = [
  'Summarise this document',
  'Write a haiku about the ocean',
  'Explain quantum entanglement',
  'Help me debug my code',
];

const HIGHLIGHT_SUGGESTIONS = [
  'How do I use React hooks?',
  'What are the React best practices?',
  'Show me a React component example',
];

/** PromptSuggestion shows pill-style suggestions and highlight-mode typeahead matches. */
export default function PromptSuggestionExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '480px' }}>
      <div>
        <p style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Pill suggestions</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {SUGGESTIONS.map((s) => (
            <PromptSuggestion key={s} onClick={() => undefined}>
              {s}
            </PromptSuggestion>
          ))}
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '0.75rem', fontWeight: 600 }}>
          Highlight mode — matching &ldquo;React&rdquo;
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {HIGHLIGHT_SUGGESTIONS.map((s) => (
            <PromptSuggestion key={s} highlight="React" onClick={() => undefined}>
              {s}
            </PromptSuggestion>
          ))}
        </div>
      </div>
    </div>
  );
}
