import { useState } from 'react';

import { Banner, Link } from '@monorepo-boilerplate/ui';

/** Banner renders a dismissible announcement bar with a tinted background and action slot. */
export default function BannerExample() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Link href="#" onClick={() => setVisible(true)}>
        Show banner again
      </Link>
    );
  }

  return (
    <Banner
      color="indigo"
      action={
        <Link href="#" size="2" weight="medium">
          Learn more →
        </Link>
      }
      onDismiss={() => setVisible(false)}
    >
      We just launched multi-workspace support — collaborate across teams in one place.
    </Banner>
  );
}
