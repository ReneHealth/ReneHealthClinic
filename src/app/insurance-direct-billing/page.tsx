import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import GlobalInnerHero from "@/components/sections/GlobalInnerHero";
import SupportGrid from "@/components/sections/shared/SupportGrid";
import StepScroller from "@/components/sections/shared/StepScroller";
import CheckBenefits from "@/components/sections/insurance/CheckBenefits";
import WhoWeBill from "@/components/sections/insurance/WhoWeBill";
import CtaPanel from "@/components/sections/shared/CtaPanel";
import Faq from "@/components/sections/Faq";
import ScrollScene from "@/components/ui/ScrollScene";
import { getInsuranceContent } from "@/lib/wp";

const FALLBACK: Metadata = {
  title: "Insurance & Direct Billing | Rene Health Clinic",
  description:
    "Direct billing for eligible extended health plans, ICBC claims, and approved WorkSafeBC claims at Rene Health Clinic in Coquitlam.",
  alternates: { canonical: "/insurance-direct-billing" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getInsuranceContent();
  return MetaData(seo, FALLBACK);
}

export default async function InsuranceDirectBillingPage() {
  const { page: content, seo } = await getInsuranceContent();

  return (
    <>
      <JsonLd seo={seo} />
      <main>
        {content.hero ? (
          <ScrollScene enter={false}>
            <GlobalInnerHero content={content.hero} />
          </ScrollScene>
        ) : null}
        {content.coverage ? (
          <div id="coverage">
            <ScrollScene>
              <SupportGrid content={content.coverage} />
            </ScrollScene>
          </div>
        ) : null}
        {content.process ? <StepScroller content={content.process} /> : null}
        {content.benefits ? (
          <ScrollScene>
            <CheckBenefits content={content.benefits} />
          </ScrollScene>
        ) : null}
        {content.providers ? (
          <ScrollScene>
            <WhoWeBill content={content.providers} />
          </ScrollScene>
        ) : null}
        {content.beforeYouBook ? (
          <ScrollScene>
            <CtaPanel content={content.beforeYouBook} />
          </ScrollScene>
        ) : null}
        {content.faq ? (
          <ScrollScene>
            <Faq className="py-10 md:py-15" content={content.faq} />
          </ScrollScene>
        ) : null}
      </main>
    </>
  );
}
