import { wpQuery } from "@/lib/graphql";
import { toOrder } from "@/lib/sectionOrder";
import { cta, filled, hasContent, image, str } from "@/lib/format";
import type { SeoType } from "@/lib/metadata";
import type {
  CtaType,
  ImageType,
  FaqSectionType,
  CtaBannerType,
} from "@/lib/physicalSubPageData";

const IMAGE_FRAGMENT = `
  fragment Img on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

const SEO_FRAGMENT = `
  fragment PageSeo on Page {
    seo {
      title
      metaDesc
      canonical
      metaRobotsNoindex
      metaRobotsNofollow
      opengraphTitle
      opengraphDescription
      opengraphType
      opengraphSiteName
      opengraphUrl
      opengraphPublishedTime
      opengraphModifiedTime
      opengraphImage {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
      schema {
        raw
      }
    }
  }
`;

export type HeroSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
  image?: ImageType;
};

export type IconTextItemType = {
  title?: string;
  description?: string;
  icon?: ImageType;
};

export type IconTextListSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  items?: IconTextItemType[];
};

export type SplitCardType = {
  title?: string;
  description?: string;
  cta?: CtaType;
};

export type SplitCardGridSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cards?: SplitCardType[];
};

export type StepType = {
  title?: string;
  description?: string;
  image?: ImageType;
};

export type StepScrollerSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  steps?: StepType[];
};

export type SupportCardType = {
  title?: string;
  description?: string;
  icon?: ImageType;
  cta?: CtaType;
};

export type SupportSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cards?: SupportCardType[];
};

export type CtaPanelSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
};

export type InsuranceSubPageContentType = {
  hero?: HeroSectionType | null;
  highlights?: IconTextListSectionType | null;
  splitGrid?: SplitCardGridSectionType | null;
  steps?: StepScrollerSectionType | null;
  support?: SupportSectionType | null;
  panel?: CtaPanelSectionType | null;
  faq?: FaqSectionType | null;
  cta?: CtaBannerType | null;
  [key: string]: unknown;
};

export type { SeoType };

export type InsuranceSubPageType = {
  page: InsuranceSubPageContentType;
  seo?: SeoType | null;
};

export const INSURANCE_SUB_PAGE_QUERY = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetInsuranceSubPageContent($uri: String!) {
    page: nodeByUri(uri: $uri) {
      ... on Page {
        id
        ...PageSeo
        insuranceSubPagesFieldsData {
          heroOrder
          heroLabel
          heroHeading
          heroParagraph
          heroButtonLabel
          heroButtonUrl
          heroImage {
            node {
              ...Img
            }
          }

          highlightsOrder
          highlightsLabel
          highlightsHeading
          highlightsParagraph
          highlightsItems {
            title
            description
            icon {
              node {
                ...Img
              }
            }
          }

          splitGridOrder
          splitGridLabel
          splitGridHeading
          splitGridParagraph
          splitGridCards {
            title
            description
            buttonLabel
            buttonUrl
          }

          stepsOrder
          stepsLabel
          stepsHeading
          stepsParagraph
          stepsItems {
            title
            description
            image {
              node {
                ...Img
              }
            }
          }

          supportOrder
          supportLabel
          supportHeading
          supportParagraph
          supportCards {
            title
            description
            icon {
              node {
                ...Img
              }
            }
            buttonLabel
            buttonUrl
          }

          panelOrder
          panelLabel
          panelHeading
          panelParagraph
          panelButtonLabel
          panelButtonUrl

          faqOrder
          faqTagline
          faqHeading
          faqContent
          faqRepeater {
            faqQuestion
            faqAnswer
          }

          ctaOrder
          ctaHeading
          ctaParagraph
          ctaButtonLabel
          ctaButtonUrl
          ctaImage {
            node {
              ...Img
            }
          }
        }
      }
    }
  }
`;

export function formatInsuranceSubPageData(data: any): InsuranceSubPageType {
  const pageNode = data?.page;
  const p = pageNode?.insuranceSubPagesFieldsData;

  const hasHero =
    hasContent(p?.heroHeading) ||
    hasContent(p?.heroParagraph) ||
    hasContent(p?.heroLabel);
  const hasHighlights =
    hasContent(p?.highlightsHeading) || filled(p?.highlightsItems);
  const hasSplitGrid =
    hasContent(p?.splitGridHeading) || filled(p?.splitGridCards);
  const hasSteps = hasContent(p?.stepsHeading) || filled(p?.stepsItems);
  const hasSupport = hasContent(p?.supportHeading) || filled(p?.supportCards);
  const hasPanel =
    hasContent(p?.panelHeading) || hasContent(p?.panelButtonUrl);
  const hasFaq =
    hasContent(p?.faqHeading) ||
    hasContent(p?.faqTagline) ||
    hasContent(p?.faqContent) ||
    filled(p?.faqRepeater);
  const hasCta =
    hasContent(p?.ctaHeading) ||
    hasContent(p?.ctaParagraph) ||
    Boolean(image(p?.ctaImage));

  return {
    page: {
      hero: hasHero
        ? {
            order: toOrder(p?.heroOrder),
            label: str(p?.heroLabel),
            heading: str(p?.heroHeading),
            paragraph: str(p?.heroParagraph),
            cta: cta(p?.heroButtonLabel, p?.heroButtonUrl),
            image: image(p?.heroImage),
          }
        : null,
      highlights: hasHighlights
        ? {
            order: toOrder(p?.highlightsOrder),
            label: str(p?.highlightsLabel),
            heading: str(p?.highlightsHeading),
            paragraph: str(p?.highlightsParagraph),
            items: (p?.highlightsItems ?? []).map((item: any) => ({
              title: str(item?.title),
              description: str(item?.description),
              icon: image(item?.icon),
            })),
          }
        : null,
      splitGrid: hasSplitGrid
        ? {
            order: toOrder(p?.splitGridOrder),
            label: str(p?.splitGridLabel),
            heading: str(p?.splitGridHeading),
            paragraph: str(p?.splitGridParagraph),
            cards: (p?.splitGridCards ?? []).map((card: any) => ({
              title: str(card?.title),
              description: str(card?.description),
              cta: cta(card?.buttonLabel, card?.buttonUrl),
            })),
          }
        : null,
      steps: hasSteps
        ? {
            order: toOrder(p?.stepsOrder),
            label: str(p?.stepsLabel),
            heading: str(p?.stepsHeading),
            paragraph: str(p?.stepsParagraph),
            steps: (p?.stepsItems ?? []).map((step: any) => ({
              title: str(step?.title),
              description: str(step?.description),
              image: image(step?.image),
            })),
          }
        : null,
      support: hasSupport
        ? {
            order: toOrder(p?.supportOrder),
            label: str(p?.supportLabel),
            heading: str(p?.supportHeading),
            paragraph: str(p?.supportParagraph),
            cards: (p?.supportCards ?? []).map((card: any) => ({
              title: str(card?.title),
              description: str(card?.description),
              icon: image(card?.icon),
              cta: cta(card?.buttonLabel, card?.buttonUrl),
            })),
          }
        : null,
      panel: hasPanel
        ? {
            order: toOrder(p?.panelOrder),
            label: str(p?.panelLabel),
            heading: str(p?.panelHeading),
            paragraph: str(p?.panelParagraph),
            cta: cta(p?.panelButtonLabel, p?.panelButtonUrl),
          }
        : null,
      faq: hasFaq
        ? {
            order: toOrder(p?.faqOrder),
            label: str(p?.faqTagline),
            heading: str(p?.faqHeading),
            paragraph: str(p?.faqContent),
            items: (p?.faqRepeater ?? []).map((item: any, index: number) => ({
              id: `faq-repeater-${index}`,
              question: str(item?.faqQuestion),
              answer: str(item?.faqAnswer),
            })),
          }
        : null,
      cta: hasCta
        ? {
            order: toOrder(p?.ctaOrder),
            heading: str(p?.ctaHeading),
            paragraph: str(p?.ctaParagraph),
            cta: cta(p?.ctaButtonLabel, p?.ctaButtonUrl),
            image: image(p?.ctaImage),
          }
        : null,
    },

    seo: (pageNode?.seo ?? null) as SeoType | null,
  };
}

export async function getInsuranceSubPageContent(
  uri: string,
): Promise<InsuranceSubPageType> {
  const data = await wpQuery<InsuranceSubPageType>(INSURANCE_SUB_PAGE_QUERY, {
    uri,
  });
  return formatInsuranceSubPageData(data);
}
