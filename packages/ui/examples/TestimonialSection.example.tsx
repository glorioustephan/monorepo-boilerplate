import { Avatar, TestimonialSection } from '@monorepo-boilerplate/ui';
import { PersonIcon } from '@radix-ui/react-icons';

/** TestimonialSection with a mix of ratings, avatars, and author titles. */
export default function TestimonialSectionExample() {
  return (
    <TestimonialSection
      title="What our customers say"
      testimonials={[
        {
          id: 'alice',
          quote:
            'This kit saved us weeks of setup. The Radix Themes integration is seamless and the agent tooling is genuinely useful in day-to-day work.',
          authorName: 'Alice Hoffman',
          authorTitle: 'CTO, Shipfast',
          avatar: <Avatar fallback="AH" />,
          rating: 5,
        },
        {
          id: 'ben',
          quote:
            'The monorepo conventions kept our team aligned from day one. I especially appreciate the strict TypeScript config and the zero-config formatter.',
          authorName: 'Ben Torres',
          authorTitle: 'Lead Engineer, Acme Corp',
          avatar: <Avatar fallback="BT" />,
          rating: 4,
        },
        {
          id: 'chen',
          quote:
            'Storybook integration with the MCP catalog is a game-changer. Our designers and agents share the same vocabulary now.',
          authorName: 'Chen Wei',
          authorTitle: 'Product Designer, Launchpad',
          avatar: <Avatar fallback={<PersonIcon />} />,
          rating: 5,
        },
      ]}
    />
  );
}
