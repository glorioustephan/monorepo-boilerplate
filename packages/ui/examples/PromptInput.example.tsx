'use client';

import { PaperPlaneIcon, UploadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import {
  IconButton,
  PromptInput,
  PromptInputActions,
  PromptInputAction,
  PromptInputTextarea,
} from '@monorepo-boilerplate/ui';

/**
 * PromptInput demonstrates a chat composer with an auto-sizing textarea,
 * an attach action, and a send button. Enter submits; Shift+Enter adds a newline.
 */
export default function PromptInputExample() {
  const [value, setValue] = useState('');

  function handleSubmit() {
    if (value.trim()) {
      // eslint-disable-next-line no-alert
      alert(`Submitted: ${value}`);
      setValue('');
    }
  }

  return (
    <PromptInput value={value} onValueChange={setValue} onSubmit={handleSubmit}>
      <PromptInputTextarea placeholder="Ask anything…" />
      <PromptInputActions>
        <PromptInputAction tooltip="Attach file" side="top">
          <IconButton variant="ghost" size="2" aria-label="Attach file">
            <UploadIcon />
          </IconButton>
        </PromptInputAction>
        <PromptInputAction tooltip="Send message" side="top">
          <IconButton
            variant="solid"
            size="2"
            aria-label="Send message"
            onClick={handleSubmit}
            disabled={!value.trim()}
          >
            <PaperPlaneIcon />
          </IconButton>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
}
