import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BlogPostType = {
  id?: string | null;
  slug?: string | null;
  title?: string | null;
  date?: string | null;
};

type RecentPostsPropsType = {
  data: BlogPostType[];
};

const formatDate = (date?: string | null) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function RecentPosts({ data }: RecentPostsPropsType) {
  return (
    <div>
      <h3 className="mb-6 text-3xl font-bold text-teal">Recent Posts</h3>

      <ul className="divide-y divide-gray-200">
        {data.slice(0, 5).map((item) => (
          <li key={item?.id ?? item?.slug}>
            <Link
              href={`/blog/${item?.slug}`}
              className="group flex items-start gap-3 py-4 transition-colors"
            >
              <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />

              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 text-base font-semibold leading-tight text-secondary transition-colors duration-300 group-hover:text-primary">
                  {item?.title}
                </h4>

              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
