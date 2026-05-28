import type { Meta, StoryObj } from '@storybook/react-vite';

import FileUploadExample from '../../examples/FileUpload.example';
import { FileUpload } from './FileUpload';

const meta = {
  title: 'Recipes/Chat/FileUpload',
  component: FileUpload,
  // onFilesAdded and children are required — satisfy them at the meta level.
  args: {
    onFilesAdded: () => undefined,
    children: null,
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default upload button + drag overlay. Mirrors the catalog example. */
export const Default: Story = {
  render: () => <FileUploadExample />,
};

/** Single-file picker. */
export const SingleFile: Story = {
  render: () => (
    <FileUpload onFilesAdded={() => undefined} multiple={false} accept="image/*">
      <FileUpload.Trigger>Upload image</FileUpload.Trigger>
      <FileUpload.Content>
        <span>Drop an image here</span>
      </FileUpload.Content>
    </FileUpload>
  ),
};

/** Disabled state — the trigger and drag handler are both inert. */
export const Disabled: Story = {
  render: () => (
    <FileUpload onFilesAdded={() => undefined} disabled>
      <FileUpload.Trigger>Upload files</FileUpload.Trigger>
      <FileUpload.Content>
        <span>Drop files here</span>
      </FileUpload.Content>
    </FileUpload>
  ),
};
