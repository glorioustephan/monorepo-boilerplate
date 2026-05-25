import type { ReactNode } from 'react';

import {
  Badge,
  Card,
  Container,
  Flex,
  Grid,
  type GridProps,
  Heading,
  Inset,
  Link,
  Section,
  Text,
} from '../components';
import { cn } from '../lib/cn';

/** Author attribution sub-type for a blog post card. */
export interface BlogPostAuthor {
  /** Author display name. */
  readonly name: ReactNode;
  /** Avatar slot — pass an `<Avatar>` or image node. */
  readonly avatar?: ReactNode;
}

/**
 * A single blog post entry rendered inside `BlogSection`.
 * Provide `image` for a top inset visual, `category` for a Badge label,
 * `date` for publication metadata, and `author` for attribution.
 */
export interface BlogPost {
  /** Stable identifier for list keys. */
  readonly id: string;
  /** Post headline. */
  readonly title: ReactNode;
  /** Short summary text rendered below the title. */
  readonly excerpt?: ReactNode;
  /** When set, wraps the title in a link. */
  readonly href?: string;
  /** Category label rendered as a Badge. */
  readonly category?: ReactNode;
  /** Publication date string or node. */
  readonly date?: ReactNode;
  /** Top-of-card image slot; wrapped in an Inset when provided. */
  readonly image?: ReactNode;
  /** Author attribution. */
  readonly author?: BlogPostAuthor;
}

export interface BlogSectionProps {
  /** Array of posts to display. */
  readonly posts: readonly BlogPost[];
  /** Optional section heading. */
  readonly title?: ReactNode;
  /** Optional supporting text rendered below the heading. */
  readonly description?: ReactNode;
  /** Responsive column counts (default: 1 column → 3 columns at md). */
  readonly columns?: GridProps['columns'];
  /** Additional className merged onto the root element. */
  readonly className?: string;
}

const DEFAULT_COLUMNS: GridProps['columns'] = { initial: '1', md: '3' };

/**
 * BlogSection — a responsive grid of blog post cards with image, category, date, and author slots.
 * Use for blog index pages, news feeds, article listings, or content marketing sections
 * (keywords: blog, posts, articles, news, editorial, grid).
 */
export function BlogSection({
  posts,
  title,
  description,
  columns = DEFAULT_COLUMNS,
  className,
}: BlogSectionProps) {
  return (
    <Section size="3" className={cn(className)}>
      <Container size="4">
        <Flex direction="column" gap="6">
          {title || description ? (
            <Flex direction="column" gap="2" align="center">
              {title ? (
                <Heading as="h2" size="7" align="center">
                  {title}
                </Heading>
              ) : undefined}
              {description ? (
                <Text size="4" color="gray" align="center">
                  {description}
                </Text>
              ) : undefined}
            </Flex>
          ) : undefined}
          <Grid columns={columns} gap="5">
            {posts.map((post) => (
              <Card key={post.id} size="2">
                <Flex direction="column" gap="3" height="100%">
                  {post.image ? (
                    <Inset side="top" clip="padding-box">
                      {post.image}
                    </Inset>
                  ) : undefined}
                  <Flex direction="column" gap="2" flexGrow="1">
                    {post.category || post.date ? (
                      <Flex align="center" gap="2" wrap="wrap">
                        {post.category ? (
                          <Badge size="1" variant="soft">
                            {post.category}
                          </Badge>
                        ) : undefined}
                        {post.date ? (
                          <Text size="1" color="gray">
                            {post.date}
                          </Text>
                        ) : undefined}
                      </Flex>
                    ) : undefined}
                    <Heading as="h3" size="4">
                      {post.href ? (
                        <Link href={post.href} underline="hover" color="gray" highContrast>
                          {post.title}
                        </Link>
                      ) : (
                        post.title
                      )}
                    </Heading>
                    {post.excerpt ? (
                      <Text size="2" color="gray">
                        {post.excerpt}
                      </Text>
                    ) : undefined}
                  </Flex>
                  {post.author ? (
                    <Flex align="center" gap="2" mt="1">
                      {post.author.avatar}
                      <Text size="1" weight="medium">
                        {post.author.name}
                      </Text>
                    </Flex>
                  ) : undefined}
                </Flex>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
}
