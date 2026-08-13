import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import PhysicalSubPageSections from "@/components/sections/physical-health/PhysicalSubPageSections";
import { getPhysicalSubPageContent } from "@/lib/physicalSubPageData";

const PAGE_URI = "/osteopathy-coquitlam/";

const FALLBACK: Metadata = {
  title: "Clinical Osteopathy | Rene Health Clinic",
  description:
    "Osteopathy in Coquitlam. Gentle, hands-on manual therapy to improve mobility, relieve pain and address the underlying source of discomfort.",
  alternates: { canonical: "/osteopathy-coquitlam" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPhysicalSubPageContent(PAGE_URI);
  return MetaData(seo, FALLBACK);
}

export default async function OsteopathyPage() {
  const { page, seo } = await getPhysicalSubPageContent(PAGE_URI);

  return (
    <>
      {seo && <JsonLd seo={seo} />}
      <main>
        <PhysicalSubPageSections content={page} />
      </main>
    </>
  );
}
