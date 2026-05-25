import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { SettingsTemplate } from './SettingsTemplate';

describe('SettingsTemplate', () => {
  it('renders children when no nav is provided', () => {
    renderWithTheme(
      <SettingsTemplate title="Settings">
        <p>Settings content</p>
      </SettingsTemplate>,
    );
    expect(screen.getByText('Settings content')).toBeInTheDocument();
  });

  it('renders the title via PageHeading', () => {
    renderWithTheme(
      <SettingsTemplate title="My Settings">
        <p>Content</p>
      </SettingsTemplate>,
    );
    expect(screen.getByRole('heading', { name: 'My Settings' })).toBeInTheDocument();
  });

  it('renders description text when provided', () => {
    renderWithTheme(
      <SettingsTemplate title="Settings" description="Manage your preferences.">
        <p>Content</p>
      </SettingsTemplate>,
    );
    expect(screen.getByText('Manage your preferences.')).toBeInTheDocument();
  });

  it('renders the nav slot when provided', () => {
    renderWithTheme(
      <SettingsTemplate title="Settings" nav={<nav>Section nav</nav>}>
        <p>Content</p>
      </SettingsTemplate>,
    );
    expect(screen.getByText('Section nav')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders breadcrumbs when provided', () => {
    renderWithTheme(
      <SettingsTemplate title="Settings" breadcrumbs={<nav>Breadcrumbs</nav>}>
        <p>Content</p>
      </SettingsTemplate>,
    );
    expect(screen.getByText('Breadcrumbs')).toBeInTheDocument();
  });

  it('renders no heading when title, description, and breadcrumbs are all omitted', () => {
    renderWithTheme(
      <SettingsTemplate>
        <p>Content only</p>
      </SettingsTemplate>,
    );
    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.getByText('Content only')).toBeInTheDocument();
  });
});
