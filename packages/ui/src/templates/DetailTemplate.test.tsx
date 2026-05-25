import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { DetailTemplate } from './DetailTemplate';

describe('DetailTemplate', () => {
  it('renders the title and primary content', () => {
    renderWithTheme(
      <DetailTemplate title="Ada Lovelace">
        <div>main content</div>
      </DetailTemplate>,
    );
    expect(screen.getByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByText('main content')).toBeInTheDocument();
  });

  it('renders the aside slot when provided', () => {
    renderWithTheme(
      <DetailTemplate title="Ada Lovelace" aside={<div>related panel</div>}>
        <div>main content</div>
      </DetailTemplate>,
    );
    expect(screen.getByText('related panel')).toBeInTheDocument();
    expect(screen.getByText('main content')).toBeInTheDocument();
  });
});
