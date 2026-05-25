import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../components';
import { renderWithTheme } from '../test-utils';
import { Drawer } from './Drawer';

function Example() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>
        <Button>Open</Button>
      </Drawer.Trigger>
      <Drawer.Content title="Settings" description="Manage your settings">
        <p>Body content</p>
      </Drawer.Content>
    </Drawer.Root>
  );
}

describe('Drawer', () => {
  it('opens on trigger click and shows title, description, and body', () => {
    renderWithTheme(<Example />);
    expect(screen.queryByText('Body content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Manage your settings')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('exposes a close control', () => {
    renderWithTheme(<Example />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
