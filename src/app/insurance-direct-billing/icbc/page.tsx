import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import InsuranceSubPageSections from "@/components/sections/insurance-direct-billing/InsuranceSubPageSections";
import { getInsuranceSubPageContent } from "@/lib/insuranceSubPageData";
import { getWhoWeBillContent } from "@/lib/wp";

const PAGE_URI = "/insurance-direct-billing/icbc/";

const FALLBACK: Metadata = {
  title: "ICBC Claims | Rene Health Clinic",
  description:
    "ICBC-funded treatment at Rene Health Clinic in Coquitlam. What your claim covers, how many sessions you get, and what to bring to your first appointment.",
  alternates: { canonical: "/insurance-direct-billing/icbc" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getInsuranceSubPageContent(PAGE_URI);
  return MetaData(seo, FALLBACK);
}

export default async function IcbcPage() {
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
