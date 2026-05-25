import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithTheme } from '../test-utils';
import { Notification, NotificationRegion } from './Notification';

describe('Notification', () => {
  it('renders the title', () => {
    renderWithTheme(<Notification title="Update available">Details here.</Notification>);
    expect(screen.getByText('Update available')).toBeInTheDocument();
  });

  it('renders the body children', () => {
    renderWithTheme(<Notification title="Info">Notification body content.</Notification>);
    expect(screen.getByText('Notification body content.')).toBeInTheDocument();
  });

  it('renders the dismiss button when onDismiss is provided', () => {
    renderWithTheme(
      <Notification title="Alert" onDismiss={() => undefined}>
        Body.
      </Notification>,
    );
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('calls onDismiss when the dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    renderWithTheme(
      <Notification title="Alert" onDismiss={onDismiss}>
        Body.
      </Notification>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('does not render a dismiss button when onDismiss is omitted', () => {
    renderWithTheme(<Notification title="Alert">Body.</Notification>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('uses a custom dismissLabel for the button aria-label', () => {
    renderWithTheme(
      <Notification title="Alert" onDismiss={() => undefined} dismissLabel="Close notification">
        Body.
      </Notification>,
    );
    expect(screen.getByRole('button', { name: 'Close notification' })).toBeInTheDocument();
  });
});

describe('NotificationRegion', () => {
  it('portals children into document.body with role="region"', () => {
    renderWithTheme(
      <NotificationRegion>
        <Notification title="Portaled toast">Body.</Notification>
      </NotificationRegion>,
    );
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
    expect(document.body).toContainElement(region);
  });

  it('uses the default aria-label "Notifications"', () => {
    renderWithTheme(
      <NotificationRegion>
        <span>Toast</span>
      </NotificationRegion>,
    );
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('uses a custom aria-label when label prop is provided', () => {
    renderWithTheme(
      <NotificationRegion label="Alert stack">
        <span>Toast</span>
      </NotificationRegion>,
    );
    expect(screen.getByRole('region', { name: 'Alert stack' })).toBeInTheDocument();
  });

  it('sets the data-position attribute on the region', () => {
    renderWithTheme(
      <NotificationRegion position="top-left">
        <span>Toast</span>
      </NotificationRegion>,
    );
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('data-position', 'top-left');
  });
});
