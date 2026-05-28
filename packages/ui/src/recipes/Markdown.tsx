import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { Blockquote, Box, Code, Heading, Link, Table, Text } from '../components';
import { cn } from '../lib/cn';
import { CodeBlock, CodeBlockCode } from './CodeBlock';

/** Props for the Markdown renderer. */
export interface MarkdownProps {
  /** Raw markdown source string. */
  readonly children: string;
  /** Override or extend react-markdown component renderers. */
  readonly components?: Partial<Components>;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

function extractLanguage(className?: string): string {
  if (!className) return 'plaintext';
  const match = className.match(/language-(\w+)/);
  return match?.[1] ?? 'plaintext';
}

/**
 * Default react-markdown component overrides that map markdown elements to kit atoms.
 * Exported so callers can spread and extend them.
 */
const DEFAULT_COMPONENTS: Partial<Components> = {
  // Block code → CodeBlock + CodeBlockCode; inline code → Code atom
  code: function CodeComponent({ className, children, node }) {
    // Detect inline: single-line position in the AST
    const isInline = !node?.position || node.position.start.line === node.position.end.line;

    if (isInline) {
      return <Code variant="soft">{children}</Code>;
    }

    const language = extractLanguage(className);
    return (
      <CodeBlock>
        <CodeBlockCode code={String(children).replace(/\n$/, '')} language={language} />
      </CodeBlock>
    );
  },

  // Let CodeBlock own the surface; pre is a passthrough fragment
  pre: function PreComponent({ children }) {
    return <>{children}</>;
  },

  // Typography atoms
  a: function AnchorComponent({ href, children }) {
    return <Link href={href}>{children}</Link>;
  },

  p: function ParagraphComponent({ children }) {
    return <Text as="p">{children}</Text>;
  },

  h1: function H1Component({ children }) {
    return (
      <Heading as="h1" size="6">
        {children}
      </Heading>
    );
  },

  h2: function H2Component({ children }) {
    return (
      <Heading as="h2" size="5">
        {children}
      </Heading>
    );
  },

  h3: function H3Component({ children }) {
    return (
      <Heading as="h3" size="4">
        {children}
      </Heading>
    );
  },

  h4: function H4Component({ children }) {
    return (
      <Heading as="h4" size="3">
        {children}
      </Heading>
    );
  },

  h5: function H5Component({ children }) {
    return (
      <Heading as="h5" size="2">
        {children}
      </Heading>
    );
  },

  h6: function H6Component({ children }) {
    return (
      <Heading as="h6" size="1">
        {children}
      </Heading>
    );
  },

  blockquote: function BlockquoteComponent({ children }) {
    return <Blockquote>{children}</Blockquote>;
  },

  // Table atoms
  table: function TableComponent({ children }) {
    return <Table.Root>{children}</Table.Root>;
  },

  thead: function TheadComponent({ children }) {
    return <Table.Header>{children}</Table.Header>;
  },

  tbody: function TbodyComponent({ children }) {
    return <Table.Body>{children}</Table.Body>;
  },

  tr: function TrComponent({ children }) {
    return <Table.Row>{children}</Table.Row>;
  },

  th: function ThComponent({ children }) {
    return <Table.ColumnHeaderCell>{children}</Table.ColumnHeaderCell>;
  },

  td: function TdComponent({ children }) {
    return <Table.Cell>{children}</Table.Cell>;
  },
};

/**
 * Markdown — renders a markdown string into Radix Themes atoms.
 * Supports GFM (tables, strikethrough, task lists) and line breaks.
 * Fenced code blocks are delegated to CodeBlock for syntax highlighting.
 * Server-safe — no `"use client"` needed.
 * Use for assistant messages, documentation prose, or any markdown content.
 * Keywords: markdown, prose, code block, table, heading, gfm, react-markdown.
 */
export function Markdown({ children, components, className }: MarkdownProps) {
  const mergedComponents: Partial<Components> = {
    ...DEFAULT_COMPONENTS,
    ...components,
  };

  return (
    <Box className={cn('mb-markdown', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={mergedComponents}>
        {children}
      </ReactMarkdown>
    </Box>
  );
}
