import { cache } from "react";

import * as format from "./format";
import { wpQuery } from "./graphql";
import {
  CONTACT_US_QUERY,
  HOME_QUERY,
  INSURANCE_QUERY,
  KIDS_PLAY_THERAPY_QUERY,
  MENTAL_HEALTH_QUERY,
  OUR_TEAM_QUERY,
  PHYSICAL_HEALTH_QUERY,
  SITE_QUERY,
} from "./queries";
import type { SeoType } from "./metadata";
import * as local from "./data";
import { contactUs as localContactUs } from "./contact-us-data";
import { insurance as localInsurance } from "./insurance-data";
import { kidsPlayTherapy as localKidsPlayTherapy } from "./kids-play-therapy-data";
import {
  teamContent as localTeamContent,
  teamHeroContent as localTeamHero,
} from "./teamContent";
import type {
  TeamCategoryType,
  TeamHeroType,
  TeamMemberType,
  TeamSectionType,
  VideoSectionContent,
} from "./teamContent";
import type {
  WpContactUsQuery,
  WpFaqNodes,
  WpHomeQuery,
  WpHours,
  WpIconNode,
  WpInsurancePage,
  WpInsuranceQuery,
  WpKidsPlayTherapyQuery,
  WpMediaNode,
  WpMentalHealthPage,
  WpMentalHealthQuery,
  WpMenuItem,
  WpMenuItems,
  WpOurTeamQuery,
  WpPhysicalHealthQuery,
  WpSettings,
  WpSiteQuery,
  WpTeamCategoryNodes,
  WpTeamMemberNodes,
} from "./wp-schema";
import type {
  CtaLink,
  FaqItem,
  FaqSection,
  MediaImage,
  MenuContact,
  NavLink,
  OpeningHours,
  SiteIcon,
  SiteMenus,
  SiteSettings,
  TeamCategory,
  TeamCategoryOption,
  TeamMember,
} from "./types/common";
import type { ContactUsContent } from "./types/contact-us";
import type { HomeContent, ServiceCardLayout } from "./types/home";
import type {
  InsuranceContent,
  InsuranceProviderTab,
  WhoWeBillSection,
} from "./types/insurance";
import type { KidsPlayTherapyContent } from "./types/kids-play-therapy";
import type {
  CtaBanner,
  MentalHealthContent,
  PhysicalHealthContent,
} from "./types/mental-health";

const USE_WP = process.env.NEXT_PUBLIC_CONTENT_SOURCE === "wordpress";

const image = (field: WpMediaNode | null | undefined): MediaImage | null =>
  format.image(field) ?? null;

const cta = (
  label: string | null | undefined,
  url: string | null | undefined,
): CtaLink | null => format.cta(label, url) ?? null;

const icon = (field: WpIconNode | null | undefined): SiteIcon | null => {
  const node = field?.node;
  if (!node?.sourceUrl) return null;

  const { width, height } = node.mediaDetails ?? {};
  const sizes =
    node.mimeType === "image/svg+xml"
      ? "any"
      : width && height
        ? `${width}x${height}`
        : null;

  return {
    url: node.sourceUrl,
    ...(node.mimeType ? { type: node.mimeType } : null),
    ...(sizes ? { sizes } : null),
  };
};

const serviceCardLayout = (value: unknown): ServiceCardLayout =>
  format.selectValue(value) === "split" ? "split" : "stacked";

const { str, filled, hasRows } = format;

const hours = (rows: WpHours[] | null | undefined): OpeningHours[] =>
  (rows ?? []).map((row) => ({ days: str(row.days), time: str(row.time) }));

const telHref = (link: string | null | undefined, phone: string): string =>
  link || `tel:${phone.replace(/[^\d+]/g, "")}`;

const FALLBACK_BOOKING: CtaLink = {
  label: "Book An Appointment",
  href: "https://renehealthclinic.janeapp.com/",
};

function menuHref(item: WpMenuItem): string {
  return item.uri ?? item.url ?? "/";
}

function menu(connection: WpMenuItems | null | undefined): NavLink[] {
  const items = connection?.nodes ?? [];
  const roots: NavLink[] = [];
  const byId = new Map<string, NavLink>();

  for (const item of items) {
    byId.set(item.id, {
      id: item.id,
      label: str(item.label),
      href: menuHref(item),
      ...(item.target === "_blank" ? { target: "_blank" as const } : null),
    });
  }

  for (const item of items) {
    const link = byId.get(item.id);
    if (!link) continue;

    const parent = item.parentId ? byId.get(item.parentId) : undefined;
    if (!parent) {
      roots.push(link);
      continue;
    }
    parent.children = [...(parent.children ?? []), link];
  }

  return roots;
}

function teamCategory(node: WpTeamMemberNodes["nodes"][number]): TeamCategory {
  return str(node.teamCategories?.nodes?.[0]?.slug);
}

interface TeamCategoryDetail extends TeamCategoryOption {
  name: string;
  title: string;
  showOnOurTeam: boolean;
}

