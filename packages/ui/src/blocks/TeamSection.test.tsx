import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { TeamSection } from './TeamSection';

const MEMBERS = [
  { id: 'alice', name: 'Alice Chen', role: 'CEO', bio: 'Builder.' },
  { id: 'ben', name: 'Ben Okafor', role: 'CTO' },
] as const;

describe('TeamSection', () => {
  it('renders the section title', () => {
    renderWithTheme(<TeamSection members={[]} title="Meet the team" />);
    expect(screen.getByRole('heading', { name: 'Meet the team' })).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    renderWithTheme(<TeamSection members={[]} title="Team" description="Our talented crew." />);
    expect(screen.getByText('Our talented crew.')).toBeInTheDocument();
  });

  it('renders a heading for each member', () => {
    renderWithTheme(<TeamSection members={MEMBERS} />);
    expect(screen.getByRole('heading', { name: 'Alice Chen' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ben Okafor' })).toBeInTheDocument();
  });

  it('renders member role and bio', () => {
    renderWithTheme(<TeamSection members={MEMBERS} />);
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('Builder.')).toBeInTheDocument();
  });

  it('renders member avatar and socials slots', () => {
    renderWithTheme(
      <TeamSection
        members={[
          {
            id: 'x',
            name: 'X',
            avatar: <span>avatar-slot</span>,
            socials: <a href="https://example.com">social-link</a>,
          },
        ]}
      />,
    );
    expect(screen.getByText('avatar-slot')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'social-link' })).toBeInTheDocument();
  });

  it('renders nothing when members array is empty', () => {
    renderWithTheme(<TeamSection members={[]} title="Team" />);
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });
});
