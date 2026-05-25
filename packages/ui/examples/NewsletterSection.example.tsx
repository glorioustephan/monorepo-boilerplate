import { NewsletterSection } from '@monorepo-boilerplate/ui';

/** Centered newsletter signup band for landing and marketing pages. */
export default function NewsletterSectionExample() {
  return (
    <NewsletterSection
      title="Stay in the loop"
      description="Get the latest updates, articles, and resources delivered straight to your inbox."
      placeholder="Enter your email"
      submitLabel="Subscribe"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    />
  );
}
