import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import InsuranceSubPageSections from "@/components/sections/insurance-direct-billing/InsuranceSubPageSections";
import { getInsuranceSubPageContent } from "@/lib/insuranceSubPageData";
import { getWhoWeBillContent } from "@/lib/wp";

const PAGE_URI = "/insurance-direct-billing/worksafebc/";

const FALLBACK: Metadata = {
  title: "WorkSafeBC Claims | Rene Health Clinic",
  description:
    "Treatment under an approved WorkSafeBC claim at Rene Health Clinic in Coquitlam. What we bill directly, what we need from you, and how to get started.",
  alternates: { canonical: "/insurance-direct-billing/worksafebc" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getInsuranceSubPageContent(PAGE_URI);
  return MetaData(seo, FALLBACK);
}

export default async function WorkSafeBcPage() {
  const [{ page, seo }, whoWeBill] = await Promise.all([
    getInsuranceSubPageContent(PAGE_URI),
    getWhoWeBillContent(),
  ]);

  return (
    <>
      {seo && <JsonLd seo={seo} />}
      <main>
        <InsuranceSubPageSections content={page} whoWeBill={whoWeBill} />
      </main>
    </>
  );
}
