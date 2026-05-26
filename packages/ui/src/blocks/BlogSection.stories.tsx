import { Avatar } from '@monorepo-boilerplate/ui';
import { ImageIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BlogSectionExample from '../../examples/BlogSection.example';
import { BlogSection } from './BlogSection';

const meta = {
  title: 'Blocks/BlogSection',
  component: BlogSection,
  args: {
    title: 'From the Blog',
    description: 'Insights on design, engineering, and developer experience.',
    columns: { initial: '1', md: '3' },
    posts: [
      {
        id: 'post-1',
        title: 'Introducing the New Design System',
        excerpt:
          'A deep dive into our token-based approach that scales across every product surface.',
        href: '#',
        category: 'Design',
        date: 'May 12, 2026',
        image: (
          <div
            style={{
              background: 'var(--accent-3)',
              height: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageIcon width={40} height={40} />
          </div>
        ),
        author: {
          name: 'Mia Torres',
          avatar: <Avatar size="1" fallback="MT" radius="full" />,
        },
      },
      {
        id: 'post-2',
        title: 'Building Type-Safe APIs with Zod',
        excerpt: 'How we validate every external boundary in our monorepo without slowing CI down.',
        href: '#',
        category: 'Engineering',
        date: 'Apr 28, 2026',
        image: (
          <div
            style={{
              background: 'var(--accent-4)',
              height: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageIcon width={40} height={40} />
          </div>
        ),
        author: {
          name: 'James Baker',
          avatar: <Avatar size="1" fallback="JB" radius="full" />,
        },
      },
      {
        id: 'post-3',
        title: 'Turborepo Caching in Production',
        excerpt: 'Lessons learned after six months of remote caching across 40+ packages.',
        href: '#',
        category: 'DevOps',
        date: 'Mar 15, 2026',
        image: (
          <div
            style={{
              background: 'var(--accent-5)',
              height: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageIcon width={40} height={40} />
          </div>
        ),
        author: {
          name: 'Sam Rivera',
          avatar: <Avatar size="1" fallback="SR" radius="full" />,
        },
      },
    ],
  },
  render: (args) => <BlogSection {...args} />,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BlogSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Args-driven — edit title, description, columns, and posts in the Controls panel. */
export const Default: Story = {};

/** Rich reference example from the catalog. */
export const Example: Story = {
  render: () => <BlogSectionExample />,
};

export const TwoColumns: Story = {
  args: {
    title: 'Latest Articles',
    description: undefined,
    columns: { initial: '1', md: '2' },
    posts: [
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
    ],
  },
};
