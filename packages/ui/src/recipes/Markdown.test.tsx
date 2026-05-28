import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Markdown } from './Markdown';

describe('Markdown', () => {
  it('renders a heading', async () => {
    renderWithTheme(<Markdown>{'## Hello world'}</Markdown>);
    expect(await screen.findByText('Hello world')).toBeInTheDocument();
  });

  it('renders a bullet list', async () => {
    renderWithTheme(<Markdown>{'- First item\n- Second item\n- Third item'}</Markdown>);
    expect(await screen.findByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Second item')).toBeInTheDocument();
    expect(screen.getByText('Third item')).toBeInTheDocument();
  });

  it('renders inline code via the Code atom', async () => {
    renderWithTheme(<Markdown>{'Use `useState` for state.'}</Markdown>);
    const codeEl = await screen.findByText('useState');
    expect(codeEl.tagName.toLowerCase()).toBe('code');
  });

  it('renders a fenced code block via CodeBlock (pre element present)', async () => {
    renderWithTheme(<Markdown>{'```ts\nconst x = 1;\n```'}</Markdown>);
    // CodeBlockCode renders a <pre><code> fallback while shiki highlights
    const pre = await screen.findByText('const x = 1;', { selector: 'code' });
    expect(pre).toBeInTheDocument();
  });

  it('renders the copy button inside a fenced code block', async () => {
    renderWithTheme(<Markdown>{'```js\nconsole.log("hi");\n```'}</Markdown>);
    expect(await screen.findByRole('button', { name: 'Copy code' })).toBeInTheDocument();
  });

  it('renders a link with the correct href', async () => {
    renderWithTheme(<Markdown>{'Visit [example](https://example.com) now.'}</Markdown>);
    const link = await screen.findByRole('link', { name: 'example' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders bold text', async () => {
    renderWithTheme(<Markdown>{'This is **bold** text.'}</Markdown>);
    const bold = await screen.findByText('bold');
    expect(bold.tagName.toLowerCase()).toBe('strong');
  });

  it('accepts a className on the root wrapper', () => {
    const { container } = renderWithTheme(<Markdown className="custom-prose">{'Hello'}</Markdown>);
    expect(container.querySelector('.custom-prose')).toBeInTheDocument();
  });
});