const teamCategoryDetails = (
  connection: WpTeamCategoryNodes | null | undefined,
): TeamCategoryDetail[] =>
  (connection?.nodes ?? [])
    .filter((term) => !!term.slug)
    .map((term) => {
      const f = term.teamCategoryFields;
      const name = str(term.name, str(term.slug));

      return {
        id: str(term.slug),
        name,
        label: str(f?.tabLabel) || name,
        title: str(f?.sectionTitle) || name,
        description: str(f?.sectionDescription) || str(term.description),
        showOnOurTeam: !!f?.showOnOurTeam,
        order: term.displayOrder ?? 0,
      };
    })
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
    .map(({ order: _order, ...category }) => category);

const teamCategoryOptions = (
  connection: WpTeamCategoryNodes | null | undefined,
): TeamCategoryOption[] =>
  teamCategoryDetails(connection).map(({ id, name, description }) => ({
    id,
    label: name,
    description,
  }));

function toMenuContact(s: WpSettings | null | undefined): MenuContact {
  const phone = str(s?.menuPhone);

  return {
    contactTitle: str(s?.menuContactTitle, "Get in touch"),
    phone,
    phoneHref: telHref(s?.menuPhoneLink, phone),
    email: str(s?.menuEmail),
    address: str(s?.menuAddress),
    hoursTitle: str(s?.menuHoursTitle, "Hours"),
    hours: hours(s?.menuHours),
    booking: cta(s?.menuBookingLabel, s?.menuBookingUrl) ?? FALLBACK_BOOKING,
  };
}

const teamMembers = (
  connection: WpTeamMemberNodes | null | undefined,
): TeamMember[] =>
  (connection?.nodes ?? []).map((member) => {
    const f = member.teamMemberFields;
    const img = image(member.featuredImage);

    return {
      id: member.id,
      name: str(member.title),
      role: str(f?.role),
      bio: str(f?.bio),
      image: img,
      category: teamCategory(member),
      popup: {
        title: str(member.title),
        designation: str(f?.role),
        image: img ?? { src: "", alt: "", width: 100, height: 100 },
        introduction: str(f?.popupIntroduction, str(f?.bio)),
        content: str(f?.popupContent),
        buttonLabel: f?.popupButtonLabel ?? undefined,
        buttonUrl: f?.popupButtonUrl ?? undefined,
      },
    };
  });

const faqItems = (connection: WpFaqNodes | null | undefined): FaqItem[] =>
  (connection?.nodes ?? []).map((item) => ({
    id: item.id,
    question: str(item.title),
    answer: str(item.faqFields?.answer),
  }));

export function toSettings(data: WpSiteQuery): SiteSettings {
  const s = data.globalSettings?.siteSettings;
  const phone = str(s?.phone);

  return {
    headerLogo: image(s?.headerLogo),
    marquee: str(s?.marqueeText),
    footerLogo: image(s?.footerLogo),
    footerLogoContent: str(s?.footerLogoContent),
    newsletterNote: str(s?.newsletterNote),
    newsletterSuccess: str(
      s?.newsletterSuccess,
      "Thanks — you are on the list.",
    ),
    hoursTitle: str(s?.hoursTitle, "Hours"),
    hours: hours(s?.hours),
    visitTitle: str(s?.visitTitle, "Visit"),
    contactTitle: str(s?.contactTitle, "Contact"),
    exploreTitle: str(s?.exploreTitle, "Explore"),
    socialTitle: str(s?.socialTitle, "Social Media Links"),
    socialFacebook: str(s?.socialFacebook),
    socialInstagram: str(s?.socialInstagram),
    footerWordmark: str(s?.footerWordmark),
    phone,
    phoneHref: telHref(s?.phoneLink, phone),
    email: str(s?.email),
    address: str(s?.address),
    booking: cta(s?.bookingLabel, s?.bookingUrl) ?? FALLBACK_BOOKING,
    menu: toMenuContact(s),
    favicon: icon(s?.favicon),
  };
}

function toMenus(data: WpSiteQuery): SiteMenus {
  return {
    headerDesktopLeft: menu(data.headerDesktopLeft),
    headerDesktopRight: menu(data.headerDesktopRight),
    menuFullscreen: menu(data.menuFullscreen),
    footerExplore: menu(data.footerExplore),
    footerBottom: menu(data.footerBottom),
  };
}

