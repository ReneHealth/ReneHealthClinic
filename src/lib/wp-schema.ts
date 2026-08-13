import type { SeoType } from "./metadata";

export interface WpMediaItem {
  sourceUrl: string | null;
  altText: string | null;
  mediaDetails: { width: number | null; height: number | null } | null;
}

export interface WpMediaNode {
  node: WpMediaItem | null;
}

export interface WpMediaNodes {
  nodes: WpMediaItem[] | null;
}

export interface WpHours {
  days: string | null;
  time: string | null;
}

export interface WpMenuItem {
  id: string;
  label: string | null;
  uri: string | null;
  url: string | null;
  target: string | null;
  parentId: string | null;
}

export interface WpMenuItems {
  nodes: WpMenuItem[] | null;
}

export interface WpSettings {
  headerLogo: WpMediaNode | null;
  marqueeText: string | null;
  footerLogo: WpMediaNode | null;
  footerLogoContent: string | null;
  newsletterNote: string | null;
  newsletterSuccess: string | null;
  hoursTitle: string | null;
  hours: WpHours[] | null;
  visitTitle: string | null;
  contactTitle: string | null;
  exploreTitle: string | null;
  socialTitle: string | null;
  socialFacebook: string | null;
  socialInstagram: string | null;
  footerWordmark: string | null;
  phone: string | null;
  phoneLink: string | null;
  email: string | null;
  address: string | null;
  bookingLabel: string | null;
  bookingUrl: string | null;

  menuContactTitle: string | null;
  menuPhone: string | null;
  menuPhoneLink: string | null;
  menuEmail: string | null;
  menuAddress: string | null;
  menuHoursTitle: string | null;
  menuHours: WpHours[] | null;
  menuBookingLabel: string | null;
  menuBookingUrl: string | null;
}

export interface WpHomePage {
  heroPanels:
    | {
        title: string | null;
        description: string | null;
        buttonLabel: string | null;
        buttonUrl: string | null;
        image: WpMediaNode | null;
      }[]
    | null;

  aboutLabel: string | null;
  aboutHeading: string | null;
  aboutParagraph: string | null;
  aboutCards:
    | {
        titleA: string | null;
        titleB: string | null;
        description: string | null;
        image: WpMediaNode | null;
      }[]
    | null;

  needsLabel: string | null;
  needsHeading: string | null;
  needsParagraph: string | null;
  needsItems:
    | {
        verb: string | null;
        title: string | null;
        description: string | null;
      }[]
    | null;

  teamLabel: string | null;
  teamHeading: string | null;
  teamParagraph: string | null;
  teamButtonLabel: string | null;
  teamButtonUrl: string | null;

  videoFile: { node: { mediaItemUrl: string | null } | null } | null;
  videoPoster: WpMediaNode | null;
  videoLabel: string | null;

  servicesLabel: string | null;
  servicesHeading: string | null;
  servicesParagraph: string | null;
  servicesColumns:
    | {
        label: string | null;
        title: string | null;
        layout: string[] | string | null;
        image: WpMediaNode | null;
        buttonLabel: string | null;
        buttonUrl: string | null;
        items: { title: string | null; description: string | null }[] | null;
      }[]
    | null;

  gtkLabel: string | null;
  gtkHeading: string | null;
  gtkParagraph: string | null;
  gtkButtonLabel: string | null;
  gtkButtonUrl: string | null;
  gtkBackgrounds: WpMediaNodes | null;
  gtkCards: { title: string | null; description: string | null }[] | null;

  faqLabel: string | null;
  faqHeading: string | null;
  faqParagraph: string | null;
  faqItems: WpFaqNodes | null;

  reviewsLabel: string | null;
  reviewsHeading: string | null;
  reviewsParagraph: string | null;

  contactLabel: string | null;
  contactHeading: string | null;
  contactParagraph: string | null;
  contactImage: WpMediaNode | null;
  contactImageAlt: string | null;
}

export interface WpMentalHealthPage {
  heroLabel: string | null;
  heroHeading: string | null;
  heroParagraph: string | null;
  heroButtonLabel: string | null;
  heroButtonUrl: string | null;
  heroImage: WpMediaNode | null;

  introLabel: string | null;
  introHeading: string | null;
  introParagraph: string | null;
  introImage: WpMediaNode | null;

  supportLabel: string | null;
  supportHeading: string | null;
  supportParagraph: string | null;
  supportCards:
    | {
        title: string | null;
        description: string | null;
        icon: WpMediaNode | null;
        buttonLabel: string | null;
        buttonUrl: string | null;
      }[]
    | null;

  processLabel: string | null;
  processHeading: string | null;
  processParagraph: string | null;
  processSteps:
    | {
        title: string | null;
        description: string | null;
        image: WpMediaNode | null;
      }[]
    | null;

  teamLabel: string | null;
  teamHeading: string | null;
  teamParagraph: string | null;

