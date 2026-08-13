import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import GlobalInnerHero from "@/components/sections/GlobalInnerHero";
import ContactDetails from "@/components/sections/contact-us/ContactDetails";
import VisitorGuide from "@/components/sections/contact-us/VisitorGuide";
import Faq from "@/components/sections/Faq";
import CtaImageBanner from "@/components/sections/shared/CtaImageBanner";
import ScrollScene from "@/components/ui/ScrollScene";
import { getContactUsContent } from "@/lib/wp";

const FALLBACK: Metadata = {
  title: "Contact Us | Rene Health Clinic",
  description:
    "Get in touch with Rene Health Clinic in Coquitlam. Book an appointment, ask a question, or find directions and hours for our counselling and physical health services.",
  alternates: { canonical: "/contact-us" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactUsContent();
  return MetaData(seo, FALLBACK);
}

export default async function ContactUsPage() {
  const { page: content, settings, seo } = await getContactUsContent();

  return (
    <>
      <JsonLd seo={seo} />
      <main>
        {content.hero ? (
          <ScrollScene enter={false}>
            <GlobalInnerHero content={content.hero} />
          </ScrollScene>
        ) : null}
        {content.info ? (
          <ScrollScene>
            <ContactDetails content={content.info} settings={settings} />
          </ScrollScene>
        ) : null}
        {content.guide ? (
          <ScrollScene>
            <VisitorGuide content={content.guide} />
          </ScrollScene>
        ) : null}
        {content.faq ? (
          <ScrollScene>
            <Faq className="py-10 md:py-15" content={content.faq} />
          </ScrollScene>
        ) : null}
        {content.cta ? <CtaImageBanner content={content.cta} /> : null}
      </main>
    </>
  );
}
