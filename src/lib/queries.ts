import { IMAGE_FRAGMENT, SEO_FRAGMENT, TEAM_CATEGORY_FIELDS } from "./fragments";

const MENU_FRAGMENT = `
  fragment MenuItems on MenuItemConnection {
    nodes {
      id
      label
      uri
      url
      target
      parentId
    }
  }
`;

const TEAM_MEMBER_FIELDS = `
  ${TEAM_CATEGORY_FIELDS}

  teamMembers(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      id
      title
      slug
      featuredImage {
        node {
          ...Img
        }
      }
      teamCategories(first: 10) {
        nodes {
          slug
          name
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
`;

const SITE_FIELDS = `
    globalSettings {
      # Not "settings": WPGraphQL core already owns a root "Settings" type, and
      # an ACF group of that name resolves to core's instead of ours.
      siteSettings {
        favicon {
          node {
            sourceUrl
            mimeType
            mediaDetails {
              width
              height
            }
          }
        }
        headerLogo {
          node {
            ...Img
          }
        }
        marqueeText
        footerLogo {
          node {
            ...Img
          }
        }
        footerLogoContent
        newsletterNote
        newsletterSuccess
        hoursTitle
        hours {
          days
          time
        }
        visitTitle
        contactTitle
        exploreTitle
        socialTitle
        socialFacebook
        socialInstagram
        footerWordmark
        phone
        phoneLink
        email
        address
        bookingLabel
        bookingUrl

        menuContactTitle
        menuPhone
        menuPhoneLink
        menuEmail
        menuAddress
        menuHoursTitle
        menuHours {
          days
          time
        }
        menuBookingLabel
        menuBookingUrl
      }
    }

    headerDesktopLeft: menuItems(
      where: { location: HEADER_DESKTOP_LEFT }
      first: 100
    ) {
      ...MenuItems
    }
    headerDesktopRight: menuItems(
      where: { location: HEADER_DESKTOP_RIGHT }
      first: 100
    ) {
      ...MenuItems
    }
    menuFullscreen: menuItems(where: { location: MENU_FULLSCREEN }, first: 100) {
      ...MenuItems
    }
    footerExplore: menuItems(where: { location: FOOTER_EXPLORE }, first: 100) {
      ...MenuItems
    }
    footerBottom: menuItems(where: { location: FOOTER_BOTTOM }, first: 100) {
      ...MenuItems
    }
`;

export const SITE_QUERY = `
  ${IMAGE_FRAGMENT}
  ${MENU_FRAGMENT}

  query SiteChrome {
    ${SITE_FIELDS}
  }
`;

export const HOME_QUERY = `
  ${IMAGE_FRAGMENT}
  ${MENU_FRAGMENT}
  ${SEO_FRAGMENT}

  query HomePage {
    ${SITE_FIELDS}
    ${TEAM_MEMBER_FIELDS}

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

    page: nodeByUri(uri: "/") {
      ... on Page {
        id
        ...PageSeo
        homePage {
          heroSectionId

          heroPanels {
            title
            description
            buttonLabel
            buttonUrl
            bookButtonLabel
            bookButtonUrl
            image {
              node {
                ...Img
              }
            }
          }

          aboutSectionId
          aboutLabel
          aboutHeading
          aboutParagraph
          aboutCards {
            titleA
            titleB
            description
            image {
              node {
                ...Img
              }
            }
          }

          needsSectionId
          needsLabel
          needsHeading
          needsParagraph
          needsItems {
            verb
            title
            description
          }

          teamSectionId
          teamLabel
          teamHeading
          teamParagraph
          teamButtonLabel
          teamButtonUrl
          showTeamButton

          videoSectionId
          videoFile {
            node {
              mediaItemUrl
            }
          }
          videoPoster {
            node {
              ...Img
            }
          }
          videoLabel

          servicesSectionId
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

          gtkSectionId
          gtkLabel
          gtkHeading
          gtkParagraph
          gtkButtonLabel
          gtkButtonUrl
          gtkBackgrounds {
            nodes {
              ...Img
            }
          }
          gtkCards {
            title
            description
          }

          faqSectionId
          faqLabel
          faqHeading
          faqParagraph
          # Picked per page rather than "every FAQ post", so a service page can
          # carry its own questions without them surfacing here too.
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

          reviewsSectionId
          reviewsLabel
          reviewsHeading
          reviewsParagraph

          contactSectionId
          contactLabel
          contactHeading
          contactParagraph
          contactImage {
            node {
              ...Img
            }
          }
          contactImageAlt
        }
      }
    }
  }
`;

