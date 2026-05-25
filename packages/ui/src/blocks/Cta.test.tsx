import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { Cta } from './Cta';

describe('Cta', () => {
  it('renders the title and actions', () => {
    renderWithTheme(<Cta title="Ready?" actions={<Button>Start</Button>} />);
    expect(screen.getByRole('heading', { name: 'Ready?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });
});
