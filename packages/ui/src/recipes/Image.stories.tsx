import type { Meta, StoryObj } from '@storybook/react-vite';

import ImageExample from '../../examples/Image.example';
import { Image } from './Image';

const RED_PIXEL_PNG =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

const meta = {
  title: 'Recipes/Chat/Image',
  component: Image,
  args: {
    base64: RED_PIXEL_PNG,
    mediaType: 'image/png',
    alt: 'A generated image',
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A hosted photo loaded from a direct `src` URL (picsum.photos). Mirrors the catalog example. */
export const Default: Story = {
  render: () => <ImageExample />,
};

/** A generated image rendered from a base64 string (offline — no network). */
export const GeneratedBase64: Story = {
  args: {
    base64: RED_PIXEL_PNG,
    alt: 'A 1×1 red pixel generated image',
    style: { width: 120, height: 120, imageRendering: 'pixelated' },
  },
};

/** Skeleton loading state — no source provided yet; sized by the passed `style`. */
export const Loading: Story = {
  args: {
    base64: undefined,
    uint8Array: undefined,
    alt: 'A generated image loading',
    style: { width: 200, height: 300 },
  },
};
