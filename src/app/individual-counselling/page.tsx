import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import MentalSubPageSections from "@/components/sections/mental-health/MentalSubPageSections";
import { getCommonPageContent } from "@/lib/cmsPageData";

const PAGE_URI = "/individual-counselling/";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCommonPageContent(PAGE_URI);
  return MetaData(seo, {
    description:
      "Individual counselling in Coquitlam at Rene Health Clinic. Work one-on-one with a counsellor in a safe, confidential space to understand what you're facing and move forward.",
    alternates: { canonical: "/individual-counselling" },
  });
}

export default async function IndividualCounsellingPage() {
  const { page, seo } = await getCommonPageContent(PAGE_URI);

  return (
    <>
      {seo && <JsonLd seo={seo} />}
      <main>
        <MentalSubPageSections content={page} />
      </main>
    </>
  );
}
