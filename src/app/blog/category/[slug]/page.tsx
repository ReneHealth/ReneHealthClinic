import { wpQuery } from '@/lib/graphql';
import { GET_BLOG_PAGE } from '@/lib/blog';
import FeaturedPost from '@/components/blog/FeaturedPost';
import InfiniteScrollPosts from '@/components/blog/InfiniteScrollPosts';
import BlogHero from '@/components/blog/BlogHero';
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
type CatPageType = {
  posts?: {
    nodes?: BlogPostType[] | null;
    pageInfo?: PageInfoType | null;
  } | null;
  categories?: {
    nodes?: CategoryType[] | null;
  } | null;
};
type BlogCategoryPagePropsType = {
  params: Promise<{
    slug: string;
  }>;
};
export default async function BlogCategoryPage({ params }: BlogCategoryPagePropsType) {
  const { slug } = await params;
  const page = await wpQuery<CatPageType>(GET_BLOG_PAGE, {
    first: 10,
    after: null,
    category: slug
  });
  const posts = page?.posts?.nodes ?? [];
  const featuredPost = posts[0];
  const blogPosts = posts.slice(1);
  const categoryName = page?.categories?.nodes?.find((category) => category.slug === slug)?.name ?? 'Insights for a Healthier Life';
  return (
    <>
<BlogHero
  content={{   
    heading: categoryName,
    paragraph:
      '<p>Stay informed with expert advice, wellness tips, and the latest insights on physical health, mental well-being, nutrition, and preventive care.</p>',
    image: {
      src: '/images/blog-hero.jpg',
      alt: categoryName
    },
    cta: {
      label: 'View All Articles',
      href: '#post',
      target: '_self'
    }
  }}
/>
      <section id="post" className="py-10 lg:py-16">
        <div className="relative z-10 mx-auto max-w-350 px-5 md:px-6 lg:px-10">
          {featuredPost && <FeaturedPost data={featuredPost} />}
          <InfiniteScrollPosts initialPosts={blogPosts} initialPageInfo={page?.posts?.pageInfo ?? null} category={slug} loadMode="click" />
        </div>
      </section>
    </>
  );
}
