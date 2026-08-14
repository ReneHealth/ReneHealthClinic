import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import DifferentNeeds from "@/components/sections/DifferentNeeds";
import Team from "@/components/sections/Team";
import VideoSection from "@/components/sections/VideoSection";
import Services from "@/components/sections/Services";
import FeatureCards from "@/components/sections/shared/FeatureCards";
import Faq from "@/components/sections/Faq";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import ScrollScene from "@/components/ui/ScrollScene";
import JsonLd from "@/components/seo/JsonLd";
import { MetaData } from "@/lib/metadata";
import { getSiteContent } from "@/lib/wp";
import type { Metadata } from "next";

const FALLBACK: Metadata = {
  title: "Rene Health Clinic | Counselling & Physical Health in Coquitlam",
  description:
    "Rene Health brings counselling and physical health services together in one Coquitlam clinic. Care for your mind and body, so you can feel stronger, steadier, and more like yourself.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  return MetaData(seo, FALLBACK);
}

export default async function HomePage() {
  const { home, seo } = await getSiteContent();

  return (
    <>
      <JsonLd seo={seo} />
      <main className="RKtest2">
        {home.hero.length > 0 ? (
          <ScrollScene enter={false}>
            <Hero panels={home.hero} />
          </ScrollScene>
        ) : null}
        {home.about ? (
          <ScrollScene>
            <About content={home.about} />
          </ScrollScene>
        ) : null}
        {home.differentNeeds ? (
          <DifferentNeeds content={home.differentNeeds} />
        ) : null}
        {home.team ? (
          <ScrollScene>
            <Team content={home.team} />
          </ScrollScene>
        ) : null}
        {home.video ? <VideoSection content={home.video} /> : null}
        {home.services ? (
          <ScrollScene>
            <Services content={home.services} />
          </ScrollScene>
        ) : null}
        {home.goodToKnow ? (
          <ScrollScene>
            <FeatureCards content={home.goodToKnow} />
          </ScrollScene>
        ) : null}
        {home.faq ? (
          <ScrollScene>
            <Faq content={home.faq} />
          </ScrollScene>
        ) : null}
        {home.reviews ? (
          <ScrollScene>
            <Reviews content={home.reviews} />
          </ScrollScene>
        ) : null}
        {home.contact ? <Contact content={home.contact} /> : null}
      </main>
    </>
  );
}
