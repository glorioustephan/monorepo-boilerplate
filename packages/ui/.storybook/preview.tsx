import './preview.css';

import { Theme } from '@radix-ui/themes';
import type { Decorator, Preview } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

import {
  ACCENT_COLORS,
  GRAY_COLORS,
  RADIUS_OPTIONS,
  SCALING_OPTIONS,
} from '../src/themes/theme-controls';

type ThemeComponentProps = ComponentProps<typeof Theme>;

/** Wrap every story in a Radix Theme driven by the toolbar globals (live theming). */
const withTheme: Decorator = (Story, context) => {
  const { appearance, accentColor, grayColor, radius, scaling } = context.globals;
  return (
    <Theme
      appearance={appearance as ThemeComponentProps['appearance']}
      accentColor={accentColor as ThemeComponentProps['accentColor']}
      grayColor={grayColor as ThemeComponentProps['grayColor']}
      radius={radius as ThemeComponentProps['radius']}
      scaling={scaling as ThemeComponentProps['scaling']}
    >
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    </Theme>
  );
};

const toItems = (values: readonly string[]) => values.map((value) => ({ value, title: value }));

const preview: Preview = {
  parameters: {
    // Only auto-detect date controls. The default `color` matcher is intentionally omitted:
    // the kit's `color` props are Radix accent-name enums (e.g. "grass"), not CSS colors, so a
    // color picker would be wrong — they get a select/text control from their prop type instead.
    controls: { matchers: { date: /Date$/i } },
    // addon-a11y runs axe on every story. Report-only mode here: violations surface in the
    // Storybook a11y panel and the story-test run but do not fail it — the right adoption mode
    // for a component library, where bare-primitive showcases trip rules real usage resolves
    // via <Field>/page landmarks. The hard gate is that every story RENDERS; raise a story to a
    // failing a11y check via its own `parameters.a11y` once triaged.
    a11y: { test: 'todo' },
  },
  initialGlobals: {
    appearance: 'light',
    accentColor: 'indigo',
    grayColor: 'auto',
    radius: 'medium',
    scaling: '100%',
  },
  globalTypes: {
    appearance: {
      description: 'Light / dark appearance',
      toolbar: {
        title: 'Appearance',
        icon: 'circlehollow',
        items: toItems(['light', 'dark']),
        dynamicTitle: true,
      },
    },
    accentColor: {
      description: 'Accent color (Radix palette + custom brand)',
      toolbar: {
        title: 'Accent',
        icon: 'paintbrush',
        items: toItems([...ACCENT_COLORS]),
        dynamicTitle: true,
      },
    },
    grayColor: {
      description: 'Gray scale',
      toolbar: {
        title: 'Gray',
        icon: 'contrast',
        items: toItems([...GRAY_COLORS]),
        dynamicTitle: true,
      },
    },
    radius: {
      description: 'Corner radius',
      toolbar: {
        title: 'Radius',
        icon: 'component',
        items: toItems([...RADIUS_OPTIONS]),
        dynamicTitle: true,
      },
    },
    scaling: {
      description: 'UI scaling',
      toolbar: {
        title: 'Scaling',
        icon: 'ruler',
        items: toItems([...SCALING_OPTIONS]),
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