  benefitsLabel: string | null;
  benefitsHeading: string | null;
  benefitsParagraph: string | null;
  benefitsBackgrounds: WpMediaNodes | null;
  benefitsCards:
    | {
        title: string | null;
        description: string | null;
        buttonLabel: string | null;
        buttonUrl: string | null;
      }[]
    | null;
  benefitsFootnote: string | null;

  faqLabel: string | null;
  faqHeading: string | null;
  faqParagraph: string | null;
  faqItems: WpFaqNodes | null;

  ctaHeading: string | null;
  ctaParagraph: string | null;
  ctaButtonLabel: string | null;
  ctaButtonUrl: string | null;
  ctaImage: WpMediaNode | null;
}

export interface WpContactUsPage {
  heroLabel: string | null;
  heroHeading: string | null;
  heroParagraph: string | null;
  heroButtonLabel: string | null;
  heroButtonUrl: string | null;
  heroImage: WpMediaNode | null;

  infoLabel: string | null;
  infoHeading: string | null;
  infoParagraph: string | null;
  infoMapEmbed: string | null;

  guideLabel: string | null;
  guideHeading: string | null;
  guideParagraph: string | null;
  guideButtonLabel: string | null;
  guideButtonUrl: string | null;
  guideImage: WpMediaNode | null;

  faqLabel: string | null;
  faqHeading: string | null;
  faqParagraph: string | null;
  faqItems: WpFaqNodes | null;

  ctaHeading: string | null;
  ctaParagraph: string | null;
  ctaButtonLabel: string | null;
  ctaButtonUrl: string | null;
  ctaImage: WpMediaNode | null;
}

export interface WpInsurancePage {
  heroLabel: string | null;
  heroHeading: string | null;
  heroParagraph: string | null;
  heroButtonLabel: string | null;
  heroButtonUrl: string | null;
  heroImage: WpMediaNode | null;

  coverageLabel: string | null;
  coverageHeading: string | null;
  coverageParagraph: string | null;
  coverageCards:
    | {
        title: string | null;
        description: string | null;
        icon: WpMediaNode | null;
        buttonLabel: string | null;
        buttonUrl: string | null;
      }[]
    | null;

  processLabel: string | null;
  processHeading: string | null;
  processParagraph: string | null;
  processSteps:
    | {
        title: string | null;
        description: string | null;
        image: WpMediaNode | null;
      }[]
    | null;

  benefitsLabel: string | null;
  benefitsHeading: string | null;
  benefitsParagraph: string | null;
  benefitsIcon: WpMediaNode | null;
  benefitsItems: { title: string | null; description: string | null }[] | null;
  benefitsFootnote: string | null;

  providersLabel: string | null;
  providersHeading: string | null;
  providersParagraph: string | null;
  providersTabs:
    | {
        tabId: string | null;
        tabLabel: string | null;
        tabProviders: { name: string | null; logo: WpMediaNode | null }[] | null;
        tabHtml: string | null;
      }[]
    | null;
  providersNote: string | null;

  beforeLabel: string | null;
  beforeHeading: string | null;
  beforeParagraph: string | null;
  beforeButtonLabel: string | null;
  beforeButtonUrl: string | null;

  faqLabel: string | null;
  faqHeading: string | null;
  faqParagraph: string | null;
  faqItems: WpFaqNodes | null;
}

export interface WpKidsPlayTherapyPage {
  heroLabel: string | null;
  heroHeading: string | null;
  heroParagraph: string | null;
  heroButtonLabel: string | null;
  heroButtonUrl: string | null;
  heroImage: WpMediaNode | null;

  noticeLabel: string | null;
  noticeHeading: string | null;
  noticeParagraph: string | null;
  noticeButtonLabel: string | null;
  noticeButtonUrl: string | null;
  noticeItems:
    | { title: string | null; description: string | null; icon: WpMediaNode | null }[]
    | null;

  approachLabel: string | null;
  approachHeading: string | null;
  approachParagraph: string | null;
  approachImage: WpMediaNode | null;
  approachQuote: string | null;

  supportLabel: string | null;
  supportHeading: string | null;
  supportParagraph: string | null;
  supportImage: WpMediaNode | null;
  supportCards:
    | {
        title: string | null;
        description: string | null;
        icon: WpMediaNode | null;
        buttonLabel: string | null;
        buttonUrl: string | null;
      }[]
    | null;

  processLabel: string | null;
  processHeading: string | null;
  processParagraph: string | null;
  processBackgrounds: WpMediaNodes | null;
  processCards:
    | {
        title: string | null;
        description: string | null;
        buttonLabel: string | null;
        buttonUrl: string | null;
      }[]
    | null;
  processFootnote: string | null;

  roleLabel: string | null;
  roleHeading: string | null;
  roleParagraph: string | null;
  roleItems:
    | { title: string | null; description: string | null; image: WpMediaNode | null }[]
    | null;

