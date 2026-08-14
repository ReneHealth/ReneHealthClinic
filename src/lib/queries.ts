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
          heroPanels {
            title
            description
            buttonLabel
            buttonUrl
            image {
              node {
                ...Img
              }
            }
          }

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

          needsLabel
          needsHeading
          needsParagraph
          needsItems {
            verb
            title
            description
          }

          teamLabel
          teamHeading
          teamParagraph
          teamButtonLabel
          teamButtonUrl
          showTeamButton

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

          reviewsLabel
          reviewsHeading
          reviewsParagraph

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

          infoLabel
          infoHeading
          infoParagraph
          infoMapEmbed

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

          beforeLabel
          beforeHeading
          beforeParagraph
          beforeButtonLabel
          beforeButtonUrl

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

          approachLabel
          approachHeading
          approachParagraph
          approachImage {
            node {
              ...Img
            }
          }
          approachQuote

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

          insuranceLabel
          insuranceHeading
          insuranceParagraph
          insuranceButtonLabel
          insuranceButtonUrl

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

          introLabel
          introHeading
          introParagraph
          introImage {
            node {
              ...Img
            }
          }

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

          teamLabel
          teamHeading
          teamParagraph

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

          introLabel
          introHeading
          introParagraph
          introImage {
            node {
              ...Img
            }
          }

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

          teamLabel
          teamHeading
          teamParagraph

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
