import type { CtaLink, FaqSection, Html, MediaImage, TeamSection } from "./common";

export interface CounsellingHero {
  label: string;
  heading: string;
  paragraph: Html;
  cta: CtaLink | null;
  image: MediaImage | null;
}

export interface CounsellingIntro {
  label: string;
  heading: Html;
  paragraph: Html;
  image: MediaImage | null;
}

export interface SupportCard {
  title: string;
  description: Html;
  icon: MediaImage | null;
  cta: CtaLink | null;
}

export interface SupportSection {
  label: string;
  heading: string;
  paragraph: Html;
  cards: SupportCard[];
}

export interface ProcessStep {
  title: string;
  description: Html;
  image: MediaImage | null;
}

export interface ProcessSection {
  label: string;
  heading: string;
  paragraph: Html;
  steps: ProcessStep[];
}

export interface BenefitsCard {
  title: string;
  description: Html;
  cta: CtaLink | null;
}

export interface BenefitsSection {
  label: string;
  heading: string;
  paragraph: Html;
  backgrounds: string[];
  cards: BenefitsCard[];
  footnote: Html;
}

export interface CtaBanner {
  heading: string;
  paragraph: Html;
  cta: CtaLink | null;
  image: MediaImage | null;
}

export interface MentalHealthContent {
  hero: CounsellingHero | null;
  intro: CounsellingIntro | null;
  support: SupportSection | null;
  process: ProcessSection | null;
  team: TeamSection | null;
  benefits: BenefitsSection | null;
  faq: FaqSection | null;
  cta: CtaBanner | null;
}

export type PhysicalHealthContent = MentalHealthContent;
