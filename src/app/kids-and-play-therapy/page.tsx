import type { Metadata } from 'next';
import { MetaData } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import GlobalInnerHero from '@/components/sections/GlobalInnerHero';
import IconTextList from '@/components/sections/shared/IconTextList';
import WhyPlayTherapyWorks from '@/components/sections/kids-play-therapy/WhyPlayTherapyWorks';
import WhatWeSupport from '@/components/sections/kids-play-therapy/WhatWeSupport';
import FeatureCards from '@/components/sections/shared/FeatureCards';
import YourRole from '@/components/sections/kids-play-therapy/YourRole';
import Team from '@/components/sections/Team';
import CtaPanel from '@/components/sections/shared/CtaPanel';
import Faq from '@/components/sections/Faq';
import CtaImageBanner from '@/components/sections/shared/CtaImageBanner';
import ScrollScene from '@/components/ui/ScrollScene';
import { getKidsPlayTherapyContent } from '@/lib/wp';
const FALLBACK: Metadata = {
  title: 'Kids & Play Therapy | Rene Health Clinic',
  description:
    'Play therapy for children in Coquitlam and online across BC, supporting emotions, behaviour, confidence, relationships, and major life changes.',
  alternates: { canonical: '/kids-and-play-therapy' }
};
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getKidsPlayTherapyContent();
  return MetaData(seo, FALLBACK);
}
export default async function KidsAndPlayTherapyPage() {
  const { page: content, seo } = await getKidsPlayTherapyContent();
  return (
    <>
      <JsonLd seo={seo} />
      <main>
        {content.hero ? (
          <ScrollScene enter={false}>
            <GlobalInnerHero content={content.hero} />
          </ScrollScene>
        ) : null}
        {content.notice ? (
          <ScrollScene>
            <IconTextList content={content.notice} />
          </ScrollScene>
        ) : null}
        {content.approach ? (
          <ScrollScene>
            <WhyPlayTherapyWorks content={content.approach} />
          </ScrollScene>
        ) : null}
        {content.support ? (
          <ScrollScene>
            <WhatWeSupport content={content.support} />
          </ScrollScene>
        ) : null}
        {content.process ? (
          <FeatureCards content={content.process} numbered />
        ) : null}
        {content.role ? (
          <ScrollScene>
            <YourRole content={content.role} />
          </ScrollScene>
        ) : null}
        {content.team ? (
          <ScrollScene>
            <Team content={content.team} tabs={false} centered />
          </ScrollScene>
        ) : null}
        {content.insurance ? (
          <ScrollScene>
            <CtaPanel content={content.insurance} />
          </ScrollScene>
        ) : null}
        {content.faq ? (
          <ScrollScene>
            <Faq content={content.faq} />
          </ScrollScene>
        ) : null}
        {content.cta ? <CtaImageBanner content={content.cta} /> : null}
      </main>
    </>
  );
}
