import { wpQuery } from "@/lib/graphql";
import { toOrder } from "@/lib/sectionOrder";
import { cta, filled, hasContent, image, str } from "@/lib/format";
import type { SeoType } from "@/lib/metadata";

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

export type ImageType = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CtaType = {
  label: string;
  href: string;
  target?: string;
};

export type HeroSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
  image?: ImageType;
};

export type IntroSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  image?: ImageType;
};

export type ServiceItemType = {
  title?: string;
  description?: string;
};

export type ServiceColumnType = {
  label?: string;
  title?: string;
  layout?: "stacked" | "split";
  image?: ImageType;
  cta?: CtaType | null;
  items?: ServiceItemType[];
};

export type ServicesSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  columns?: ServiceColumnType[];
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
  image?: ImageType;
  cards?: SupportCardType[];
};

export type ProcessStepType = {
  title?: string;
  description?: string;
  image?: ImageType;
};

export type ProcessSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  steps?: ProcessStepType[];
};

export type InsuranceCtaType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
};

export type TeamPopupType = {
  title: string;
  designation: string;
  image: ImageType;
  introduction: string;
  content?: string;
  buttonLabel?: string;
  buttonUrl?: string;
};

export type TeamMemberType = {
  id: string;
  name?: string;
  role?: string;
  description?: string;
  image?: ImageType;
  profileUrl?: string;
  bio?: string;
  popup?: TeamPopupType;
};

export type TeamSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
  members?: TeamMemberType[];
  categories?: never[];
};

export type BenefitsCardType = {
  title?: string;
  description?: string;
  cta?: CtaType;
};

export type BenefitsSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  backgrounds?: string[];
  cards?: BenefitsCardType[];
  footnote?: string;
};

export type ReviewItemType = {
  id: string;
  tagline: string;
  quote: string;
  name: string;
  avatar: ImageType | null;
  rating: number;
};

export type ReviewsSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  items?: ReviewItemType[];
};

export type FaqItemType = {
  id?: string;
  question?: string;
  answer?: string;
};

export type FaqSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  items?: FaqItemType[];
};

export type CtaBannerType = {
  order?: number;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
  image?: ImageType;
};

export type PhysicalSubPageContentType = {
  hero?: HeroSectionType | null;
  intro?: IntroSectionType | null;
  services?: ServicesSectionType | null;
  support?: SupportSectionType | null;
  process?: ProcessSectionType | null;
  insurance?: InsuranceCtaType | null;
  team?: TeamSectionType | null;
  benefits?: BenefitsSectionType | null;
  reviews?: ReviewsSectionType | null;
  faq?: FaqSectionType | null;
  cta?: CtaBannerType | null;
  [key: string]: unknown;
};

export type { SeoType };

export type PhysicalSubPageType = {
  page: PhysicalSubPageContentType;
  seo?: SeoType | null;
};

