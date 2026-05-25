import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('renders the title as an h2 by default', () => {
    renderWithTheme(<SectionHeading title="Team members" />);
    expect(screen.getByRole('heading', { name: 'Team members', level: 2 })).toBeInTheDocument();
  });

  it('renders the title as h3 when as="h3"', () => {
    renderWithTheme(<SectionHeading title="Linked accounts" as="h3" />);
    expect(screen.getByRole('heading', { name: 'Linked accounts', level: 3 })).toBeInTheDocument();
  });

  it('renders optional description', () => {
    renderWithTheme(<SectionHeading title="Team members" description="Manage who has access." />);
    expect(screen.getByText('Manage who has access.')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    renderWithTheme(
      <SectionHeading title="Team members" actions={<Button>Invite member</Button>} />,
    );
    expect(screen.getByRole('button', { name: 'Invite member' })).toBeInTheDocument();
  });

  it('merges a custom className', () => {
    const { container } = renderWithTheme(
      <SectionHeading title="Team members" className="custom-class" />,
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
