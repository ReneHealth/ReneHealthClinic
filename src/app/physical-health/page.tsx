import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import GlobalInnerHero from "@/components/sections/GlobalInnerHero";
import PlaceToTalk from "@/components/sections/mental-health/PlaceToTalk";
import SupportGrid from "@/components/sections/shared/SupportGrid";
import WhatToExpect from "@/components/sections/mental-health/WhatToExpect";
import FeatureCards from "@/components/sections/shared/FeatureCards";
import CtaImageBanner from "@/components/sections/shared/CtaImageBanner";
import Team from "@/components/sections/Team";
import Faq from "@/components/sections/Faq";
import ScrollScene from "@/components/ui/ScrollScene";
import { getPhysicalHealthContent } from "@/lib/wp";
const FALLBACK: Metadata = {
  title: "Counselling & Wellness Support | Rene Health Clinic",
  description:
    "Counselling in Coquitlam and online across BC. Individual, couples, family and kids counselling, ADHD and anger management, with direct billing and extended health coverage.",
  alternates: { canonical: "/physical-health" },
};
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPhysicalHealthContent();
  return MetaData(seo, FALLBACK);
}
export default async function PhysicalHealthPage() {
  const { page, seo } = await getPhysicalHealthContent();
  return (
    <>
      <JsonLd seo={seo} />
      <main>
        {page.hero ? (
          <ScrollScene enter={false}>
            <GlobalInnerHero content={page.hero} />
          </ScrollScene>
        ) : null}
        {page.intro ? (
          <ScrollScene>
            <PlaceToTalk content={page.intro} />
          </ScrollScene>
        ) : null}
        {page.support ? (
          <ScrollScene>
            <SupportGrid content={page.support} />
          </ScrollScene>
        ) : null}
        {page.process ? <WhatToExpect content={page.process} /> : null}
        {page.team ? (
          <ScrollScene>
            <Team content={page.team} scroll />
          </ScrollScene>
        ) : null}
        {page.benefits ? (
          <ScrollScene>
            <FeatureCards content={page.benefits} />
          </ScrollScene>
        ) : null}
        {page.faq ? (
          <ScrollScene>
            <Faq content={page.faq} className={"py-10 md:py-15"} />
          </ScrollScene>
        ) : null}
        {page.cta ? <CtaImageBanner content={page.cta} /> : null}
      </main>
    </>
  );
}
