import RecentPosts from './RecentPosts';
import BlogCategories from './BlogCategories';
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
  date?: string | null;
  featuredImage?: ImageType | null;
};
type BlogSidebarPropsType = {
  recentPosts: BlogPostType[];
  categories: CategoryType[];
};
export default function BlogSidebar({
  recentPosts,
  categories,
}: BlogSidebarPropsType) {
  return (
    <aside className="space-y-10 lg:sticky lg:top-10 lg:self-start">
      <RecentPosts data={recentPosts} />
      <div>
       <h3 className="mb-6 text-3xl font-bold text-teal">
          Categories
        </h3>
    <BlogCategories
  data={categories}
  activeCategory=""
  variant="sidebar"
/>
      </div>
    </aside>
  );
}