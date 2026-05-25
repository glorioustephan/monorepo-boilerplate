import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { IconButton } from '../components';
import { renderWithTheme } from '../test-utils';
import { CardHeading } from './CardHeading';

describe('CardHeading', () => {
  it('renders the title as an h3', () => {
    renderWithTheme(<CardHeading title="Ada Lovelace" />);
    expect(screen.getByRole('heading', { name: 'Ada Lovelace', level: 3 })).toBeInTheDocument();
  });

  it('renders optional description', () => {
    renderWithTheme(<CardHeading title="Ada Lovelace" description="Engineering · Lead" />);
    expect(screen.getByText('Engineering · Lead')).toBeInTheDocument();
  });

  it('renders avatar slot', () => {
    renderWithTheme(
      <CardHeading title="Ada Lovelace" avatar={<span data-testid="avatar">AL</span>} />,
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    renderWithTheme(
      <CardHeading
        title="Ada Lovelace"
        actions={<IconButton aria-label="More options">…</IconButton>}
      />,
    );
    expect(screen.getByRole('button', { name: 'More options' })).toBeInTheDocument();
  });

  it('merges a custom className', () => {
    const { container } = renderWithTheme(
      <CardHeading title="Ada Lovelace" className="custom-class" />,
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
