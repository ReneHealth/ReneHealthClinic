import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import PhysicalSubPageSections from "@/components/sections/physical-health/PhysicalSubPageSections";
import { getPhysicalSubPageContent } from "@/lib/physicalSubPageData";

const PAGE_URI = "/chiropractic/";

const FALLBACK: Metadata = {
  title: "Chiropractic Care | Rene Health Clinic",
  description:
    "Chiropractic care in Coquitlam for chronic pain, injury recovery and mobility. Serving Coquitlam, Port Coquitlam and Port Moody, with direct billing available.",
  alternates: { canonical: "/chiropractic" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPhysicalSubPageContent(PAGE_URI);
  return MetaData(seo, FALLBACK);
}

export default async function ChiropracticPage() {
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
