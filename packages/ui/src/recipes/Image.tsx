'use client';

// The loading placeholder is a Skeleton-wrapped Box carrying role="img" + aria-label so the
// alt text is preserved while no bitmap source exists yet; it's not a literal <img> tag.
// oxlint-disable jsx-a11y/prefer-tag-over-role

import { useEffect, useState, type ImgHTMLAttributes } from 'react';

import { Box, Skeleton } from '../components';
import { cn } from '../lib/cn';

/** Shape of a generated image — supply exactly one of `base64` or `uint8Array`. */
export interface GeneratedImageLike {
  /** Base64-encoded image data (without the `data:…;base64,` prefix). */
  readonly base64?: string;
  /** Raw image bytes. A revocable object URL is created and cleaned up automatically. */
  readonly uint8Array?: Uint8Array;
  /** MIME type used when building the src URI. Defaults to `'image/png'`. */
  readonly mediaType?: string;
}

/**
 * Props for `Image`. Extends `GeneratedImageLike` with standard `<img>` attributes.
 * `alt` is required — images must always have a text alternative. Provide one source: `base64`,
 * `uint8Array`, or a direct `src` URL (resolved in that precedence).
 */
export type ImageProps = GeneratedImageLike &
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
    /** Accessible text description of the image. Required. */
    readonly alt: string;
    /** Direct image URL — used when neither `base64` nor `uint8Array` is supplied. */
    readonly src?: string;
  };

/**
 * Image — renders an AI-generated or hosted image. Resolves the source in precedence order: a
 * `base64` string becomes a data URI; a `uint8Array` becomes a revocable object URL (cleaned up on
 * unmount or data change); otherwise a direct `src` URL is used. While no source is resolved a
 * `Skeleton` placeholder (sized by any passed `style`/width/height) is shown. Use inside message
 * turns for AI-generated or attached images. Keywords: generated image, base64, uint8array, url,
 * AI image, chat, object URL, skeleton.
 */
export function Image({
  base64,
  uint8Array,
  mediaType = 'image/png',
  src: srcProp,
  alt,
  className,
  style,
  ...props
}: ImageProps) {
  const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (uint8Array && mediaType) {
      // Cast is safe — Uint8Array is a valid BlobPart.
      const blob = new Blob([uint8Array as BlobPart], { type: mediaType });
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    setObjectUrl(undefined);
    return undefined;
  }, [uint8Array, mediaType]);

  const src = base64 ? `data:${mediaType};base64,${base64}` : (objectUrl ?? srcProp);

  if (!src) {
    return (
      <Skeleton>
        {/* Carry the caller's sizing so the placeholder occupies space instead of collapsing. */}
        <Box role="img" aria-label={alt} style={style} className={cn('mb-chat-image', className)} />
      </Skeleton>
    );
  }

  return (
    <Box className={cn('mb-chat-image', className)}>
      <img src={src} alt={alt} style={style} {...props} />
    </Box>
  );
}