export function toHome(data: WpHomeQuery): HomeContent {
  const p = data.page?.homePage;

  const videoSrc = p?.videoFile?.node?.mediaItemUrl ?? null;
  const videoPoster = image(p?.videoPoster);

  const members = teamMembers(data.teamMembers);
  const faq = faqItems(p?.faqItems);
  const reviews = data.reviews?.nodes ?? [];
  const contactImage = (() => {
    const img = image(p?.contactImage);
    if (!img) return null;
    const alt = str(p?.contactImageAlt);
    return alt ? { ...img, alt } : img;
  })();

  return {
    hero: (p?.heroPanels ?? []).map((panel) => ({
      title: str(panel.title),
      description: str(panel.description),
      cta: cta(panel.buttonLabel, panel.buttonUrl),
      image: image(panel.image),
    })),

    about:
      filled(p?.aboutLabel, p?.aboutHeading, p?.aboutParagraph) ||
      hasRows(p?.aboutCards)
        ? {
            label: str(p?.aboutLabel),
            heading: str(p?.aboutHeading),
            paragraph: str(p?.aboutParagraph),
            cards: (p?.aboutCards ?? []).map((card) => ({
              titleA: str(card.titleA),
              titleB: str(card.titleB),
              description: str(card.description),
              image: image(card.image),
            })),
          }
        : null,

    differentNeeds:
      filled(p?.needsLabel, p?.needsHeading, p?.needsParagraph) ||
      hasRows(p?.needsItems)
        ? {
            label: str(p?.needsLabel),
            heading: str(p?.needsHeading),
            paragraph: str(p?.needsParagraph),
            items: (p?.needsItems ?? []).map((item) => ({
              verb: str(item.verb),
              title: str(item.title),
              description: str(item.description),
            })),
          }
        : null,

    team:
      filled(p?.teamLabel, p?.teamHeading, p?.teamParagraph) ||
      hasRows(members)
        ? {
            label: str(p?.teamLabel),
            heading: str(p?.teamHeading),
            paragraph: str(p?.teamParagraph),
            cta:
              p?.showTeamButton === false
                ? null
                : cta(p?.teamButtonLabel, p?.teamButtonUrl),
            members,
            categories: teamCategoryOptions(data.teamCategories),
          }
        : null,

    video: videoSrc
      ? {
          src: videoSrc,
          poster: videoPoster?.src ?? "",
          label: str(p?.videoLabel),
        }
      : null,

    services:
      filled(p?.servicesLabel, p?.servicesHeading, p?.servicesParagraph) ||
      hasRows(p?.servicesColumns)
        ? {
            label: str(p?.servicesLabel),
            heading: str(p?.servicesHeading),
            paragraph: str(p?.servicesParagraph),
            columns: (p?.servicesColumns ?? []).map((col) => ({
              label: str(col.label),
              title: str(col.title),
              layout: serviceCardLayout(col.layout),
              cta: cta(col.buttonLabel, col.buttonUrl),
              image: image(col.image),
              items: (col.items ?? []).map((item) => ({
                title: str(item.title),
                description: str(item.description),
              })),
            })),
          }
        : null,

    goodToKnow:
      filled(p?.gtkLabel, p?.gtkHeading, p?.gtkParagraph) ||
      hasRows(p?.gtkCards)
        ? {
            label: str(p?.gtkLabel),
            heading: str(p?.gtkHeading),
            paragraph: str(p?.gtkParagraph),
            cta: cta(p?.gtkButtonLabel, p?.gtkButtonUrl),
            backgrounds: (p?.gtkBackgrounds?.nodes ?? [])
              .map((node) => node.sourceUrl)
              .filter((src): src is string => Boolean(src)),
            cards: (p?.gtkCards ?? []).map((card) => ({
              title: str(card.title),
              description: str(card.description),
            })),
          }
        : null,

    faq:
      filled(p?.faqLabel, p?.faqHeading, p?.faqParagraph) || hasRows(faq)
        ? {
            label: str(p?.faqLabel),
            heading: str(p?.faqHeading),
            paragraph: str(p?.faqParagraph),
            items: faq,
          }
        : null,

    reviews:
      filled(p?.reviewsLabel, p?.reviewsHeading, p?.reviewsParagraph) ||
      hasRows(reviews)
        ? {
            label: str(p?.reviewsLabel),
            heading: str(p?.reviewsHeading),
            paragraph: str(p?.reviewsParagraph),
            items: reviews.map((item) => ({
              id: item.id,
              tagline: str(item.title),
              quote: str(item.reviewFields?.quote),
              name: str(item.reviewFields?.reviewerName),
              avatar: image(item.featuredImage),
              rating: item.reviewFields?.rating ?? 5,
            })),
          }
        : null,

    contact:
      filled(p?.contactLabel, p?.contactHeading, p?.contactParagraph) ||
      Boolean(contactImage)
        ? {
            label: str(p?.contactLabel),
            heading: str(p?.contactHeading),
            paragraph: str(p?.contactParagraph),
            image: contactImage,
          }
        : null,
  };
}

