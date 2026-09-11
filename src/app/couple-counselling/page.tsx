import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import MentalSubPageSections from "@/components/sections/mental-health/MentalSubPageSections";
import { getCommonPageContent } from "@/lib/cmsPageData";

const PAGE_URI = "/couple-counselling/";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCommonPageContent(PAGE_URI);
  return MetaData(seo, {
    description:
      "Couples counselling in Coquitlam at Rene Health Clinic. Improve communication, work through conflict and reconnect with your partner with the support of a counsellor.",
    alternates: { canonical: "/couple-counselling" },
  });
}

export default async function CoupleCounsellingPage() {
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
