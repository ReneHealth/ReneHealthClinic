import { MetaData, SeoType } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { wpQuery } from '@/lib/graphql';
import { GET_BLOG_DETAIL } from '@/lib/blog';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import RelatedPosts from '@/components/blog/RelatedPosts';
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
  content?: string | null;
  date?: string | null;
  featuredImage?: ImageType | null;
  categories?: {
    nodes?: CategoryType[] | null;
  } | null;
  seo?: SeoType | null;
};
type PageType = {
  post?: BlogPostType | null;
  posts?: {
    nodes?: BlogPostType[] | null;
  } | null;
  categories?: {
    nodes?: CategoryType[] | null;
  } | null;
};
type BlogDetailPagePropsType = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateMetadata({ params }: BlogDetailPagePropsType) {
  const { slug } = await params;
  const data = await wpQuery<PageType>(GET_BLOG_DETAIL, { slug }, {
    tags: [`post:${slug}`, 'post'],
  });
  return MetaData(data.post?.seo);
}
export default async function BlogDetailPage({ params }: BlogDetailPagePropsType) {
  const { slug } = await params;
  const page = await wpQuery<PageType>(GET_BLOG_DETAIL, { slug }, {
    tags: [`post:${slug}`, 'post'],
  });
  const post = page?.post;
  if (!post) {
    return null;
  }
  const recentPosts = (page?.posts?.nodes ?? []).filter((item) => item?.slug !== slug);
  const categories = page?.categories?.nodes ?? [];

  return (
    <>
      <JsonLd seo={post.seo} />
<section className="border-t-126 border-pine py-12 lg:py-20">
        <div className="z-10 mx-auto max-w-350 px-5 md:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <BlogContent data={post} />
            <BlogSidebar recentPosts={recentPosts} categories={categories} />
          </div>
        </div>
      </section>
      <RelatedPosts posts={recentPosts.slice(0, 6)} />
    </>
  );
}
