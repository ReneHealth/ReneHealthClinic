"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "./BlogCard";
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
type RelatedPostsPropsType = {
  posts: BlogPostType[];
};
const NAV_BUTTON =
  "flex w-8 h-8 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-teal transition-all duration-300 hover:border-primary hover:bg-king hover:border-king hover:text-aqua cursor-pointer";
export default function RelatedPosts({ posts }: RelatedPostsPropsType) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild as HTMLElement | null;
    const step = slide
      ? slide.getBoundingClientRect().width + 24
      : track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  if (!posts.length) {
    return null;
  }
  return (
    <section className="py-10 lg:py-20 bg-aqua-soft/5">
      <div className="z-10 mx-auto max-w-350 px-5 md:px-6 lg:px-10">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-secondary lg:text-4xl">
            Related Posts
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous related posts"
              onClick={() => scrollByPage(-1)}
              className={NAV_BUTTON}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              aria-label="Next related posts"
              onClick={() => scrollByPage(1)}
              className={NAV_BUTTON}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((item) => (
            <div
              key={item?.id ?? item?.slug}
              className="w-full shrink-0 snap-start md:w-[calc(50%-12px)] min-[1200px]:w-[calc(33.333%-16px)]"
            >
              <BlogCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
