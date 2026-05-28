import { CodeBlock, CodeBlockCode, CodeBlockGroup, Text } from '@monorepo-boilerplate/ui';

const SAMPLE_CODE = `interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json() as Promise<User>;
}`;

/**
 * CodeBlock demonstrates a TypeScript snippet inside a group with a filename label and a copy button.
 * The code is syntax-highlighted via Shiki with dual light/dark theme support.
 */
export default function CodeBlockExample() {
  return (
    <CodeBlock>
      <CodeBlockGroup>
        <Text size="1" color="gray" style={{ padding: '8px 16px' }}>
          user.ts
        </Text>
      </CodeBlockGroup>
      <CodeBlockCode code={SAMPLE_CODE} language="ts" />
    </CodeBlock>
  );
}
