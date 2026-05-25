import type { Meta, StoryObj } from '@storybook/react-vite';

import SettingsTemplateExample from '../../examples/SettingsTemplate.example';
import { ActionPanel } from '../recipes/ActionPanel';
import { FormLayout } from '../recipes/FormLayout';
import { SettingsTemplate } from './SettingsTemplate';

const meta = {
  title: 'Templates/SettingsTemplate',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Full settings page — page heading, vertical nav sidebar, form sections, and action panels. */
export const Default: Story = {
  render: () => <SettingsTemplateExample />,
};

/** Without a nav sidebar — content spans the full container width. */
export const NoNav: Story = {
  render: () => (
    <SettingsTemplate title="Preferences" description="Manage your application preferences.">
      <FormLayout title="Display" description="Adjust display settings." footer={<></>}>
        <></>
      </FormLayout>
      <ActionPanel
        title="Reset all settings"
        description="Restore all settings to their defaults."
      />
    </SettingsTemplate>
  ),
};
