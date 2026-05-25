import { useState } from 'react';

import { CheckCircledIcon, Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons';

import { Button, Notification, NotificationRegion } from '@monorepo-boilerplate/ui';

interface NotificationItem {
  id: string;
  kind: 'success' | 'info';
}

/** NotificationExample — demonstrates NotificationRegion with dismiss and action toasts. */
export default function NotificationExample() {
  const [items, setItems] = useState<NotificationItem[]>([
    { id: 'success-1', kind: 'success' },
    { id: 'info-1', kind: 'info' },
  ]);

  const dismiss = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <NotificationRegion position="bottom-right">
      {items.map((item) => {
        if (item.kind === 'success') {
          return (
            <Notification
              key={item.id}
              title="Changes saved"
              color="green"
              icon={<CheckCircledIcon />}
              dismissIcon={<Cross2Icon />}
              onDismiss={() => dismiss(item.id)}
            >
              Your project settings have been updated successfully.
            </Notification>
          );
        }

        return (
          <Notification
            key={item.id}
            title="New features available"
            color="blue"
            icon={<InfoCircledIcon />}
            action={
              <Button size="1" variant="soft" color="blue">
                Learn more
              </Button>
            }
          >
            We shipped improvements to the dashboard. Check out what&apos;s new.
          </Notification>
        );
      })}
    </NotificationRegion>
  );
}