function toCounsellingHub(
  p: WpMentalHealthPage | null | undefined,
  members: TeamMember[],
  categories: TeamCategoryOption[],
): MentalHealthContent {
  const faq = faqItems(p?.faqItems);

  return {
    hero:
      filled(p?.heroLabel, p?.heroHeading, p?.heroParagraph) ||
      Boolean(image(p?.heroImage))
        ? {
            label: str(p?.heroLabel),
            heading: str(p?.heroHeading),
            paragraph: str(p?.heroParagraph),
            cta: cta(p?.heroButtonLabel, p?.heroButtonUrl),
            image: image(p?.heroImage),
            logo: image(p?.heroLogo) ?? null,
          }
        : null,

    intro:
      filled(p?.introLabel, p?.introHeading, p?.introParagraph) ||
      Boolean(image(p?.introImage))
        ? {
            label: str(p?.introLabel),
            heading: str(p?.introHeading),
            paragraph: str(p?.introParagraph),
            image: image(p?.introImage),
          }
        : null,

    support:
      filled(p?.supportLabel, p?.supportHeading, p?.supportParagraph) ||
      hasRows(p?.supportCards)
        ? {
            label: str(p?.supportLabel),
            heading: str(p?.supportHeading),
            paragraph: str(p?.supportParagraph),
            cards: (p?.supportCards ?? []).map((card) => ({
              title: str(card.title),
              description: str(card.description),
              icon: image(card.icon),
              cta: cta(card.buttonLabel, card.buttonUrl),
            })),
          }
        : null,

    process:
      filled(p?.processLabel, p?.processHeading, p?.processParagraph) ||
      hasRows(p?.processSteps)
        ? {
            label: str(p?.processLabel),
            heading: str(p?.processHeading),
            paragraph: str(p?.processParagraph),
            steps: (p?.processSteps ?? []).map((step) => ({
              title: str(step.title),
              description: str(step.description),
              image: image(step.image),
            })),
          }
        : null,

    team:
      filled(p?.teamLabel, p?.teamHeading, p?.teamParagraph) ||
      hasRows(members)
        ? {
            label: str(p?.teamLabel),
            heading: str(p?.teamHeading),
            paragraph: str(p?.teamParagraph),
            cta: null,
            members,
            categories,
          }
        : null,

    benefits:
      filled(
        p?.benefitsLabel,
        p?.benefitsHeading,
        p?.benefitsParagraph,
        p?.benefitsFootnote,
      ) || hasRows(p?.benefitsCards)
        ? {
            label: str(p?.benefitsLabel),
            heading: str(p?.benefitsHeading),
            paragraph: str(p?.benefitsParagraph),
            backgrounds: (p?.benefitsBackgrounds?.nodes ?? [])
              .map((node) => node.sourceUrl)
              .filter((src): src is string => Boolean(src)),
            cards: (p?.benefitsCards ?? []).map((card) => ({
              title: str(card.title),
              description: str(card.description),
              cta: cta(card.buttonLabel, card.buttonUrl),
            })),
            footnote: str(p?.benefitsFootnote),
          }
        : null,

    faq:
      filled(p?.faqLabel, p?.faqHeading, p?.faqParagraph) || hasRows(faq)
        ? {
            label: str(p?.faqLabel),
            heading: str(p?.faqHeading),
            paragraph: str(p?.faqParagraph),
            items: faq,
          }
        : null,

    cta:
      filled(p?.ctaHeading, p?.ctaParagraph) || Boolean(image(p?.ctaImage))
        ? {
            heading: str(p?.ctaHeading),
            paragraph: str(p?.ctaParagraph),
            cta: cta(p?.ctaButtonLabel, p?.ctaButtonUrl),
            image: image(p?.ctaImage),
          }
        : null,
  };
}

export function toMentalHealth(data: WpMentalHealthQuery): MentalHealthContent {
  return toCounsellingHub(
    data.page?.mentalHealthPage,
    teamMembers(data.teamMembers),
    teamCategoryOptions(data.teamCategories),
  );
}

export function toPhysicalHealth(
  data: WpPhysicalHealthQuery,
): PhysicalHealthContent {
  return toCounsellingHub(
    data.page?.physicalHealthPage,
    teamMembers(data.teamMembers),
    teamCategoryOptions(data.teamCategories),
  );
}

export function toContactUs(data: WpContactUsQuery): ContactUsContent {
  const p = data.page?.contactUsPage;
  const faq = faqItems(p?.faqItems);

  return {
    hero:
      filled(p?.heroLabel, p?.heroHeading, p?.heroParagraph) ||
      Boolean(image(p?.heroImage))
        ? {
            label: str(p?.heroLabel),
            heading: str(p?.heroHeading),
            paragraph: str(p?.heroParagraph),
            cta: cta(p?.heroButtonLabel, p?.heroButtonUrl),
            image: image(p?.heroImage),
            logo: image(p?.heroLogo) ?? null,
          }
        : null,

    info: filled(
      p?.infoLabel,
      p?.infoHeading,
      p?.infoParagraph,
      p?.infoMapEmbed,
    )
      ? {
          label: str(p?.infoLabel),
          heading: str(p?.infoHeading),
          paragraph: str(p?.infoParagraph),
          mapEmbed: str(p?.infoMapEmbed),
        }
      : null,

    guide:
      filled(p?.guideLabel, p?.guideHeading, p?.guideParagraph) ||
      Boolean(image(p?.guideImage))
        ? {
            label: str(p?.guideLabel),
            heading: str(p?.guideHeading),
            paragraph: str(p?.guideParagraph),
            cta: cta(p?.guideButtonLabel, p?.guideButtonUrl),
            image: image(p?.guideImage),
          }
        : null,

    faq:
      filled(p?.faqLabel, p?.faqHeading, p?.faqParagraph) || hasRows(faq)
        ? {
            label: str(p?.faqLabel),
            heading: str(p?.faqHeading),
            paragraph: str(p?.faqParagraph),
            items: faq,
          }
        : null,

    cta:
      filled(p?.ctaHeading, p?.ctaParagraph) || Boolean(image(p?.ctaImage))
        ? {
            heading: str(p?.ctaHeading),
            paragraph: str(p?.ctaParagraph),
            cta: cta(p?.ctaButtonLabel, p?.ctaButtonUrl),
            image: image(p?.ctaImage),
          }
        : null,
  };
}

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&nbsp;": " ",
  "&#038;": "&",
  "&#8211;": "–",
  "&#8212;": "—",
  "&#8217;": "’",
  "&quot;": '"',
  "&lt;": "<",
  "&gt;": ">",
};

