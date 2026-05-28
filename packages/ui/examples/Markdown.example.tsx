import { Markdown } from '@monorepo-boilerplate/ui';

const SAMPLE_MARKDOWN = `## Getting started

This is a paragraph with **bold text**, \`inline code\`, and a [link](https://example.com).

- First item
- Second item
- Third item

| Name | Role |
|------|------|
| Alice | Engineer |
| Bob | Designer |

\`\`\`ts
interface Config {
  apiKey: string;
  timeout: number;
}

async function init(config: Config): Promise<void> {
  await connect(config.apiKey);
}
\`\`\`
`;

/**
 * Markdown demonstrates full GFM rendering: headings, bold, inline code, a link,
 * a bullet list, a table, and a fenced TypeScript block delegated to CodeBlock.
 */
export default function MarkdownExample() {
  return <Markdown>{SAMPLE_MARKDOWN}</Markdown>;
}
