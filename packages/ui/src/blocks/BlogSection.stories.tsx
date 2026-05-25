import type { Meta, StoryObj } from '@storybook/react-vite';

import BlogSectionExample from '../../examples/BlogSection.example';
import { BlogSection } from './BlogSection';

const meta = {
  title: 'Blocks/BlogSection',
  component: BlogSection,
  args: { posts: [] },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BlogSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BlogSectionExample />,
};

export const TwoColumns: Story = {
  render: () => (
    <BlogSection
      title="Latest Articles"
      posts={[
        {
          id: 'a',
          title: 'Getting Started with Turborepo',
          excerpt: 'A practical guide to setting up your first Turborepo workspace.',
          href: '#',
          category: 'Guide',
          date: 'May 1, 2026',
        },
        {
          id: 'b',
          title: 'React Server Components in Practice',
          excerpt: 'Patterns for data fetching and composition in the App Router.',
          href: '#',
          category: 'React',
          date: 'Apr 10, 2026',
        },
      ]}
      columns={{ initial: '1', md: '2' }}
    />
  ),
};
