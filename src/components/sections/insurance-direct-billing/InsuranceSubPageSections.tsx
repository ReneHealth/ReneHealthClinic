import { Fragment } from "react";
import GlobalInnerHero from "@/components/sections/GlobalInnerHero";
import IconTextList from "@/components/sections/shared/IconTextList";
import SplitCardGrid from "@/components/sections/shared/SplitCardGrid";
import StepScroller from "@/components/sections/shared/StepScroller";
import SupportGrid from "@/components/sections/shared/SupportGrid";
import CtaPanel from "@/components/sections/shared/CtaPanel";
import Faq from "@/components/sections/Faq";
import WhoWeBill from "@/components/sections/insurance/WhoWeBill";
import CtaImageBanner from "@/components/sections/shared/CtaImageBanner";
import ScrollScene from "@/components/ui/ScrollScene";
import type { InsuranceSubPageContentType } from "@/lib/insuranceSubPageData";
import { sortSections, type OrderableSection } from "@/lib/sectionOrder";
import type { WhoWeBillSection } from "@/lib/types";

export default function InsuranceSubPageSections({
  content,
  whoWeBill,
}: {
  content: InsuranceSubPageContentType;
  whoWeBill?: WhoWeBillSection | null;
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

  if (content.highlights) {
    sections.push({
      key: "highlights",
      order: content.highlights.order,
      node: (
        <ScrollScene>
          <IconTextList content={content.highlights} />
        </ScrollScene>
      ),
    });
  }

  if (content.splitGrid) {
    sections.push({
      key: "splitGrid",
      order: content.splitGrid.order,
      node: (
        <ScrollScene>
          <SplitCardGrid content={content.splitGrid} />
        </ScrollScene>
      ),
    });
  }

  if (content.steps) {
    sections.push({
      key: "steps",
      order: content.steps.order,
      node: <StepScroller content={content.steps} />,
    });
  }

  if (content.support) {
    sections.push({
      key: "support",
      order: content.support.order,
      node: (
        <ScrollScene>
          <SupportGrid content={content.support} expanded />
        </ScrollScene>
      ),
    });
  }

  if (whoWeBill) {
    sections.push({
      key: "whoWeBill",
      node: (
        <ScrollScene>
          <WhoWeBill content={whoWeBill} />
        </ScrollScene>
      ),
    });
  }

  if (content.panel) {
    sections.push({
      key: "panel",
      order: content.panel.order,
      node: (
        <ScrollScene>
          <CtaPanel content={content.panel} />
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
