import { Image } from '@monorepo-boilerplate/ui';

/**
 * Image rendering a hosted photo from a direct `src` URL. The wrapper clips the photo to rounded
 * corners on every side; pass `base64` or `uint8Array` instead for AI-generated images.
 */
export default function ImageExample() {
  return (
    <Image
      src="https://picsum.photos/200/300"
      alt="A random sample photograph"
      width={200}
      height={300}
    />
  );
}
