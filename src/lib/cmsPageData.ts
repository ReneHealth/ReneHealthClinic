import { wpQuery } from "@/lib/graphql";
import { toOrder } from "@/lib/sectionOrder";
import { cta, filled, hasContent, image, str } from "@/lib/format";
import type { WpImageField } from "@/lib/format";
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

const TEAM_CATEGORY_FIELDS = `
  teamCategories(first: 100) {
    nodes {
      id
      databaseId
      name
      slug
      description
      displayOrder
      teamCategoryFields {
        showOnOurTeam
        tabLabel
        sectionTitle
        sectionDescription
      }
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

export type CounsellingHeroType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
  image?: ImageType;
};

export type NoticeItemType = {
  title?: string;
  description?: string;
  icon?: ImageType;
};

export type NoticeSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
  items?: NoticeItemType[];
};

export type ApproachSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  image?: ImageType;
  quote?: string;
};

export type SupportCardType = {
  title?: string;
  description?: string;
  icon?: ImageType;
  cta?: CtaType;
};

export type KidsSupportSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  image?: ImageType;
  cards?: SupportCardType[];
};

export type ProcessCardType = {
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
  cards?: ProcessCardType[];
  footnote?: string;
};

export type RoleItemType = {
  title?: string;
  description?: string;
  image?: ImageType;
};

export type RoleSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  items?: RoleItemType[];
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
  popupIntroduction?: string;
  popupContent?: string;
  popupButtonLabel?: string;
  popupButtonUrl?: string;
  popup?: TeamPopupType;
};

export type TeamCategoryType = {
  id: string;
  name?: string;
  slug?: string;
};

export type TeamSectionType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
  members?: TeamMemberType[];
  categories?: TeamCategoryType[];
};

export type InsuranceCtaType = {
  order?: number;
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaType;
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

export type PageContentType = {
  hero?: CounsellingHeroType | null;
  notice?: NoticeSectionType | null;
  approach?: ApproachSectionType | null;
  support?: KidsSupportSectionType | null;
  process?: BenefitsSectionType | null;
  role?: RoleSectionType | null;
  team?: TeamSectionType | null;
  insurance?: InsuranceCtaType | null;
  faq?: FaqSectionType | null;
  cta?: CtaBannerType | null;
  [key: string]: unknown;
};

export type { SeoType };

export type CommonPageType = {
  page: PageContentType;
  seo?: SeoType | null;
};

export const COMMON_PAGE_QUERY = `
  ${IMAGE_FRAGMENT}
  ${SEO_FRAGMENT}
  query GetCommonPageContent($uri: String!) {
    ${TEAM_CATEGORY_FIELDS}
    page: nodeByUri(uri: $uri) {
      ... on Page {
        id
        ...PageSeo
        commonFieldsData {
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
          noticeOrder
          noticeLabel
          noticeHeading
          noticeParagraph
          noticeButtonLabel
          noticeButtonUrl
          noticeItems {
            title
            description
            icon {
              node {
                ...Img
              }
            }
          }
          approachOrder
          approachLabel
          approachHeading
          approachParagraph
          approachImage {
            node {
              ...Img
            }
          }
          approachQuote
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
          processBackgrounds {
            nodes {
              ...Img
            }
          }
          processCards {
            title
            description
            buttonLabel
            buttonUrl
          }
          processFootnote
          roleOrder
          roleLabel
          roleHeading
          roleParagraph
          roleItems {
            title
            description
            image {
              node {
                ...Img
              }
            }
          }
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
          insuranceOrder
          insuranceLabel
          insuranceHeading
          insuranceParagraph
          insuranceButtonLabel
          insuranceButtonUrl
          faqOrder
          faqLabel
          faqHeading
          faqParagraph
          faqItems(first: 100) {
            nodes {
              id
              ... on Faq {
                title
                faqFields {
                  answer
                }
              }
            }
          }
          faqTagline
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

function teamMembers(picked?: unknown): TeamMemberType[] {
  const nodes = (picked as { nodes?: Record<string, unknown>[] })?.nodes;

  if (!Array.isArray(nodes)) return [];

  return nodes.map((member) => {
    const fields = member?.teamMemberFields as
      | Record<string, unknown>
      | undefined;
    const img = image(member?.featuredImage as WpImageField | null) ?? {
      src: "",
      alt: "",
      width: 0,
      height: 0,
    };

    const shortDescription =
      str(fields?.popupIntroduction as string) || str(fields?.bio as string);

    return {
      id: str(member?.id as string),
      name: str(member?.title as string),
      role: str(fields?.role as string),
      description: shortDescription,
      image: img,
      profileUrl: str(member?.slug as string),
      bio: str(fields?.bio as string),
      popupIntroduction: str(fields?.popupIntroduction as string),
      popupContent: str(fields?.popupContent as string),
      popupButtonLabel: str(fields?.popupButtonLabel as string),
      popupButtonUrl: str(fields?.popupButtonUrl as string),
      popup: {
        title: str(member?.title as string),
        designation: str(fields?.role as string),
        image: img,
        introduction: shortDescription,
        content: str(fields?.popupContent as string),
        buttonLabel: str(fields?.popupButtonLabel as string),
        buttonUrl: str(fields?.popupButtonUrl as string),
      },
    };
  });
}

function faqItems(items?: any): FaqItemType[] {
  return (
    items?.nodes?.map((node: any) => ({
      id: str(node?.id),
      question: str(node?.title),
      answer: str(node?.faqFields?.answer),
    })) ?? []
  );
}

export function formatCommonPageData(data: any): CommonPageType {
  const pageNode = data?.page;
  const p = pageNode?.commonFieldsData;

  const hasHero =
    hasContent(p?.heroHeading) ||
    hasContent(p?.heroParagraph) ||
    hasContent(p?.heroLabel);
  const hasNotice =
    hasContent(p?.noticeHeading) ||
    (Array.isArray(p?.noticeItems) && p.noticeItems.length > 0);
  const hasApproach =
    hasContent(p?.approachHeading) ||
    hasContent(p?.approachParagraph) ||
    Boolean(image(p?.approachImage));
  const hasSupport =
    hasContent(p?.supportHeading) ||
    (Array.isArray(p?.supportCards) && p.supportCards.length > 0);
  const hasProcess =
    hasContent(p?.processHeading) ||
    (Array.isArray(p?.processCards) && p.processCards.length > 0);
  const hasRole =
    hasContent(p?.roleHeading) ||
    (Array.isArray(p?.roleItems) && p.roleItems.length > 0);
  const hasTeam =
    hasContent(p?.teamHeading) ||
    (Array.isArray(p?.teamMembersPicked?.nodes) &&
      p.teamMembersPicked.nodes.length > 0);
  const hasInsurance =
    hasContent(p?.insuranceHeading) || hasContent(p?.insuranceButtonUrl);

  const hasRepeater = Array.isArray(p?.faqRepeater) && p.faqRepeater.length > 0;
  const hasCustomFaq =
    hasRepeater || hasContent(p?.faqTagline) || hasContent(p?.faqContent);
  const hasStandardFaqs =
    Array.isArray(p?.faqItems?.nodes) && p.faqItems.nodes.length > 0;
  const hasFaq = hasCustomFaq || hasContent(p?.faqHeading) || hasStandardFaqs;

  const hasCta =
    hasContent(p?.ctaHeading) ||
    hasContent(p?.ctaParagraph) ||
    Boolean(image(p?.ctaImage));

  const faqData: FaqSectionType | null = hasFaq
    ? hasCustomFaq
      ? {
          order: toOrder(p?.faqOrder),
          label: str(p?.faqTagline),
          heading: str(p?.faqHeading),
          paragraph: str(p?.faqContent),
          items: hasRepeater
            ? p.faqRepeater.map((item: any, index: number) => ({
                id: `faq-repeater-${index}`,
                question: str(item?.faqQuestion),
                answer: str(item?.faqAnswer),
              }))
            : [],
        }
      : {
          order: toOrder(p?.faqOrder),
          label: str(p?.faqLabel),
          heading: str(p?.faqHeading),
          paragraph: str(p?.faqParagraph),
          items: faqItems(p?.faqItems),
        }
    : null;

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
      notice: hasNotice
        ? {
            order: toOrder(p?.noticeOrder),
            label: str(p?.noticeLabel),
            heading: str(p?.noticeHeading),
            paragraph: str(p?.noticeParagraph),
            cta: cta(p?.noticeButtonLabel, p?.noticeButtonUrl),
            items: (p?.noticeItems ?? []).map((item: any) => ({
              title: str(item?.title),
              description: str(item?.description),
              icon: image(item?.icon),
            })),
          }
        : null,
      approach: hasApproach
        ? {
            order: toOrder(p?.approachOrder),
            label: str(p?.approachLabel),
            heading: str(p?.approachHeading),
            paragraph: str(p?.approachParagraph),
            image: image(p?.approachImage),
            quote: str(p?.approachQuote),
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
            backgrounds: (p?.processBackgrounds?.nodes ?? [])
              .map((node: any) => node?.sourceUrl)
              .filter((src: any): src is string => Boolean(src)),
            cards: (p?.processCards ?? []).map((card: any) => ({
              title: str(card?.title),
              description: str(card?.description),
              cta: cta(card?.buttonLabel, card?.buttonUrl),
            })),
            footnote: str(p?.processFootnote),
          }
        : null,
      role: hasRole
        ? {
            order: toOrder(p?.roleOrder),
            label: str(p?.roleLabel),
            heading: str(p?.roleHeading),
            paragraph: str(p?.roleParagraph),
            items: (p?.roleItems ?? []).map((item: any) => ({
              title: str(item?.title),
              description: str(item?.description),
              image: image(item?.image),
            })),
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
      insurance: hasInsurance
        ? {
            order: toOrder(p?.insuranceOrder),
            label: str(p?.insuranceLabel),
            heading: str(p?.insuranceHeading),
            paragraph: str(p?.insuranceParagraph),
            cta: cta(p?.insuranceButtonLabel, p?.insuranceButtonUrl),
          }
        : null,
      faq: faqData,
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

export async function getCommonPageContent(
  uri: string,
): Promise<CommonPageType> {
  const data = await wpQuery<CommonPageType>(COMMON_PAGE_QUERY, { uri });
  return formatCommonPageData(data);
}
