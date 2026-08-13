import type { CtaLink, FaqSection, Html, MediaImage, TeamSection } from "./common";
import type {
  BenefitsSection,
  CounsellingHero,
  CtaBanner,
  SupportCard,
} from "./mental-health";

export interface NoticeItem {
  title: string;
  description: Html;
  icon: MediaImage | null;
}

export interface NoticeSection {
  label: string;
  heading: string;
  paragraph: Html;
  cta: CtaLink | null;
  items: NoticeItem[];
}

export interface ApproachSection {
  label: string;
  heading: string;
  paragraph: Html;
  image: MediaImage | null;
  quote: Html;
}

export interface KidsSupportSection {
  label: string;
  heading: string;
  paragraph: Html;
  image: MediaImage | null;
  cards: SupportCard[];
}

export interface RoleItem {
  title: string;
  description: Html;
  image: MediaImage | null;
}

export interface RoleSection {
  label: string;
  heading: string;
  paragraph: Html;
  items: RoleItem[];
}

export interface InsuranceCta {
  label: string;
  heading: string;
  paragraph: Html;
  cta: CtaLink | null;
}

export interface KidsPlayTherapyContent {
  hero: CounsellingHero | null;
  notice: NoticeSection | null;
  approach: ApproachSection | null;
  support: KidsSupportSection | null;
  process: BenefitsSection | null;
  role: RoleSection | null;
  team: TeamSection | null;
  insurance: InsuranceCta | null;
  faq: FaqSection | null;
  cta: CtaBanner | null;
}
