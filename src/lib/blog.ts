const MEDIA_DETAILS = `
  mediaDetails {
    width
    height
  }
`;
const IMAGE = `
  node {
    sourceUrl
    altText
    ${MEDIA_DETAILS}
  }
`;
const FEATURED_IMAGE = `
  featuredImage {
    ${IMAGE}
  }
`;
const PAGE_FIELDS = `
  id
  title
  slug
  uri
  content
  ${FEATURED_IMAGE}
  blogPage {
    bannerLabel
    bannerHeading
    bannerParagraph
    bannerButtonLabel
    bannerButtonUrl
    bannerImage {
      ${IMAGE}
    }
  }
`;
const SEO = `
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
    ${MEDIA_DETAILS}
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
`;
export const GET_BLOG_PAGE = `
query GetBlogPage(
  $first: Int = 9
  $after: String
  $category: String
) {
  page(id: "blog", idType: URI) {
    title
    ${SEO}
    ${PAGE_FIELDS}
  }
  posts(
    first: $first
    after: $after
    where: {
      status: PUBLISH
      categoryName: $category
      orderby: {
        field: DATE
        order: DESC
      }
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      slug
      title
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
  categories(where: { hideEmpty: true }) {
    nodes {
      id
      name
      slug
    }
  }
}
`;
export const GET_BLOG_DETAIL = `
query GetBlogDetail($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    slug
    title
    date
    content
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes {
        id
        name
        slug
      }
    }
    ${SEO}
  }
  posts(
    first: 5
    where: {
      status: PUBLISH
      orderby: {
        field: DATE
        order: DESC
      }
    }
  ) {
    nodes {
      id
      slug
      title
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
  categories(where: { hideEmpty: true }) {
    nodes {
      id
      name
      slug
    }
  }
}
`;