export const PHYSICAL_SUB_PAGE_QUERY = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetPhysicalSubPageContent($uri: String!) {
    # Reviews are a shared CPT rather than a per-page picker: the strip shows the
    # same clinic testimonials everywhere, and only its heading is page-specific.
    reviews(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        featuredImage {
          node {
            ...Img
          }
        }
        reviewFields {
          quote
          reviewerName
          rating
        }
      }
    }

    page: nodeByUri(uri: $uri) {
      ... on Page {
        id
        ...PageSeo
        physicalSubPagesFieldsData {
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

          introOrder
          introLabel
          introHeading
          introParagraph
          introImage {
            node {
              ...Img
            }
          }

          servicesOrder
          servicesLabel
          servicesHeading
          servicesParagraph
          servicesColumns {
            label
            title
            layout
            image {
              node {
                ...Img
              }
            }
            buttonLabel
            buttonUrl
            items {
              title
              description
            }
          }

          supportOrder
          supportLabel
          supportHeading
          supportParagraph
          supportImage {
            node {
              ...Img
            }
          }
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

          processOrder
          processLabel
          processHeading
          processParagraph
          processSteps {
            title
            description
            image {
              node {
                ...Img
              }
            }
          }

          insuranceOrder
          insuranceLabel
          insuranceHeading
          insuranceParagraph
          insuranceButtonLabel
          insuranceButtonUrl

          teamOrder
          teamLabel
          teamHeading
          teamParagraph
          teamButtonLabel
          teamButtonUrl
          teamMembersPicked(first: 100) {
            nodes {
              ... on TeamMember {
                id
                title
                slug
                featuredImage {
                  node {
                    ...Img
                  }
                }
                teamMemberFields {
                  role
                  bio
                  popupIntroduction
                  popupContent
                  popupButtonLabel
                  popupButtonUrl
                }
              }
            }
          }

          benefitsOrder
          benefitsLabel
          benefitsHeading
          benefitsParagraph
          benefitsBackgrounds {
            nodes {
              ...Img
            }
          }
          benefitsCards {
            title
            description
            buttonLabel
            buttonUrl
          }
          benefitsFootnote

          reviewsOrder
          reviewsLabel
          reviewsHeading
          reviewsParagraph

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

function serviceCardLayout(value: unknown): "stacked" | "split" {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "split" ? "split" : "stacked";
}

function teamMembers(picked?: any): TeamMemberType[] {
  const nodes = picked?.nodes;
  if (!Array.isArray(nodes)) return [];

  return nodes.map((member: any) => {
    const fields = member?.teamMemberFields;
    const img = image(member?.featuredImage) ?? {
      src: "",
      alt: "",
      width: 0,
      height: 0,
    };
    const shortDescription =
      str(fields?.popupIntroduction) || str(fields?.bio);

    return {
      id: str(member?.id),
      name: str(member?.title),
      role: str(fields?.role),
      description: shortDescription,
      image: img,
      profileUrl: str(member?.slug),
      bio: str(fields?.bio),
      popup: {
        title: str(member?.title),
        designation: str(fields?.role),
        image: img,
        introduction: shortDescription,
        content: str(fields?.popupContent),
        buttonLabel: str(fields?.popupButtonLabel),
        buttonUrl: str(fields?.popupButtonUrl),
      },
    };
  });
}

function reviewItems(reviews?: any): ReviewItemType[] {
  return (
    reviews?.nodes?.map((node: any) => ({
      id: str(node?.id),
      tagline: str(node?.title),
      quote: str(node?.reviewFields?.quote),
      name: str(node?.reviewFields?.reviewerName),
      avatar: image(node?.featuredImage) ?? null,
      rating: Number(node?.reviewFields?.rating) || 5,
    })) ?? []
  );
}

export function formatPhysicalSubPageData(data: any): PhysicalSubPageType {
  const pageNode = data?.page;
  const p = pageNode?.physicalSubPagesFieldsData;

  const hasHero =
    hasContent(p?.heroHeading) ||
    hasContent(p?.heroParagraph) ||
    hasContent(p?.heroLabel);
  const hasIntro =
    hasContent(p?.introHeading) ||
    hasContent(p?.introParagraph) ||
    Boolean(image(p?.introImage));
  const hasServices =
    hasContent(p?.servicesHeading) ||
    (Array.isArray(p?.servicesColumns) && p.servicesColumns.length > 0);
  const hasSupport =
    hasContent(p?.supportHeading) ||
    (Array.isArray(p?.supportCards) && p.supportCards.length > 0);
  const hasProcess =
    hasContent(p?.processHeading) ||
    (Array.isArray(p?.processSteps) && p.processSteps.length > 0);
  const hasInsurance =
    hasContent(p?.insuranceHeading) || hasContent(p?.insuranceButtonUrl);
  const hasTeam =
    hasContent(p?.teamHeading) ||
    (Array.isArray(p?.teamMembersPicked?.nodes) &&
      p.teamMembersPicked.nodes.length > 0);
  const hasBenefits =
    hasContent(p?.benefitsHeading) ||
    (Array.isArray(p?.benefitsCards) && p.benefitsCards.length > 0);

  const reviews = reviewItems(data?.reviews);
  const hasReviews = hasContent(p?.reviewsHeading) && reviews.length > 0;

  const hasFaq =
    hasContent(p?.faqHeading) ||
    hasContent(p?.faqTagline) ||
    hasContent(p?.faqContent) ||
    (Array.isArray(p?.faqRepeater) && p.faqRepeater.length > 0);
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
      intro: hasIntro
        ? {
            order: toOrder(p?.introOrder),
            label: str(p?.introLabel),
            heading: str(p?.introHeading),
            paragraph: str(p?.introParagraph),
            image: image(p?.introImage),
          }
        : null,
      services: hasServices
        ? {
            order: toOrder(p?.servicesOrder),
            label: str(p?.servicesLabel),
            heading: str(p?.servicesHeading),
            paragraph: str(p?.servicesParagraph),
            columns: (p?.servicesColumns ?? []).map((col: any) => ({
              label: str(col?.label),
              title: str(col?.title),
              layout: serviceCardLayout(col?.layout),
              image: image(col?.image),
              cta: cta(col?.buttonLabel, col?.buttonUrl) ?? null,
              items: (col?.items ?? []).map((item: any) => ({
                title: str(item?.title),
                description: str(item?.description),
              })),
            })),
          }
        : null,
      support: hasSupport
        ? {
            order: toOrder(p?.supportOrder),
            label: str(p?.supportLabel),
            heading: str(p?.supportHeading),
            paragraph: str(p?.supportParagraph),
            image: image(p?.supportImage),
            cards: (p?.supportCards ?? []).map((card: any) => ({
              title: str(card?.title),
              description: str(card?.description),
              icon: image(card?.icon),
              cta: cta(card?.buttonLabel, card?.buttonUrl),
            })),
          }
        : null,
      process: hasProcess
        ? {
            order: toOrder(p?.processOrder),
            label: str(p?.processLabel),
            heading: str(p?.processHeading),
            paragraph: str(p?.processParagraph),
            steps: (p?.processSteps ?? []).map((step: any) => ({
              title: str(step?.title),
              description: str(step?.description),
              image: image(step?.image),
            })),
          }
        : null,
      insurance: hasInsurance
        ? {
            order: toOrder(p?.insuranceOrder),
            label: str(p?.insuranceLabel),
            heading: str(p?.insuranceHeading),
            paragraph: str(p?.insuranceParagraph),
            cta: cta(p?.insuranceButtonLabel, p?.insuranceButtonUrl),
          }
        : null,
      team: hasTeam
        ? {
            order: toOrder(p?.teamOrder),
            label: str(p?.teamLabel),
            heading: str(p?.teamHeading),
            paragraph: str(p?.teamParagraph),
            cta: cta(p?.teamButtonLabel, p?.teamButtonUrl),
            members: teamMembers(p?.teamMembersPicked),
            categories: [],
          }
        : null,
      benefits: hasBenefits
        ? {
            order: toOrder(p?.benefitsOrder),
            label: str(p?.benefitsLabel),
            heading: str(p?.benefitsHeading),
            paragraph: str(p?.benefitsParagraph),
            backgrounds: (p?.benefitsBackgrounds?.nodes ?? [])
              .map((node: any) => node?.sourceUrl)
              .filter((src: any): src is string => Boolean(src)),
            cards: (p?.benefitsCards ?? []).map((card: any) => ({
              title: str(card?.title),
              description: str(card?.description),
              cta: cta(card?.buttonLabel, card?.buttonUrl),
            })),
            footnote: str(p?.benefitsFootnote),
          }
        : null,
      reviews: hasReviews
        ? {
            order: toOrder(p?.reviewsOrder),
            label: str(p?.reviewsLabel),
            heading: str(p?.reviewsHeading),
            paragraph: str(p?.reviewsParagraph),
            items: reviews,
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

export async function getPhysicalSubPageContent(
  uri: string,
): Promise<PhysicalSubPageType> {
  const data = await wpQuery<PhysicalSubPageType>(PHYSICAL_SUB_PAGE_QUERY, {
    uri,
  });
  return formatPhysicalSubPageData(data);
}
