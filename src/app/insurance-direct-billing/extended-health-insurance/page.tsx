import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import InsuranceSubPageSections from "@/components/sections/insurance-direct-billing/InsuranceSubPageSections";
import { getInsuranceSubPageContent } from "@/lib/insuranceSubPageData";
import { getWhoWeBillContent } from "@/lib/wp";

const PAGE_URI = "/insurance-direct-billing/extended-health-insurance/";

const FALLBACK: Metadata = {
  title: "Extended Health Insurance | Rene Health Clinic",
  description:
    "Direct billing to eligible extended health plans at Rene Health Clinic in Coquitlam. Check your coverage, practitioner credentials and annual limits before you book.",
  alternates: {
    canonical: "/insurance-direct-billing/extended-health-insurance",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getInsuranceSubPageContent(PAGE_URI);
  return MetaData(seo, FALLBACK);
}

export default async function ExtendedHealthInsurancePage() {
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