export const CONTACT_US_QUERY = `
  ${IMAGE_FRAGMENT}
  ${MENU_FRAGMENT}
  ${SEO_FRAGMENT}

  query ContactUsPage {
    ${SITE_FIELDS}

    page: nodeByUri(uri: "/contact-us/") {
      ... on Page {
        id
        ...PageSeo
        contactUsPage {
          heroSectionId
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
          heroLogo {
            node {
              ...Img
            }
          }

          infoSectionId
          infoLabel
          infoHeading
          infoParagraph
          infoMapEmbed

          guideSectionId
          guideLabel
          guideHeading
          guideParagraph
          guideButtonLabel
          guideButtonUrl
          guideImage {
            node {
              ...Img
            }
          }

          faqSectionId
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

          ctaSectionId
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

export const INSURANCE_QUERY = `
  ${IMAGE_FRAGMENT}
  ${MENU_FRAGMENT}
  ${SEO_FRAGMENT}

  query InsurancePage {
    ${SITE_FIELDS}

    page: nodeByUri(uri: "/insurance-direct-billing/") {
      ... on Page {
        id
        ...PageSeo
        insurancePage {
          heroSectionId
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
          heroLogo {
            node {
              ...Img
            }
          }

          coverageSectionId
          coverageLabel
          coverageHeading
          coverageParagraph
          coverageCards {
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

          processSectionId
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

          benefitsSectionId
          benefitsLabel
          benefitsHeading
          benefitsParagraph
          benefitsIcon {
            node {
              ...Img
            }
          }
          benefitsItems {
            title
            description
          }
          benefitsFootnote

          providersSectionId
          providersLabel
          providersHeading
          providersParagraph
          providersTabs {
            tabId
            tabLabel
            tabProviders {
              name
              logo {
                node {
                  ...Img
                }
              }
            }
            tabHtml
          }
          providersNote

          beforeSectionId
          beforeLabel
          beforeHeading
          beforeParagraph
          beforeButtonLabel
          beforeButtonUrl

          faqSectionId
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
        }
      }
    }
  }
`;

export const KIDS_PLAY_THERAPY_QUERY = `
  ${IMAGE_FRAGMENT}
  ${MENU_FRAGMENT}
  ${SEO_FRAGMENT}

  query KidsPlayTherapyPage {
    ${SITE_FIELDS}

    ${TEAM_CATEGORY_FIELDS}

    page: nodeByUri(uri: "/kids-and-play-therapy/") {
      ... on Page {
        id
        ...PageSeo
        kidsPlayTherapyPage {
          heroSectionId
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
          heroLogo {
            node {
              ...Img
            }
          }

          noticeSectionId
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

          approachSectionId
          approachLabel
          approachHeading
          approachParagraph
          approachImage {
            node {
              ...Img
            }
          }
          approachQuote

          supportSectionId
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

          processSectionId
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

          roleSectionId
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

          teamSectionId
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

          insuranceSectionId
          insuranceLabel
          insuranceHeading
          insuranceParagraph
          insuranceButtonLabel
          insuranceButtonUrl

          faqSectionId
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

          ctaSectionId
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

export const OUR_TEAM_QUERY = `
  ${IMAGE_FRAGMENT}
  ${MENU_FRAGMENT}
  ${SEO_FRAGMENT}

  query OurTeamPage {
    ${SITE_FIELDS}

    ${TEAM_MEMBER_FIELDS}

    page: nodeByUri(uri: "/our-team/") {
      ... on Page {
        id
        ...PageSeo
        ourTeamPage {
          heroSectionId
          heroLabel
          heroHeading
          heroParagraph
          heroImage {
            node {
              ...Img
            }
          }
          heroButtonLabel
          heroButtonUrl

          teamSectionId

          videoSectionId
          videoFile {
            node {
              mediaItemUrl
            }
          }
          videoPoster {
            node {
              ...Img
            }
          }
          videoLabel

          faqSectionId
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

          ctaSectionId
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

export const MENTAL_HEALTH_QUERY = `
  ${IMAGE_FRAGMENT}
  ${MENU_FRAGMENT}
  ${SEO_FRAGMENT}

  query MentalHealthPage {
    ${SITE_FIELDS}
    ${TEAM_MEMBER_FIELDS}

    page: nodeByUri(uri: "/mental-health/") {
      ... on Page {
        id
        ...PageSeo
        mentalHealthPage {
          heroSectionId
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
          heroLogo {
            node {
              ...Img
            }
          }

          introSectionId
          introLabel
          introHeading
          introParagraph
          introImage {
            node {
              ...Img
            }
          }

          supportSectionId
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

          processSectionId
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

          teamSectionId
          teamLabel
          teamHeading
          teamParagraph
          # "all" (the default) renders every member in one rail. "categories"
          # adds the All / category tabs above it, scoped to the terms picked in
          # teamCategoriesPicked.
          teamDisplayMode
          teamCategoriesPicked(first: 100) {
            nodes {
              ... on TeamCategory {
                slug
              }
            }
          }

          benefitsSectionId
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

          faqSectionId
          faqLabel
          faqHeading
          faqParagraph
          # A relationship field, so the editor picks which FAQs this page shows
          # rather than inheriting the whole post type. No orderby: with no
          # explicit one WPGraphQL orders a post__in query by post__in, which is
          # the order the questions were dragged into in the admin.
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

          ctaSectionId
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

export const PHYSICAL_HEALTH_QUERY = `
  ${IMAGE_FRAGMENT}
  ${MENU_FRAGMENT}
  ${SEO_FRAGMENT}

  query PhysicalHealthPage {
    ${SITE_FIELDS}
    ${TEAM_MEMBER_FIELDS}

    page: nodeByUri(uri: "/physical-health/") {
      ... on Page {
        id
        ...PageSeo
        physicalHealthPage {
          heroSectionId
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
          heroLogo {
            node {
              ...Img
            }
          }

          introSectionId
          introLabel
          introHeading
          introParagraph
          introImage {
            node {
              ...Img
            }
          }

          supportSectionId
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

          processSectionId
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

          teamSectionId
          teamLabel
          teamHeading
          teamParagraph
          # "all" (the default) renders every member in one rail. "categories"
          # adds the All / category tabs above it, scoped to the terms picked in
          # teamCategoriesPicked.
          teamDisplayMode
          teamCategoriesPicked(first: 100) {
            nodes {
              ... on TeamCategory {
                slug
              }
            }
          }

          benefitsSectionId
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

          faqSectionId
          faqLabel
          faqHeading
          faqParagraph
          # A relationship field, so the editor picks which FAQs this page shows
          # rather than inheriting the whole post type. No orderby: with no
          # explicit one WPGraphQL orders a post__in query by post__in, which is
          # the order the questions were dragged into in the admin.
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

          ctaSectionId
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
