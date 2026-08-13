import Link from "next/link";
import Image from "next/image";
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
type FeaturedPostPropsType = {
  data: BlogPostType;
};
const formatDate = (date?: string | null) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
const removeHtml = (text?: string | null) => {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, "");
};
export default function FeaturedPost({ data }: FeaturedPostPropsType) {
  const image =
    data?.featuredImage?.node?.sourceUrl ?? "/images/blog-placeholder.jpg";
  return (
    <article className="mb-12 last:mb-0! overflow-hidden bg-teal lg:mb-14">
      <div className="flex flex-col-reverse md:grid lg:grid-cols-[0.8fr_1fr] gap-y-8 gap-x-10 lg:gap-x-14">
        <div className="flex flex-col justify-center text-white">
          <div className="md:mb-15 text-black">
            {(data?.categories?.nodes ?? []).map(
              (category, index, categories) => (
                <span key={category.id}>
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="section-label hover:text-black! duration-500"
                  >
                    {category.name}
                  </Link>
                  {index < categories.length - 1 && ", "}
                </span>
              ),
            )}
          </div>
          <div>
            <h3 className="text-2xl lg:text-[40px] font-bold leading-tight text-ink transition-colors duration-300 group-hover:text-aqua">
              {data?.title}
            </h3>
            <p className="mt-5 line-clamp-4 text-base leading-snug text-ink">
              {removeHtml(data?.excerpt)}
            </p>
          </div>
          <Link
            href={`/blog/${data?.slug}`}
            className="inline-flex items-center gap-1 text-sm duration-700 tracking-wide text-ink/45 hover:text-black transition-all hover:tracking-widest mt-8"
          >
            Read More
            <ArrowRight className="h-4 w-4 stroke-[1.5]" />
          </Link>
        </div>
        <Link
          href={`/blog/${data?.slug}`}
          className="relative block pt-[75%] rounded-2xl overflow-hidden"
        >
          <Image
            src={image}
            alt={data?.featuredImage?.node?.altText ?? data?.title ?? "Blog"}
            fill
            priority
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 70vw"
          />
        </Link>
      </div>
    </article>
  );
}
