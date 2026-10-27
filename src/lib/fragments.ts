export const IMAGE_FRAGMENT = `
  fragment Img on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

export const SEO_FRAGMENT = `
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

export const TEAM_CATEGORY_FIELDS = `
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
