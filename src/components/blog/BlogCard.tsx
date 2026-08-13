import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
type BlogCardPropsType = {
  data: BlogPostType;
};
const formatDate = (date?: string | null) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
export default function BlogCard({ data }: BlogCardPropsType) {
  const image =
    data?.featuredImage?.node?.sourceUrl ?? "/images/blog-placeholder.jpg";
  return (
    <article className="group flex h-full flex-col overflow-hidden bg-[#E5F6F7] hover:bg-aqua/60 duration-500 p-2.5 rounded-2xl">
      <div className="relative">
        <Link
          href={`/blog/${data?.slug}`}
          className="relative block overflow-hidden pt-[60%] rounded-2xl z-10"
        >
          <Image
            src={image}
            alt={data?.featuredImage?.node?.altText ?? data?.title ?? "Blog"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        </Link>
        <div className="absolute top-2 right-2.5 z-20 flex flex-wrap justify-end gap-2">
          {(data?.categories?.nodes ?? []).map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="rounded-full bg-white/60 backdrop-blur-3xl px-4 py-1.5 text-center text-xs font-light uppercase text-[#122620] transition-all duration-300 hover:bg-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href={`/blog/${data?.slug}`}
        className="flex flex-1 flex-col justify-between py-3 px-2 pb-0 md:p-5"
      >
        <h3 className="text-[18px] md:text-2xl font-bold leading-tight text-ink transition-colors duration-300 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
          {data?.title}
        </h3>
        <span className="inline-flex items-center gap-1 text-sm duration-700 tracking-wide text-ink/45 hover:text-black transition-all group-hover:tracking-widest mt-2">
          Read More
          <ArrowRight className="h-4 w-4 stroke-[1.5]" />
        </span>
      </Link>
    </article>
  );
}