  teamLabel: string | null;
  teamHeading: string | null;
  teamParagraph: string | null;
  teamButtonLabel: string | null;
  teamButtonUrl: string | null;
  teamMembersPicked: WpTeamMemberNodes | null;

  insuranceLabel: string | null;
  insuranceHeading: string | null;
  insuranceParagraph: string | null;
  insuranceButtonLabel: string | null;
  insuranceButtonUrl: string | null;

  faqLabel: string | null;
  faqHeading: string | null;
  faqParagraph: string | null;
  faqItems: WpFaqNodes | null;

  ctaHeading: string | null;
  ctaParagraph: string | null;
  ctaButtonLabel: string | null;
  ctaButtonUrl: string | null;
  ctaImage: WpMediaNode | null;
}

export interface WpOurTeamPage {
  heroLabel: string | null;
  heroHeading: string | null;
  heroParagraph: string | null;
  heroImage: WpMediaNode | null;
  heroButtonLabel: string | null;
  heroButtonUrl: string | null;

  videoFile: { node: { mediaItemUrl: string | null } | null } | null;
  videoPoster: WpMediaNode | null;
  videoLabel: string | null;

  faqLabel: string | null;
  faqHeading: string | null;
  faqParagraph: string | null;
  faqItems: WpFaqNodes | null;

  ctaHeading: string | null;
  ctaParagraph: string | null;
  ctaButtonLabel: string | null;
  ctaButtonUrl: string | null;
  ctaImage: WpMediaNode | null;
}

export interface WpSiteQuery {
  globalSettings: { siteSettings: WpSettings | null } | null;

  headerDesktopLeft: WpMenuItems | null;
  headerDesktopRight: WpMenuItems | null;
  menuFullscreen: WpMenuItems | null;
  footerExplore: WpMenuItems | null;
  footerBottom: WpMenuItems | null;
}

export interface WpTeamCategoryNodes {
  nodes: {
    id?: string;
    databaseId?: number | null;
    name: string | null;
    slug: string | null;
    description?: string | null;
    displayOrder?: number | null;
    teamCategoryFields?: {
      showOnOurTeam?: boolean | null;
      tabLabel?: string | null;
      sectionTitle?: string | null;
      sectionDescription?: string | null;
    } | null;
  }[];
}

export interface WpTeamMemberNodes {
  nodes: {
    id: string;
    title: string | null;
    slug?: string | null;
    featuredImage: WpMediaNode | null;
    teamCategories?: WpTeamCategoryNodes | null;
    teamMemberFields: {
      role: string | null;
      bio: string | null;
      popupIntroduction?: string | null;
      popupContent?: string | null;
      popupButtonLabel?: string | null;
      popupButtonUrl?: string | null;
    } | null;
  }[];
}

export interface WpFaqNodes {
  nodes: {
    id: string;
    title: string | null;
    faqFields: { answer: string | null } | null;
  }[];
}

export interface WpMentalHealthQuery extends WpSiteQuery {
  teamMembers: WpTeamMemberNodes | null;
  teamCategories?: WpTeamCategoryNodes | null;
  page: { id: string; seo?: SeoType | null; mentalHealthPage: WpMentalHealthPage | null } | null;
}

export type WpPhysicalHealthPage = WpMentalHealthPage;

export interface WpPhysicalHealthQuery extends WpSiteQuery {
  teamMembers: WpTeamMemberNodes | null;
  teamCategories?: WpTeamCategoryNodes | null;
  page: {
    id: string;
    seo?: SeoType | null;
    physicalHealthPage: WpPhysicalHealthPage | null;
  } | null;
}

export interface WpContactUsQuery extends WpSiteQuery {
  page: { id: string; seo?: SeoType | null; contactUsPage: WpContactUsPage | null } | null;
}

export interface WpInsuranceQuery extends WpSiteQuery {
  page: { id: string; seo?: SeoType | null; insurancePage: WpInsurancePage | null } | null;
}

export interface WpKidsPlayTherapyQuery extends WpSiteQuery {
  teamCategories?: WpTeamCategoryNodes | null;
  page: { id: string; seo?: SeoType | null; kidsPlayTherapyPage: WpKidsPlayTherapyPage | null } | null;
}

export interface WpOurTeamQuery extends WpSiteQuery {
  teamMembers: WpTeamMemberNodes | null;
  teamCategories?: WpTeamCategoryNodes | null;
  page: { id: string; seo?: SeoType | null; ourTeamPage: WpOurTeamPage | null } | null;
}

export interface WpHomeQuery extends WpSiteQuery {
  teamMembers: WpTeamMemberNodes | null;
  teamCategories?: WpTeamCategoryNodes | null;

  reviews: {
    nodes: {
      id: string;
      title: string | null;
      featuredImage: WpMediaNode | null;
      reviewFields: {
        quote: string | null;
        reviewerName: string | null;
        rating: number | null;
      } | null;
    }[];
  } | null;

  page: { id: string; seo?: SeoType | null; homePage: WpHomePage | null } | null;
}
