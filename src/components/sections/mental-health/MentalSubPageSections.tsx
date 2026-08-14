import { Fragment } from "react";
import GlobalInnerHero from "@/components/sections/GlobalInnerHero";
import SideHeadingList from "@/components/content/SideHeadingList";
import SideImageContent from "@/components/content/SideImageContent";
import CenterImageGrid from "@/components/content/CenterImageGrid";
import FeatureCards from "@/components/sections/shared/FeatureCards";
import Role from "@/components/content/Role";
import Team from "@/components/sections/Team";
import CtaPanel from "@/components/sections/shared/CtaPanel";
import Faq from "@/components/sections/Faq";
import CtaImageBanner from "@/components/sections/shared/CtaImageBanner";
import ScrollScene from "@/components/ui/ScrollScene";
import type { PageContentType } from "@/lib/cmsPageData";
import { sortSections, type OrderableSection } from "@/lib/sectionOrder";

export default function MentalSubPageSections({
  content,
}: {
  content: PageContentType;
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

  if (content.notice) {
    sections.push({
      key: "notice",
      order: content.notice.order,
      node: (
        <ScrollScene>
          <SideHeadingList content={content.notice} />
        </ScrollScene>
      ),
    });
  }

  if (content.approach) {
    sections.push({
      key: "approach",
      order: content.approach.order,
      node: (
        <ScrollScene>
          <SideImageContent content={content.approach} />
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
          <CenterImageGrid content={content.support} />
        </ScrollScene>
      ),
    });
  }

  if (content.process) {
    sections.push({
      key: "process",
      order: content.process.order,
      node: (
        <ScrollScene>
          <FeatureCards content={content.process} />
        </ScrollScene>
      ),
    });
  }

  if (content.role) {
    sections.push({
      key: "role",
      order: content.role.order,
      node: (
        <ScrollScene>
          <Role content={content.role} />
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

  if (content.faq) {
    sections.push({
      key: "faq",
      order: content.faq.order,
      node: (
        <ScrollScene>
          <Faq content={content.faq} />
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
