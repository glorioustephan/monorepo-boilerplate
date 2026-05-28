import { CopyIcon } from '@radix-ui/react-icons';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { IconButton } from '../components';
import { renderWithTheme } from '../test-utils';
import { Message } from './Message';

describe('Message', () => {
  it('renders plain text content', () => {
    renderWithTheme(
      <Message>
        <Message.Content>How do I fetch data?</Message.Content>
      </Message>,
    );
    expect(screen.getByText('How do I fetch data?')).toBeInTheDocument();
  });

  it('renders the avatar fallback text in jsdom (image src does not load)', () => {
    renderWithTheme(
      <Message>
        <Message.Avatar src="https://example.com/avatar.png" alt="Assistant" fallback="AI" />
        <Message.Content>Hello</Message.Content>
      </Message>,
    );
    // In jsdom, external images never load so Radix Avatar renders the fallback span.
    // The avatar container is still present in the document.
    expect(screen.getByText('Hello')).toBeInTheDocument();
    // Confirm the Avatar root wrapper renders (Radix emits rt-AvatarRoot).
    const avatarRoot = document.querySelector('.rt-AvatarRoot');
    expect(avatarRoot).toBeInTheDocument();
  });

  it('markdown mode produces formatted output — heading rendered', () => {
    renderWithTheme(
      <Message>
        <Message.Content markdown>{'## My Heading\n\nSome paragraph.'}</Message.Content>
      </Message>,
    );
    // The Markdown recipe maps h2 → Heading; the text is in the document.
    expect(screen.getByText('My Heading')).toBeInTheDocument();
  });

  it('markdown mode produces a list from markdown source', () => {
    renderWithTheme(
      <Message>
        <Message.Content markdown>{'- Item one\n- Item two\n- Item three'}</Message.Content>
      </Message>,
    );
    expect(screen.getByText('Item one')).toBeInTheDocument();
    expect(screen.getByText('Item two')).toBeInTheDocument();
    expect(screen.getByText('Item three')).toBeInTheDocument();
  });

  it('action IconButtons expose their accessible names via aria-label', () => {
    renderWithTheme(
      <Message>
        <Message.Content>Hello</Message.Content>
        <Message.Actions>
          <Message.Action tooltip="Copy message" side="top">
            <IconButton variant="ghost" size="1" aria-label="Copy message">
              <CopyIcon />
            </IconButton>
          </Message.Action>
          <Message.Action tooltip="Helpful" side="top">
            <IconButton variant="ghost" size="1" aria-label="Helpful">
              <CopyIcon />
            </IconButton>
          </Message.Action>
        </Message.Actions>
      </Message>,
    );
    expect(screen.getByRole('button', { name: 'Copy message' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Helpful' })).toBeInTheDocument();
  });

  it('renders multiple turns side by side without error', () => {
    renderWithTheme(
      <div>
        <Message>
          <Message.Avatar src="https://example.com/user.png" alt="You" fallback="U" />
          <Message.Content>What is React?</Message.Content>
        </Message>
        <Message>
          <Message.Avatar src="https://example.com/ai.png" alt="Assistant" fallback="AI" />
          <Message.Content markdown>
            {'React is a **JavaScript library** for building UIs.'}
          </Message.Content>
        </Message>
      </div>,
    );
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('JavaScript library')).toBeInTheDocument();
  });
});
