import { ImageIcon } from '@radix-ui/react-icons';

import { Avatar, BlogSection } from '@monorepo-boilerplate/ui';

const posts = [
  {
    id: 'post-1',
    title: 'Introducing the New Design System',
    excerpt: 'A deep dive into our token-based approach that scales across every product surface.',
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
];

/** BlogSection renders a three-column blog post grid with images, categories, and authors. */
export default function BlogSectionExample() {
  return (
    <BlogSection
      title="From the Blog"
      description="Insights on design, engineering, and developer experience."
      posts={posts}
    />
  );
}
