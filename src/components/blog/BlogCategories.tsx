'use client';
import Link from 'next/link';
import { ChevronRight, Folder } from 'lucide-react';
type CategoryType = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
};
type BlogCategoriesPropsType = {
  data: CategoryType[];
  activeCategory: string;
  variant?: 'listing' | 'sidebar';
};
export default function BlogCategories({
  data,
  activeCategory,
  variant = 'listing'
}: BlogCategoriesPropsType) {
  if (variant === 'sidebar') {
    return (
      <div>
              <ul className="divide-y divide-gray-200">
          {data.map((item) => (
            <li key={item?.id}>
              <Link
                href={`/blog/category/${item?.slug}`}
                className={`group flex items-center justify-between py-4 transition-colors ${
                  activeCategory === item?.slug
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}>
                <div className="flex items-center gap-3">
                  <Folder
                    className={`h-5 w-5 transition-colors ${
                      activeCategory === item?.slug
                        ? 'text-primary'
                        : 'text-primary'
                    }`}
                  />
                  <span className="font-semibold">{item?.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
      <Link
        href="/blog"
        className={`rounded-full border px-4 py-2 text-center text-sm font-bold transition-all duration-300 md:w-auto ${
          activeCategory === ''
            ? 'border-king bg-king text-white'
            : 'border-[#1f3d4c] bg-[#1f3d4c] text-white hover:border-king hover:bg-king'
        }`}>
        All
      </Link>
      {data.map((item) => (
        <Link
          key={item?.id}
          href={`/blog/category/${item?.slug}`}
          className={`rounded-full border px-4 py-2 text-center text-sm font-bold transition-all duration-300 md:w-auto ${
            activeCategory === item?.slug
              ? 'border-king bg-king text-white'
              : 'border-[#1f3d4c] bg-[#1f3d4c] text-white hover:border-king hover:bg-king'
          }`}>
          {item?.name}
        </Link>
      ))}
    </div>
  );
}