import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import PhysicalSubPageSections from "@/components/sections/physical-health/PhysicalSubPageSections";
import { getPhysicalSubPageContent } from "@/lib/physicalSubPageData";

const PAGE_URI = "/naturopathy/";

const FALLBACK: Metadata = {
  title: "Naturopathic Medicine | Rene Health Clinic",
  description:
    "Naturopathic medicine in Coquitlam. A personalized, evidence-based approach that identifies the root cause of your symptoms and supports long-term wellbeing.",
  alternates: { canonical: "/naturopathy" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPhysicalSubPageContent(PAGE_URI);
  return MetaData(seo, FALLBACK);
}

export default async function NaturopathyPage() {
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