function htmlListNames(html: string): string[] {
  return [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((match) =>
      match[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/&[#a-z0-9]+;/gi, (e) => HTML_ENTITIES[e.toLowerCase()] ?? " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}

function insuranceProviderTabs(
  tabs: WpInsurancePage["providersTabs"],
): InsuranceProviderTab[] {
  return (tabs ?? []).map((tab, i) => {
    const html = str(tab.tabHtml);
    return {
      id: str(tab.tabId, `tab-${i}`),
      label: str(tab.tabLabel),
      providers: html
        ? htmlListNames(html).map((name) => ({ name, logo: null }))
        : (tab.tabProviders ?? []).map((p) => ({
            name: str(p.name),
            logo: image(p.logo),
          })),
      ...(html ? { html } : null),
    };
  });
}

export function toInsurance(data: WpInsuranceQuery): InsuranceContent {
  const p = data.page?.insurancePage;
  const faq = faqItems(p?.faqItems);
  const tabs = insuranceProviderTabs(p?.providersTabs ?? null);

  return {
    hero:
      filled(p?.heroLabel, p?.heroHeading, p?.heroParagraph) ||
      Boolean(image(p?.heroImage))
        ? {
            label: str(p?.heroLabel),
            heading: str(p?.heroHeading),
            paragraph: str(p?.heroParagraph),
            cta: cta(p?.heroButtonLabel, p?.heroButtonUrl),
            image: image(p?.heroImage),
            logo: image(p?.heroLogo) ?? null,
          }
        : null,

    coverage:
      filled(p?.coverageLabel, p?.coverageHeading, p?.coverageParagraph) ||
      hasRows(p?.coverageCards)
        ? {
            label: str(p?.coverageLabel),
            heading: str(p?.coverageHeading),
            paragraph: str(p?.coverageParagraph),
            cards: (p?.coverageCards ?? []).map((card) => ({
              title: str(card.title),
              description: str(card.description),
              icon: image(card.icon),
              cta: cta(card.buttonLabel, card.buttonUrl),
            })),
          }
        : null,

    process:
      filled(p?.processLabel, p?.processHeading, p?.processParagraph) ||
      hasRows(p?.processSteps)
        ? {
            label: str(p?.processLabel),
            heading: str(p?.processHeading),
            paragraph: str(p?.processParagraph),
            steps: (p?.processSteps ?? []).map((step) => ({
              title: str(step.title),
              description: str(step.description),
              image: image(step.image),
            })),
          }
        : null,

    benefits:
      filled(
        p?.benefitsLabel,
        p?.benefitsHeading,
        p?.benefitsParagraph,
        p?.benefitsFootnote,
      ) || hasRows(p?.benefitsItems)
        ? {
            label: str(p?.benefitsLabel),
            heading: str(p?.benefitsHeading),
            paragraph: str(p?.benefitsParagraph),
            footnote: str(p?.benefitsFootnote),
            icon: image(p?.benefitsIcon),
            items: (p?.benefitsItems ?? []).map((item) => ({
              title: str(item.title),
              description: str(item.description),
            })),
          }
        : null,

    providers:
      filled(
        p?.providersLabel,
        p?.providersHeading,
        p?.providersParagraph,
        p?.providersNote,
      ) || hasRows(tabs)
        ? {
            label: str(p?.providersLabel),
            heading: str(p?.providersHeading),
            paragraph: str(p?.providersParagraph),
            tabs,
            note: str(p?.providersNote),
          }
        : null,

    beforeYouBook: filled(
      p?.beforeLabel,
      p?.beforeHeading,
      p?.beforeParagraph,
    )
      ? {
          label: str(p?.beforeLabel),
          heading: str(p?.beforeHeading),
          paragraph: str(p?.beforeParagraph),
          cta: cta(p?.beforeButtonLabel, p?.beforeButtonUrl),
        }
      : null,

    faq:
      filled(p?.faqLabel, p?.faqHeading, p?.faqParagraph) || hasRows(faq)
        ? {
            label: str(p?.faqLabel),
            heading: str(p?.faqHeading),
            paragraph: str(p?.faqParagraph),
            items: faq,
          }
        : null,
  };
}

export function toKidsPlayTherapy(
  data: WpKidsPlayTherapyQuery,
): KidsPlayTherapyContent {
  const p = data.page?.kidsPlayTherapyPage;
  const members = teamMembers(p?.teamMembersPicked);
  const faq = faqItems(p?.faqItems);

  return {
    hero:
      filled(p?.heroLabel, p?.heroHeading, p?.heroParagraph) ||
      Boolean(image(p?.heroImage))
        ? {
            label: str(p?.heroLabel),
            heading: str(p?.heroHeading),
            paragraph: str(p?.heroParagraph),
            cta: cta(p?.heroButtonLabel, p?.heroButtonUrl),
            image: image(p?.heroImage),
            logo: image(p?.heroLogo) ?? null,
          }
        : null,

    notice:
      filled(p?.noticeLabel, p?.noticeHeading, p?.noticeParagraph) ||
      hasRows(p?.noticeItems)
        ? {
            label: str(p?.noticeLabel),
            heading: str(p?.noticeHeading),
            paragraph: str(p?.noticeParagraph),
            cta: cta(p?.noticeButtonLabel, p?.noticeButtonUrl),
            items: (p?.noticeItems ?? []).map((item) => ({
              title: str(item.title),
              description: str(item.description),
              icon: image(item.icon),
            })),
          }
        : null,

    approach:
      filled(
        p?.approachLabel,
        p?.approachHeading,
        p?.approachParagraph,
        p?.approachQuote,
      ) || Boolean(image(p?.approachImage))
        ? {
            label: str(p?.approachLabel),
            heading: str(p?.approachHeading),
            paragraph: str(p?.approachParagraph),
            image: image(p?.approachImage),
            quote: str(p?.approachQuote),
          }
        : null,

    support:
      filled(p?.supportLabel, p?.supportHeading, p?.supportParagraph) ||
      hasRows(p?.supportCards)
        ? {
            label: str(p?.supportLabel),
            heading: str(p?.supportHeading),
            paragraph: str(p?.supportParagraph),
            image: image(p?.supportImage),
            cards: (p?.supportCards ?? []).map((card) => ({
              title: str(card.title),
              description: str(card.description),
              icon: image(card.icon),
              cta: cta(card.buttonLabel, card.buttonUrl),
            })),
          }
        : null,

    process:
      filled(
        p?.processLabel,
        p?.processHeading,
        p?.processParagraph,
        p?.processFootnote,
      ) || hasRows(p?.processCards)
        ? {
            label: str(p?.processLabel),
            heading: str(p?.processHeading),
            paragraph: str(p?.processParagraph),
            backgrounds: (p?.processBackgrounds?.nodes ?? [])
              .map((node) => node.sourceUrl)
              .filter((src): src is string => Boolean(src)),
            cards: (p?.processCards ?? []).map((card) => ({
              title: str(card.title),
              description: str(card.description),
              cta: cta(card.buttonLabel, card.buttonUrl),
            })),
            footnote: str(p?.processFootnote),
          }
        : null,

    role:
      filled(p?.roleLabel, p?.roleHeading, p?.roleParagraph) ||
      hasRows(p?.roleItems)
        ? {
            label: str(p?.roleLabel),
            heading: str(p?.roleHeading),
            paragraph: str(p?.roleParagraph),
            items: (p?.roleItems ?? []).map((item) => ({
              title: str(item.title),
              description: str(item.description),
              image: image(item.image),
            })),
          }
        : null,

    team:
      filled(p?.teamLabel, p?.teamHeading, p?.teamParagraph) ||
      hasRows(members)
        ? {
            label: str(p?.teamLabel),
            heading: str(p?.teamHeading),
            paragraph: str(p?.teamParagraph),
            cta: cta(p?.teamButtonLabel, p?.teamButtonUrl),
            members,
            categories: teamCategoryOptions(data.teamCategories),
          }
        : null,

    insurance: filled(
      p?.insuranceLabel,
      p?.insuranceHeading,
      p?.insuranceParagraph,
    )
      ? {
          label: str(p?.insuranceLabel),
          heading: str(p?.insuranceHeading),
          paragraph: str(p?.insuranceParagraph),
          cta: cta(p?.insuranceButtonLabel, p?.insuranceButtonUrl),
        }
      : null,

    faq:
      filled(p?.faqLabel, p?.faqHeading, p?.faqParagraph) || hasRows(faq)
        ? {
            label: str(p?.faqLabel),
            heading: str(p?.faqHeading),
            paragraph: str(p?.faqParagraph),
            items: faq,
          }
        : null,

    cta:
      filled(p?.ctaHeading, p?.ctaParagraph) || Boolean(image(p?.ctaImage))
        ? {
            heading: str(p?.ctaHeading),
            paragraph: str(p?.ctaParagraph),
            cta: cta(p?.ctaButtonLabel, p?.ctaButtonUrl),
            image: image(p?.ctaImage),
          }
        : null,
  };
}

function ourTeamMember(
  node: WpTeamMemberNodes["nodes"][number],
): TeamMemberType {
  const img = image(node.featuredImage) ?? {
    src: "",
    alt: "",
    width: 100,
    height: 100,
  };
  const f = node.teamMemberFields;

  return {
    id: node.id,
    name: str(node.title),
    role: str(f?.role),
    description: str(f?.bio),
    image: img,
    profileUrl: `/team/${str(node.slug)}`,
    popup: {
      title: str(node.title),
      designation: str(f?.role),
      image: img,
      introduction: str(f?.popupIntroduction, str(f?.bio)),
      content: str(f?.popupContent),
      buttonLabel: f?.popupButtonLabel ?? undefined,
      buttonUrl: f?.popupButtonUrl ?? undefined,
    },
  };
}

export interface OurTeamContent {
  hero: TeamHeroType | null;
  team: TeamSectionType | null;
  video: VideoSectionContent | null;
  faq: FaqSection | null;
  cta: CtaBanner | null;
}

export function toOurTeam(data: WpOurTeamQuery): OurTeamContent {
  const p = data.page?.ourTeamPage;
  const membersByCategory = new Map<string, TeamMemberType[]>();
  for (const node of data.teamMembers?.nodes ?? []) {
    const key = teamCategory(node);
    membersByCategory.set(key, [
      ...(membersByCategory.get(key) ?? []),
      ourTeamMember(node),
    ]);
  }

  const categories: TeamCategoryType[] = teamCategoryDetails(
    data.teamCategories,
  )
    .filter((category) => category.showOnOurTeam)
    .map((category) => ({
      id: category.id,
      label: category.label,
      title: category.title,
      description: str(category.description),
      members: membersByCategory.get(category.id) ?? [],
    }));

  const videoUrl = p?.videoFile?.node?.mediaItemUrl ?? null;
  const faq = faqItems(p?.faqItems);

  return {
    hero:
      filled(p?.heroLabel, p?.heroHeading, p?.heroParagraph) ||
      Boolean(image(p?.heroImage))
        ? {
            label: str(p?.heroLabel),
            heading: str(p?.heroHeading),
            paragraph: str(p?.heroParagraph),
            image: image(p?.heroImage) ?? { src: "", alt: "" },
            cta: p?.heroButtonUrl
              ? {
                  label: str(p?.heroButtonLabel),
                  href: p.heroButtonUrl,
                  target: /^https?:\/\//i.test(p.heroButtonUrl)
                    ? "_blank"
                    : "_self",
                }
              : undefined,
          }
        : null,

    team: hasRows(categories) ? { categories } : null,

    video: videoUrl
      ? {
          src: videoUrl,
          poster: image(p?.videoPoster)?.src ?? "",
          label: str(p?.videoLabel),
        }
      : null,

    faq:
      filled(p?.faqLabel, p?.faqHeading, p?.faqParagraph) || hasRows(faq)
        ? {
            label: str(p?.faqLabel),
            heading: str(p?.faqHeading),
            paragraph: str(p?.faqParagraph),
            items: faq,
          }
        : null,

    cta:
      filled(p?.ctaHeading, p?.ctaParagraph) || Boolean(image(p?.ctaImage))
        ? {
            heading: str(p?.ctaHeading),
            paragraph: str(p?.ctaParagraph),
            cta: cta(p?.ctaButtonLabel, p?.ctaButtonUrl),
            image: image(p?.ctaImage),
          }
        : null,
  };
}

export interface SiteChrome {
  settings: SiteSettings;
  menus: SiteMenus;
}

interface PageEnvelope extends SiteChrome {
  seo: SeoType | null;
}

export interface SiteContent extends PageEnvelope {
  home: HomeContent;
}

export interface MentalHealthPageContent extends PageEnvelope {
  page: MentalHealthContent;
}
export interface PhysicalHealthPageContent extends PageEnvelope {
  page: PhysicalHealthContent;
}

export interface ContactUsPageContent extends PageEnvelope {
  page: ContactUsContent;
}

export interface InsurancePageContent extends PageEnvelope {
  page: InsuranceContent;
}

export interface KidsPlayTherapyPageContent extends PageEnvelope {
  page: KidsPlayTherapyContent;
}

export interface OurTeamPageContent extends PageEnvelope {
  page: OurTeamContent;
}

async function fromWordPress<Query, Content>(
  query: string,
  map: (data: Query) => Content,
  fixtures: () => Content,
  tags: string[] = [],
): Promise<Content> {
  if (!USE_WP) return fixtures();

  try {
    return map(await wpQuery<Query>(query, {}, { tags }));
  } catch (error) {
    if (process.env.NODE_ENV === "production") throw error;

    console.warn(
      `[wp] ${(error as Error).message} — falling back to the placeholder fixtures in lib/data.ts.`,
    );
    return fixtures();
  }
}

export const getSiteContent = (): Promise<SiteContent> =>
  fromWordPress<WpHomeQuery, SiteContent>(
    HOME_QUERY,
    (data) => ({
      home: toHome(data),
      settings: toSettings(data),
      menus: toMenus(data),
      seo: data.page?.seo ?? null,
    }),
    () => ({
      home: local.home,
      settings: local.settings,
      menus: local.menus,
      seo: null,
    }),
    ["page:home"],
  );

export const getContactUsContent = (): Promise<ContactUsPageContent> =>
  fromWordPress<WpContactUsQuery, ContactUsPageContent>(
    CONTACT_US_QUERY,
    (data) => ({
      page: toContactUs(data),
      settings: toSettings(data),
      menus: toMenus(data),
      seo: data.page?.seo ?? null,
    }),
    () => ({
      page: localContactUs,
      settings: local.settings,
      menus: local.menus,
      seo: null,
    }),
    ["page:contact-us"],
  );

export const getInsuranceContent = (): Promise<InsurancePageContent> =>
  fromWordPress<WpInsuranceQuery, InsurancePageContent>(
    INSURANCE_QUERY,
    (data) => ({
      page: toInsurance(data),
      settings: toSettings(data),
      menus: toMenus(data),
      seo: data.page?.seo ?? null,
    }),
    () => ({
      page: localInsurance,
      settings: local.settings,
      menus: local.menus,
      seo: null,
    }),
    ["page:insurance-direct-billing"],
  );

export const getWhoWeBillContent = async (): Promise<WhoWeBillSection | null> =>
  (await getInsuranceContent()).page.providers;

export const getKidsPlayTherapyContent =
  (): Promise<KidsPlayTherapyPageContent> =>
    fromWordPress<WpKidsPlayTherapyQuery, KidsPlayTherapyPageContent>(
      KIDS_PLAY_THERAPY_QUERY,
      (data) => ({
        page: toKidsPlayTherapy(data),
        settings: toSettings(data),
        menus: toMenus(data),
        seo: data.page?.seo ?? null,
      }),
      () => ({
        page: localKidsPlayTherapy,
        settings: local.settings,
        menus: local.menus,
        seo: null,
      }),
      ["page:kids-and-play-therapy"],
    );

const LOCAL_OUR_TEAM_FAQ: FaqItem[] = [
  {
    id: "our-team-faq-1",
    question: "How do I choose the right practitioner?",
    answer:
      "<p>Browse the team profiles to learn about each practitioner's experience and areas of focus. The clinic can also help guide you when you are unsure.</p>",
  },
  {
    id: "our-team-faq-2",
    question: "Are services covered by insurance?",
    answer:
      "<p>Many counselling and physical health services may be covered through extended health benefits. Coverage depends on your plan, so check with your provider or ask our team about direct billing options.</p>",
  },
  {
    id: "our-team-faq-3",
    question: "Do I need a referral?",
    answer:
      "<p>Most services do not require a referral. Some insurance plans may ask for a doctor's referral for reimbursement, so it is worth checking your coverage first.</p>",
  },
  {
    id: "our-team-faq-4",
    question: "Are virtual counselling sessions available?",
    answer:
      "<p>Yes. Select counsellors offer secure virtual sessions, so you can connect from wherever feels most comfortable.</p>",
  },
  {
    id: "our-team-faq-5",
    question: "What should I expect at my first appointment?",
    answer:
      "<p>Your first visit focuses on understanding your needs and goals. Your practitioner will walk you through their approach and build a plan that feels right for you.</p>",
  },
];

const localOurTeam: OurTeamContent = {
  hero: localTeamHero,
  team: localTeamContent,
  video: {
    src: "/videos/rene-health.mp4",
    poster: "/images/video-poster.png",
    label: "Watch Video",
  },
  faq: {
    label: "FAQ",
    heading: "Common Questions",
    paragraph:
      "Find quick answers to common questions about appointments, insurance, <br>referrals and virtual care.",
    items: LOCAL_OUR_TEAM_FAQ,
  },
  cta: {
    heading: "Ready to talk?",
    paragraph:
      "<p>Find a counsellor who fits your needs and take the next step at a pace that feels comfortable for you.</p>",
    cta: {
      label: "Book an Appointment",
      href: "https://renehealthclinic.janeapp.com/",
    },
    image: null,
  },
};

export const getOurTeamContent = (): Promise<OurTeamPageContent> =>
  fromWordPress<WpOurTeamQuery, OurTeamPageContent>(
    OUR_TEAM_QUERY,
    (data) => ({
      page: toOurTeam(data),
      settings: toSettings(data),
      menus: toMenus(data),
      seo: data.page?.seo ?? null,
    }),
    () => ({
      page: localOurTeam,
      settings: local.settings,
      menus: local.menus,
      seo: null,
    }),
    ["page:our-team", "team"],
  );

export const getMentalHealthContent = (): Promise<MentalHealthPageContent> =>
  fromWordPress<WpMentalHealthQuery, MentalHealthPageContent>(
    MENTAL_HEALTH_QUERY,
    (data) => ({
      page: toMentalHealth(data),
      settings: toSettings(data),
      menus: toMenus(data),
      seo: data.page?.seo ?? null,
    }),
    () => ({
      page: local.mentalHealth,
      settings: local.settings,
      menus: local.menus,
      seo: null,
    }),
    ["page:mental-health", "team"],
  );

export const getPhysicalHealthContent =
  (): Promise<PhysicalHealthPageContent> =>
    fromWordPress<WpPhysicalHealthQuery, PhysicalHealthPageContent>(
      PHYSICAL_HEALTH_QUERY,
      (data) => ({
        page: toPhysicalHealth(data),
        settings: toSettings(data),
        menus: toMenus(data),
        seo: data.page?.seo ?? null,
      }),
      () => ({
        page: local.physicalHealth,
        settings: local.settings,
        menus: local.menus,
        seo: null,
      }),
      ["page:physical-health", "team"],
    );

// Cached: the root layout resolves site chrome twice per render (once in
// generateMetadata for the favicon, once in the layout body for header/footer).
export const getSiteChrome = cache(
  (): Promise<SiteChrome> =>
    fromWordPress<WpSiteQuery, SiteChrome>(
      SITE_QUERY,
      (data) => ({ settings: toSettings(data), menus: toMenus(data) }),
      () => ({ settings: local.settings, menus: local.menus }),
      ["site"],
    ),
);
