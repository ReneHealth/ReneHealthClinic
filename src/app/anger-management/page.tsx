import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import MentalSubPageSections from "@/components/sections/mental-health/MentalSubPageSections";
import { getCommonPageContent } from "@/lib/cmsPageData";

const PAGE_URI = "/anger-management/";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCommonPageContent(PAGE_URI);
  return MetaData(seo);
}

export default async function AngerManagementPage() {
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
