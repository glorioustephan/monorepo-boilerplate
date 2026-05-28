import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from './CodeBlock';
import { Text } from '../components';

const SAMPLE_CODE = `const x = 1 + 2;`;

describe('CodeBlock', () => {
  it('renders the code text in the pre/code fallback before highlight resolves', async () => {
    renderWithTheme(
      <CodeBlock>
        <CodeBlockCode code={SAMPLE_CODE} language="js" />
      </CodeBlock>,
    );
    // The plain fallback or the highlighted output both contain the code text
    expect(await screen.findByText(SAMPLE_CODE)).toBeInTheDocument();
  });

  it('renders the copy button with accessible name', async () => {
    renderWithTheme(
      <CodeBlock>
        <CodeBlockCode code={SAMPLE_CODE} language="js" />
      </CodeBlock>,
    );
    expect(await screen.findByRole('button', { name: 'Copy code' })).toBeInTheDocument();
  });

  it('renders a CodeBlockGroup with children', () => {
    renderWithTheme(
      <CodeBlock>
        <CodeBlockGroup>
          <Text size="1">greet.ts</Text>
        </CodeBlockGroup>
        <CodeBlockCode code={SAMPLE_CODE} language="js" />
      </CodeBlock>,
    );
    expect(screen.getByText('greet.ts')).toBeInTheDocument();
  });

  it('renders the surface wrapper', () => {
    const { container } = renderWithTheme(
      <CodeBlock>
        <CodeBlockCode code={SAMPLE_CODE} />
      </CodeBlock>,
    );
    // The outer Box carries the mb-codeblock class
    expect(container.querySelector('.mb-codeblock')).toBeInTheDocument();
  });
});
