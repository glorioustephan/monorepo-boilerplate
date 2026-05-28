import { Chatbot, type ChatMessage } from '@monorepo-boilerplate/ui';

// ---------------------------------------------------------------------------
// Mock streamer — no network; works offline in Storybook and tests.
// ---------------------------------------------------------------------------

async function* mockStream(chunks: readonly string[]): AsyncIterable<string> {
  for (const chunk of chunks) {
    yield chunk;
    await new Promise<void>((resolve) => setTimeout(resolve, 40));
  }
}

function mockOnSend(text: string): AsyncIterable<string> {
  const lower = text.toLowerCase();

  if (lower.includes('code') || lower.includes('typescript')) {
    return mockStream([
      'Sure! Here is a TypeScript example:\n\n',
      '```ts\n',
      'function greet(name: string): string {\n',
      '  return `Hello, ${name}!`;\n',
      '}\n',
      '```\n\n',
      'The `greet` function takes a **string** parameter and returns a greeting.',
    ]);
  }

  return mockStream([
    "That's a great question! ",
    'Here is what I know:\n\n',
    '- **Point one**: context matters\n',
    '- **Point two**: always check the docs\n\n',
    'Let me know if you need more detail.',
  ]);
}

// ---------------------------------------------------------------------------
// Pre-seeded messages (demonstrates bubbles, markdown, code block)
// ---------------------------------------------------------------------------

const SEEDED_MESSAGES: readonly ChatMessage[] = [
  { id: 's1', role: 'user', content: 'Show me a TypeScript code example' },
  {
    id: 's2',
    role: 'assistant',
    content: `Here's a simple TypeScript function:

\`\`\`ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3)); // 5
\`\`\`

You can also use **generics**:

\`\`\`ts
function identity<T>(value: T): T {
  return value;
}
\`\`\`
`,
  },
  { id: 's3', role: 'user', content: 'What about interfaces?' },
  {
    id: 's4',
    role: 'assistant',
    content:
      'Use **`interface`** for object shapes that may be extended, and **`type`** for unions, intersections, and aliases.',
  },
];

const SUGGESTIONS = [
  'Explain TypeScript generics',
  'Show me a React component',
  'What is a union type?',
  'How does async/await work?',
];

/** Chatbot example — seeded conversation demonstrating bubbles, markdown, and code blocks. */
export function ChatbotSeededExample() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Chatbot
        initialMessages={SEEDED_MESSAGES}
        onSend={mockOnSend}
        suggestions={SUGGESTIONS}
        placeholder="Ask anything…"
      />
    </div>
  );
}

/** Chatbot example — empty state with suggestion pills. */
export function ChatbotEmptyExample() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Chatbot onSend={mockOnSend} suggestions={SUGGESTIONS} placeholder="Ask anything…" />
    </div>
  );
}

export default ChatbotSeededExample;
