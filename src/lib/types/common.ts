export type Html = string;

export interface MediaImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CtaLink {
  label: string;
  href: string;
  target?: "_blank";
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  target?: "_blank";
  children?: NavLink[];
}

export type MenuLocation =
  | "headerDesktopLeft"
  | "headerDesktopRight"
  | "menuFullscreen"
  | "footerExplore"
  | "footerBottom";

export type SiteMenus = Record<MenuLocation, NavLink[]>;

export interface OpeningHours {
  days: string;
  time: string;
}

export interface MenuContact {
  contactTitle: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: Html;
  hoursTitle: string;
  hours: OpeningHours[];
  booking: CtaLink;
}

export interface SiteSettings {
  headerLogo: MediaImage | null;
  marquee: Html;
  footerLogo: MediaImage | null;
  footerLogoContent: Html;
  newsletterNote: Html;
  newsletterSuccess: string;
  hoursTitle: string;
  hours: OpeningHours[];
  visitTitle: string;
  contactTitle: string;
  exploreTitle: string;
  socialTitle: string;
  socialFacebook: string;
  socialInstagram: string;
  footerWordmark: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: Html;
  booking: CtaLink;
  menu: MenuContact;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: Html;
}

export interface FaqSection {
  label: string;
  heading: string;
  paragraph: Html;
  items: FaqItem[];
}

export type TeamCategory = string;

export interface TeamCategoryOption {
  id: TeamCategory;
  label: string;
  description?: Html;
}

export interface TeamMemberPopup {
  title: string;
  designation: string;
  image: { src: string; alt: string; width: number; height: number };
  introduction: Html;
  content?: Html;
  buttonLabel?: string;
  buttonUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: Html;
  image: MediaImage | null;
  category: TeamCategory;
  popup?: TeamMemberPopup;
}

export interface TeamSection {
  label: string;
  heading: string;
  paragraph: Html;
  cta: CtaLink | null;
  members: TeamMember[];
  categories: TeamCategoryOption[];
}
