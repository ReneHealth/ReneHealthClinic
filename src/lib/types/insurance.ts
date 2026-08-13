import type { FaqSection, Html, MediaImage } from "./common";
import type { CounsellingHero, ProcessSection, SupportSection } from "./mental-health";
import type { InsuranceCta } from "./kids-play-therapy";

export interface CheckBenefitsItem {
  title: string;
  description: Html;
}

export interface CheckBenefitsSection {
  label: string;
  heading: string;
  paragraph: Html;
  footnote: Html;
  icon: MediaImage | null;
  items: CheckBenefitsItem[];
}

export interface InsuranceProvider {
  name: string;
  logo: MediaImage | null;
}

export interface InsuranceProviderTab {
  id: string;
  label: string;
  providers: InsuranceProvider[];
  html?: Html;
}

export interface WhoWeBillSection {
  label: string;
  heading: string;
  paragraph: Html;
  tabs: InsuranceProviderTab[];
  note: Html;
}

export interface InsuranceContent {
  hero: CounsellingHero | null;
  coverage: SupportSection | null;
  process: ProcessSection | null;
  benefits: CheckBenefitsSection | null;
  providers: WhoWeBillSection | null;
  beforeYouBook: InsuranceCta | null;
  faq: FaqSection | null;
}
