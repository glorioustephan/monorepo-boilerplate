'use client';

import {
  Children,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { UploadIcon } from '@radix-ui/react-icons';

import { Box, Button } from '../components';
import { cn } from '../lib/cn';

interface FileUploadContextValue {
  readonly isDragging: boolean;
  readonly inputRef: React.RefObject<HTMLInputElement | null>;
  readonly multiple?: boolean;
  readonly disabled?: boolean;
}

const FileUploadContext = createContext<FileUploadContextValue | null>(null);

function useFileUploadContext(): FileUploadContextValue {
  const ctx = useContext(FileUploadContext);
  if (!ctx) throw new Error('FileUpload.* must be used inside <FileUpload>');
  return ctx;
}

/** Props for the `FileUpload` compound root. */
export interface FileUploadProps {
  /** Compound children — compose `FileUpload.Trigger` and `FileUpload.Content`. */
  readonly children: ReactNode;
  /** Called with the accepted `File` array when the user picks or drops files. */
  readonly onFilesAdded: (files: readonly File[]) => void;
  /** Allow selecting more than one file at once. Default `true`. */
  readonly multiple?: boolean;
  /** MIME type / extension filter passed to the hidden `<input>`. */
  readonly accept?: string;
  /** Disable the trigger and suppress drag handling. Default `false`. */
  readonly disabled?: boolean;
}

/** Props for `FileUpload.Trigger`. */
export interface FileUploadTriggerProps {
  /** Compound children rendered inside the trigger button. */
  readonly children: ReactNode;
  /**
   * When `true`, clones the single child element and wires click → file dialog instead of
   * rendering a kit `Button`. Useful when the caller wants to own the trigger appearance.
   */
  readonly asChild?: boolean;
  readonly className?: string;
}

/** Props for `FileUpload.Content` — the drag-overlay portal. */
export interface FileUploadContentProps {
  /** Drop-zone body content (e.g. "Drop files here"). */
  readonly children?: ReactNode;
  readonly className?: string;
}

function FileUploadRoot({
  children,
  onFilesAdded,
  multiple = true,
  accept,
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleFiles = useCallback(
    (files: FileList) => {
      const all = Array.from(files);
      onFilesAdded(multiple ? all : all.slice(0, 1));
    },
    [multiple, onFilesAdded],
  );

  useEffect(() => {
    if (disabled) return;

    const handleDrag = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragIn = (e: DragEvent) => {
      handleDrag(e);
      dragCounter.current++;
      if (e.dataTransfer?.items.length) setIsDragging(true);
    };

    const handleDragOut = (e: DragEvent) => {
      handleDrag(e);
      dragCounter.current--;
      if (dragCounter.current === 0) setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      handleDrag(e);
      setIsDragging(false);
      dragCounter.current = 0;
      if (e.dataTransfer?.files.length) {
        handleFiles(e.dataTransfer.files);
      }
    };

    window.addEventListener('dragenter', handleDragIn);
    window.addEventListener('dragleave', handleDragOut);
    window.addEventListener('dragover', handleDrag);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragIn);
      window.removeEventListener('dragleave', handleDragOut);
      window.removeEventListener('dragover', handleDrag);
      window.removeEventListener('drop', handleDrop);
    };
  }, [disabled, handleFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
      // Reset the value so the same file can be selected again.
      e.target.value = '';
    }
  };

  return (
    <FileUploadContext.Provider value={{ isDragging, inputRef, multiple, disabled }}>
      {/* Hidden input — aria-hidden because FileUpload.Trigger is the labeled control. */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple={multiple}
        accept={accept}
        aria-hidden
        disabled={disabled}
      />
      {children}
    </FileUploadContext.Provider>
  );
}

function FileUploadTrigger({ asChild = false, children, className }: FileUploadTriggerProps) {
  const { inputRef, disabled } = useFileUploadContext();

  const handleClick = () => {
    inputRef.current?.click();
  };

  if (asChild) {
    const child = Children.only(children) as ReactElement<React.HTMLAttributes<HTMLElement>>;
    return cloneElement(child, {
      ...child.props,
      role: 'button',
      className: cn(className, child.props.className),
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        handleClick();
        child.props.onClick?.(e);
      },
    });
  }

  return (
    <Button variant="surface" disabled={disabled} className={className} onClick={handleClick}>
      <UploadIcon />
      {children}
    </Button>
  );
}

function FileUploadContent({ children, className }: FileUploadContentProps) {
  const { isDragging, disabled } = useFileUploadContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isDragging || !mounted || disabled) return null;

  const overlay = (
    <Box className={cn('mb-file-upload-overlay', className)}>
      <Box className="mb-file-upload-zone">{children}</Box>
    </Box>
  );

  return createPortal(overlay, document.body);
}

/**
 * FileUpload — compound drag-and-drop / click-to-browse file picker. `FileUpload.Trigger` shows a
 * branded upload button (or wraps a caller control via `asChild`); `FileUpload.Content` renders a
 * full-screen portal drop overlay while the user drags files over the window. Window-level drag
 * listeners are wired automatically. Use in chat composers for attachment support. Keywords: file
 * upload, drag and drop, drop zone, file input, attachment, chat.
 */
export const FileUpload = Object.assign(FileUploadRoot, {
  Trigger: FileUploadTrigger,
  Content: FileUploadContent,
});

export { FileUploadTrigger, FileUploadContent };
