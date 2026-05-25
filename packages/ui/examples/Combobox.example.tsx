'use client';

import { useState } from 'react';

import { Box, Combobox, type ComboboxOption, Field } from '@monorepo-boilerplate/ui';

const frameworks: readonly ComboboxOption[] = [
  { value: 'Next.js', label: 'Next.js', keywords: ['react'] },
  { value: 'Remix', label: 'Remix', keywords: ['react'] },
  { value: 'Astro', label: 'Astro' },
  { value: 'SvelteKit', label: 'SvelteKit', keywords: ['svelte'] },
  { value: 'Nuxt', label: 'Nuxt', keywords: ['vue'] },
  { value: 'SolidStart', label: 'SolidStart', keywords: ['solid'] },
];

/** Combobox provides a filterable, keyboard-navigable autocomplete for free-text fields. */
export default function ComboboxExample() {
  const [value, setValue] = useState('');
  return (
    <Box width="320px">
      <Field label="Framework" htmlFor="framework">
        <Combobox
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Search frameworks…"
        />
      </Field>
    </Box>
  );
}
