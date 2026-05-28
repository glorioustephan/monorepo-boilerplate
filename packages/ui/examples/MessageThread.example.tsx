import { MessageThread } from '@monorepo-boilerplate/ui';

const MESSAGES = [
  {
    id: '1',
    role: 'user' as const,
    content: 'Can you show me a TypeScript example?',
  },
  {
    id: '2',
    role: 'assistant' as const,
    content: `Sure! Here's a simple typed function:

## Typed function

\`\`\`ts
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

You can also use **generics** for more flexibility:

- \`Array<T>\` for typed lists
- \`Record<K, V>\` for typed maps
- \`Promise<T>\` for async work
`,
  },
  {
    id: '3',
    role: 'system' as const,
    content: 'Context window is 80% full.',
  },
  {
    id: '4',
    role: 'user' as const,
    content: 'What about interfaces vs types?',
  },
  {
    id: '5',
    role: 'assistant' as const,
    content: `Great question! Use **interface** for object shapes that may be extended, and **type** for unions, intersections, and mapped types.`,
  },
];

/** MessageThread example — user/assistant exchange with markdown, a code block, and a system message. */
export default function MessageThreadExample() {
  return (
    <div style={{ maxWidth: 720, padding: '2rem', margin: '0 auto' }}>
      <MessageThread messages={MESSAGES} />
    </div>
  );
}
