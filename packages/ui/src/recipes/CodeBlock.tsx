'use client';

import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { type ReactNode, useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

import { Box, Flex, IconButton } from '../components';
import { cn } from '../lib/cn';

/** Props for the CodeBlock surface wrapper. */
export interface CodeBlockProps {
  /** Content to render inside the code block (typically CodeBlockGroup + CodeBlockCode). */
  readonly children?: ReactNode;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/** Props for the highlighted code renderer. */
export interface CodeBlockCodeProps {
  /** Raw source code to highlight. */
  readonly code: string;
  /** Shiki language identifier. Defaults to `'tsx'`. */
  readonly language?: string;
  /** Extra class names merged onto the pre-wrapper element. */
  readonly className?: string;
}

/** Props for the header row (filename + controls). */
export interface CodeBlockGroupProps {
  /** Content to render inside the group — typically a filename label and a copy button. */
  readonly children: ReactNode;
  /** Extra class names merged onto the root element. */
  readonly className?: string;
}

/** How long (ms) to show the check icon after copying. */
const COPY_RESET_MS = 1500;

/**
 * CodeBlockGroup — header row for a CodeBlock, renders filename and action controls side by side.
 * Use inside CodeBlock before CodeBlockCode to show a toolbar.
 * Keywords: code, header, filename, copy, toolbar.
 */
export function CodeBlockGroup({ children, className }: CodeBlockGroupProps) {
  return (
    <Flex justify="between" align="center" className={cn('mb-codeblock-group', className)}>
      {children}
    </Flex>
  );
}

/**
 * CodeBlockCode — syntax-highlighted source code panel powered by Shiki.
 * Renders a plain `<pre><code>` fallback before the async highlight resolves to prevent layout shift.
 * Use inside CodeBlock to display highlighted code with dual light/dark theme support.
 * Keywords: code, syntax, highlight, shiki, dark mode, language.
 */
export function CodeBlockCode({ code, language = 'tsx', className }: CodeBlockCodeProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function highlight() {
      if (!code) {
        if (!cancelled) setHighlightedHtml('<pre><code></code></pre>');
        return;
      }
      const html = await codeToHtml(code, {
        lang: language,
        themes: { light: 'github-light-default', dark: 'github-dark-default' },
        defaultColor: false,
      });
      if (!cancelled) setHighlightedHtml(html);
    }
    void highlight();
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  function handleCopy() {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_RESET_MS);
    });
  }

  return (
    <Box position="relative" className={cn('mb-codeblock-pre', className)}>
      <IconButton
        variant="ghost"
        size="1"
        aria-label="Copy code"
        onClick={handleCopy}
        style={{ position: 'absolute', top: 8, right: 8 }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </IconButton>

      {highlightedHtml ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted shiki output
        <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      ) : (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    </Box>
  );
}

/**
 * CodeBlock — bordered surface wrapper for a syntax-highlighted code snippet.
 * Use with CodeBlock.Group (header row) and CodeBlock.Code (highlighted source).
 * Supports compound usage: `<CodeBlock><CodeBlock.Group>…</CodeBlock.Group><CodeBlock.Code … /></CodeBlock>`.
 * Keywords: code, syntax highlight, shiki, copy, dark mode, filename, block.
 */
export function CodeBlock({ children, className }: CodeBlockProps) {
  return <Box className={cn('mb-codeblock', className)}>{children}</Box>;
}

// Compound namespace — attach parts so callers can use CodeBlock.Code / CodeBlock.Group.
CodeBlock.Code = CodeBlockCode;
CodeBlock.Group = CodeBlockGroup;
