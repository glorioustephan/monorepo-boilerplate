import { Avatar, TeamSection } from '@monorepo-boilerplate/ui';
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

/** Team grid with 4 members, avatars, roles, and social icon slots. */
export default function TeamSectionExample() {
  return (
    <TeamSection
      title="Meet the team"
      description="The people behind the boilerplate."
      members={[
        {
          id: 'alice',
          name: 'Alice Chen',
          role: 'Co-founder & CEO',
          avatar: <Avatar size="5" fallback="AC" radius="full" />,
          bio: 'Passionate about developer experience and open-source tooling.',
          socials: (
            <>
              <a href="https://twitter.com" aria-label="Twitter">
                <TwitterLogoIcon />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <LinkedInLogoIcon />
              </a>
            </>
          ),
        },
        {
          id: 'ben',
          name: 'Ben Okafor',
          role: 'CTO',
          avatar: <Avatar size="5" fallback="BO" radius="full" />,
          bio: 'Turborepo enthusiast. Lover of typed APIs and zero-runtime CSS.',
          socials: (
            <>
              <a href="https://github.com" aria-label="GitHub">
                <GitHubLogoIcon />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <TwitterLogoIcon />
              </a>
            </>
          ),
        },
        {
          id: 'cara',
          name: 'Cara Patel',
          role: 'Design Lead',
          avatar: <Avatar size="5" fallback="CP" radius="full" />,
          bio: 'Radix Themes contributor. Brings order to design systems.',
          socials: (
            <a href="https://twitter.com" aria-label="Twitter">
              <TwitterLogoIcon />
            </a>
          ),
        },
        {
          id: 'dan',
          name: 'Dan Müller',
          role: 'Platform Engineer',
          avatar: <Avatar size="5" fallback="DM" radius="full" />,
          bio: 'Keeps CI green and deployments boring.',
          socials: (
            <a href="https://github.com" aria-label="GitHub">
              <GitHubLogoIcon />
            </a>
          ),
        },
      ]}
    />
  );
}
