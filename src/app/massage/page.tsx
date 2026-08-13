import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import PhysicalSubPageSections from "@/components/sections/physical-health/PhysicalSubPageSections";
import { getPhysicalSubPageContent } from "@/lib/physicalSubPageData";

const PAGE_URI = "/massage/";

const FALLBACK: Metadata = {
  title: "Massage Therapy (RMT) | Rene Health Clinic",
  description:
    "Registered Massage Therapy (RMT) in Coquitlam. Clinical treatment for muscle tension, pain, limited movement and injury recovery, with direct billing available.",
  alternates: { canonical: "/massage" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPhysicalSubPageContent(PAGE_URI);
  return MetaData(seo, FALLBACK);
}

export default async function MassagePage() {
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
