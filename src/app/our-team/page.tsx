import type { Metadata } from "next";
import { MetaData } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import CtaImageBanner from "@/components/sections/shared/CtaImageBanner";
import Faq from "@/components/sections/Faq";
import ScrollScene from "@/components/ui/ScrollScene";
import { getOurTeamContent } from "@/lib/wp";
import TeamHero from "@/components/sections/our-team/TeamHero";
import TeamSection from "@/components/sections/our-team/TeamSection";
import VideoSection from "@/components/sections/VideoSection";

const FALLBACK: Metadata = {
  title: "Our Team | Rene Health Clinic",
  description:
    "Meet the counsellors and physical health practitioners at Rene Health Clinic in Coquitlam.",
  alternates: { canonical: "/our-team" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getOurTeamContent();
  return MetaData(seo, FALLBACK);
}

export default async function OurTeamPage() {
  const { page, seo } = await getOurTeamContent();

  return (
    <>
      <JsonLd seo={seo} />
      <main>
        {page.hero ? (
          <ScrollScene enter={false}>
            <TeamHero content={page.hero} />
          </ScrollScene>
        ) : null}
        {page.team ? <TeamSection content={page.team} /> : null}
        {page.video ? (
          <VideoSection content={page.video} className="pb-0!" />
        ) : null}
        {page.faq ? (
          <ScrollScene>
            <Faq className="py-10 md:py-15" content={page.faq} />
          </ScrollScene>
        ) : null}
        {page.cta ? <CtaImageBanner content={page.cta} /> : null}
      </main>
    </>
  );
}
