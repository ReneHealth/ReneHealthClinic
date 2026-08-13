import { MetaData, PageType } from '@/lib/metadata';
import { wpQuery } from '@/lib/graphql';
import { GET_BLOG_PAGE } from '@/lib/blog';
import FeaturedPost from '@/components/blog/FeaturedPost';
import InfiniteScrollPosts from '@/components/blog/InfiniteScrollPosts';
import BlogHero from '@/components/blog/BlogHero';
type BlogBannerType = {
  bannerLabel?: string | null;
  bannerHeading?: string | null;
  bannerParagraph?: string | null;
  bannerButtonLabel?: string | null;
  bannerButtonUrl?: string | null;
  bannerImage?: ImageType | null;
};
type CategoryType = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
};
type ImageType = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};
type BlogPostType = {
  id?: string | null;
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: ImageType | null;
  categories?: {
    nodes?: CategoryType[] | null;
  } | null;
};
type PageInfoType = {
  hasNextPage?: boolean | null;
  hasPreviousPage?: boolean | null;
  startCursor?: string | null;
  endCursor?: string | null;
};
type BlogPageType = {
  page?: {
    title?: string | null;
    blogPage?: BlogBannerType | null;
  } | null;
  posts?: {
    nodes?: BlogPostType[] | null;
    pageInfo?: PageInfoType | null;
  } | null;
  categories?: {
    nodes?: CategoryType[] | null;
  } | null;
};
type BlogPagePropsType = {
  searchParams: Promise<{
    category?: string;
  }>;
};
export async function generateMetadata() {
  const data = await wpQuery<PageType>(GET_BLOG_PAGE, {}, {
    tags: ['page:blog', 'post'],
  });
  return MetaData(data.page?.seo);
}
export default async function BlogPage({ searchParams }: BlogPagePropsType) {
  const params = await searchParams;
  const category = params.category ?? '';
  const page = await wpQuery<BlogPageType>(GET_BLOG_PAGE, {
    first: 10,
    after: null,
    category
  });
  const posts = page?.posts?.nodes ?? [];
  const featuredPost = posts[0] ?? null;
  const blogPosts = posts.slice(1, 10);
  const banner = page?.page?.blogPage;
  const bannerImage = banner?.bannerImage?.node;
  return (
    <>
      <BlogHero
        content={{
          label: banner?.bannerLabel ?? 'Blog',
          heading: banner?.bannerHeading ?? 'Insights for a Healthier Life',
          paragraph:
            banner?.bannerParagraph ??
            '<p>Stay informed with expert advice, wellness tips, and the latest insights on physical health, mental well-being, nutrition, and preventive care.</p>',
          image: {
            src: bannerImage?.sourceUrl ?? '/images/blog-hero.jpg',
            alt: bannerImage?.altText ?? 'Blog'
          },
          cta: {
            label: banner?.bannerButtonLabel ?? 'View All Articles',
            href: banner?.bannerButtonUrl ?? '#post',
            target: '_self'
          }
        }}
      />
      <section id="post" className="py-10 lg:py-16">
        <div className="relative z-10 mx-auto max-w-350 px-5 md:px-6 lg:px-10">
          {featuredPost && <FeaturedPost data={featuredPost} />}
          <InfiniteScrollPosts
            initialPosts={blogPosts}
            initialPageInfo={page?.posts?.pageInfo ?? null}
            category={category}
            loadMode="click"
          />
        </div>
      </section>
    </>
  );
}
