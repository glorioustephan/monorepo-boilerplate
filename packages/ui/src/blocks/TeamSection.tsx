import type { ReactNode } from 'react';

import { Container, Flex, Grid, Heading, Section, Text } from '../components';
import { cn } from '../lib/cn';

/** A single team member displayed in the grid. */
export interface TeamMember {
  /** Stable unique identifier (used as the React key). */
  readonly id: string;
  /** Member's display name. */
  readonly name: ReactNode;
  /** Job title or role. */
  readonly role?: ReactNode;
  /** Avatar element — e.g. an `<Avatar>` atom or an `<img>`. */
  readonly avatar?: ReactNode;
  /** Short biography or tagline. */
  readonly bio?: ReactNode;
  /** Social icon links slot — render icon anchor tags here. */
  readonly socials?: ReactNode;
}

/** TeamSectionProps — props for the team member grid section. */
export interface TeamSectionProps {
  /** Array of team members to display. */
  readonly members: readonly TeamMember[];
  /** Section headline. */
  readonly title?: ReactNode;
  /** Supporting copy shown below the headline. */
  readonly description?: ReactNode;
  /**
   * Responsive column counts passed to `<Grid columns>`.
   * Defaults to `{ initial: '1', sm: '2', lg: '4' }`.
   */
  readonly columns?: { initial?: string; sm?: string; md?: string; lg?: string; xl?: string };
  readonly className?: string;
}

/**
 * TeamSection — a responsive grid of team member cards showing avatar, name, role, bio, and
 * social links. Use for about pages, team directories, or speaker listings.
 * Keywords: team, members, people, grid, about, directory, speakers.
 */
export function TeamSection({
  members,
  title,
  description,
  columns = { initial: '1', sm: '2', lg: '4' },
  className,
}: TeamSectionProps) {
  return (
    <Section size="3" className={cn(className)}>
      <Container size="4">
        <Flex direction="column" gap="6">
          {(title !== undefined || description !== undefined) && (
            <Flex direction="column" align="center" gap="2">
              {title !== undefined && (
                <Heading as="h2" size="6" align="center">
                  {title}
                </Heading>
              )}
              {description !== undefined && (
                <Text size="3" color="gray" align="center">
                  {description}
                </Text>
              )}
            </Flex>
          )}

          <Grid columns={columns} gap="6">
            {members.map((member) => (
              <Flex key={member.id} direction="column" align="center" gap="2">
                {member.avatar !== undefined && member.avatar}
                <Heading as="h3" size="3" align="center">
                  {member.name}
                </Heading>
                {member.role !== undefined && (
                  <Text size="2" color="gray" align="center">
                    {member.role}
                  </Text>
                )}
                {member.bio !== undefined && (
                  <Text size="2" align="center">
                    {member.bio}
                  </Text>
                )}
                {member.socials !== undefined && (
                  <Flex gap="2" mt="1" justify="center">
                    {member.socials}
                  </Flex>
                )}
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
}
