import type { ReactNode } from "react";

import { Cta } from "../blocks/Cta";
import { type Feature, FeatureGrid } from "../blocks/FeatureGrid";
import { Hero } from "../blocks/Hero";

export interface LandingTemplateProps {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  /** Hero action slot. */
  readonly actions?: ReactNode;
  readonly features: readonly Feature[];
  readonly cta: { title: ReactNode; description?: ReactNode; actions?: ReactNode };
}

/**
 * LandingTemplate — a full marketing page assembled from the Hero, FeatureGrid, and Cta
 * blocks. Demonstrates composing the kit's layers into a page.
 */
export function LandingTemplate({
  title,
  description,
  actions,
  features,
  cta,
}: LandingTemplateProps) {
  return (
    <>
      <Hero title={title} description={description} actions={actions} />
      <FeatureGrid features={features} />
      <Cta title={cta.title} description={cta.description} actions={cta.actions} />
    </>
  );
}
