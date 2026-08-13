import { Fragment } from "react";
import GlobalInnerHero from "@/components/sections/GlobalInnerHero";
import TwoColumnImageContent from "@/components/content/TwoColumnImageContent";
import Services from "@/components/sections/Services";
import CenterImageGrid from "@/components/content/CenterImageGrid";
import HoverFourColumnSlider from "@/components/content/HoverFourColumnSlider";
import CtaPanel from "@/components/sections/shared/CtaPanel";
import Team from "@/components/sections/Team";
import FeatureCards from "@/components/sections/shared/FeatureCards";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import CtaImageBanner from "@/components/sections/shared/CtaImageBanner";
import ScrollScene from "@/components/ui/ScrollScene";
import type { PhysicalSubPageContentType } from "@/lib/physicalSubPageData";
import { sortSections, type OrderableSection } from "@/lib/sectionOrder";

export default function PhysicalSubPageSections({
  content,
}: {
  content: PhysicalSubPageContentType;
}) {
  const sections: OrderableSection[] = [];

  if (content.hero) {
    sections.push({
      key: "hero",
      order: content.hero.order,
      node: (
        <ScrollScene enter={false}>
          <GlobalInnerHero content={content.hero} />
        </ScrollScene>
      ),
    });
  }

  if (content.intro) {
    sections.push({
      key: "intro",
      order: content.intro.order,
      node: (
        <ScrollScene>
          <TwoColumnImageContent content={content.intro} />
        </ScrollScene>
      ),
    });
  }

  if (content.services) {
    sections.push({
      key: "services",
      order: content.services.order,
      node: (
        <ScrollScene>
          <Services content={content.services} />
        </ScrollScene>
      ),
    });
  }

  if (content.support) {
    sections.push({
      key: "support",
      order: content.support.order,
      node: (
        <ScrollScene>
          <CenterImageGrid content={content.support} richHeading />
        </ScrollScene>
      ),
    });
  }

  if (content.process) {
    sections.push({
      key: "process",
      order: content.process.order,
      node: <HoverFourColumnSlider content={content.process} />,
    });
  }

  if (content.insurance) {
    sections.push({
      key: "insurance",
      order: content.insurance.order,
      node: (
        <ScrollScene>
          <CtaPanel content={content.insurance} />
        </ScrollScene>
      ),
    });
  }

  if (content.team) {
    sections.push({
      key: "team",
      order: content.team.order,
      node: (
        <ScrollScene>
          <Team content={content.team} tabs={false} centered />
        </ScrollScene>
      ),
    });
  }

  if (content.benefits) {
    sections.push({
      key: "benefits",
      order: content.benefits.order,
      node: <FeatureCards content={content.benefits} />,
    });
  }

  if (content.reviews) {
    sections.push({
      key: "reviews",
      order: content.reviews.order,
      node: <Reviews content={content.reviews} />,
    });
  }

  if (content.faq) {
    sections.push({
      key: "faq",
      order: content.faq.order,
      node: (
        <ScrollScene>
          <Faq content={content.faq} className="py-10 md:py-15" />
        </ScrollScene>
      ),
    });
  }

  if (content.cta) {
    sections.push({
      key: "cta",
      order: content.cta.order,
      node: <CtaImageBanner content={content.cta} />,
    });
  }

  return (
    <>
      {sortSections(sections).map((section) => (
        <Fragment key={section.key}>{section.node}</Fragment>
      ))}
    </>
  );
}
