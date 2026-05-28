'use client';

import { FileUpload } from '@monorepo-boilerplate/ui';

/** FileUpload demonstrates a trigger button and the drag-and-drop overlay. */
export default function FileUploadExample() {
  return (
    <FileUpload onFilesAdded={() => undefined} multiple>
      <FileUpload.Trigger>Upload files</FileUpload.Trigger>
      <FileUpload.Content>
        <span>Drop files here</span>
      </FileUpload.Content>
    </FileUpload>
  );
}
