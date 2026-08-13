import type {
  CtaLink,
  FaqSection,
  Html,
  MediaImage,
  TeamSection,
} from "./common";

export interface HeroPanel {
  title: string;
  description: Html;
  cta: CtaLink | null;
  image: MediaImage | null;
}

export interface AboutCard {
  titleA: string;
  titleB: string;
  description: Html;
  image: MediaImage | null;
}

export interface AboutSection {
  label: string;
  heading: Html;
  paragraph: Html;
  cards: AboutCard[];
}

export interface NeedItem {
  verb: string;
  title: string;
  description: Html;
}

export interface DifferentNeedsSection {
  label: string;
  heading: string;
  paragraph: Html;
  items: NeedItem[];
}

export interface VideoSectionContent {
  src: string;
  poster: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  description: Html;
}

export type ServiceCardLayout = "stacked" | "split";

export interface ServiceColumn {
  label: string;
  title: string;
  layout: ServiceCardLayout;
  cta: CtaLink | null;
  image: MediaImage | null;
  items: ServiceItem[];
}

export interface ServicesSection {
  label: string;
  heading: string;
  paragraph: Html;
  columns: ServiceColumn[];
}

export interface GoodToKnowCard {
  title: string;
  description: Html;
}

export interface GoodToKnowSection {
  label: string;
  heading: string;
  paragraph: Html;
  cta: CtaLink | null;
  backgrounds: string[];
  cards: GoodToKnowCard[];
}

export interface Review {
  id: string;
  tagline: string;
  quote: Html;
  name: string;
  avatar: MediaImage | null;
  rating: number;
}

export interface ReviewsSection {
  label: string;
  heading: string;
  paragraph: Html;
  items: Review[];
}

export interface ContactSection {
  label: string;
  heading: string;
  paragraph: Html;
  image: MediaImage | null;
}

export interface ContactFormFields {
  name: string;
  email: string;
  phone: string;
  service: string;
  dateTime: string;
  message: string;
}

export interface HomeContent {
  hero: HeroPanel[];
  about: AboutSection | null;
  differentNeeds: DifferentNeedsSection | null;
  team: TeamSection | null;
  video: VideoSectionContent | null;
  services: ServicesSection | null;
  goodToKnow: GoodToKnowSection | null;
  faq: FaqSection | null;
  reviews: ReviewsSection | null;
  contact: ContactSection | null;
}
