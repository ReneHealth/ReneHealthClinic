import type { FaqSection, Html } from "./common";
import type { CounsellingHero, CtaBanner } from "./mental-health";

export interface ContactInfoSection {
  label: string;
  heading: Html;
  paragraph: Html;
  mapEmbed: Html;
}

export interface VisitorGuideSection extends CtaBanner {
  label: string;
}

export interface ContactUsContent {
  hero: CounsellingHero | null;
  info: ContactInfoSection | null;
  guide: VisitorGuideSection | null;
  faq: FaqSection | null;
  cta: CtaBanner | null;
}
