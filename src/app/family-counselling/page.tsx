import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import MentalSubPageSections from "@/components/sections/mental-health/MentalSubPageSections";
import { getCommonPageContent } from "@/lib/cmsPageData";

const PAGE_URI = "/family-counselling/";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCommonPageContent(PAGE_URI);
  return MetaData(seo, {
    description:
      "Family counselling in Coquitlam at Rene Health Clinic. Strengthen communication, resolve conflict and build healthier relationships at home.",
    alternates: { canonical: "/family-counselling" },
  });
}

export default async function FamilyCounsellingPage() {
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
