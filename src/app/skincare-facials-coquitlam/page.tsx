import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import PhysicalSubPageSections from "@/components/sections/physical-health/PhysicalSubPageSections";
import { getPhysicalSubPageContent } from "@/lib/physicalSubPageData";

const PAGE_URI = "/skincare-facials-coquitlam/";

const FALLBACK: Metadata = {
  title: "Facials and Skin Care | Rene Health Clinic",
  description:
    "Facials and advanced skin care in Coquitlam. Customized, medical-grade treatments supporting skin health and natural-looking results.",
  alternates: { canonical: "/skincare-facials-coquitlam" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPhysicalSubPageContent(PAGE_URI);
  return MetaData(seo, FALLBACK);
}

export default async function SkincareFacialsPage() {
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
