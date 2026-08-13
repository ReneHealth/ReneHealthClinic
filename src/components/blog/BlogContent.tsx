import Image from "next/image";
type ImageType = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};
type CategoryType = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
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
};
type BlogContentPropsType = {
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
export default function BlogContent({ data }: BlogContentPropsType) {
  return (
    <article>

      {data?.featuredImage?.node?.sourceUrl && (
        <div className="relative pt-[60%] overflow-hidden w-full">
          <Image
            src={data.featuredImage.node.sourceUrl}
            alt={data.featuredImage.node.altText ?? data.title ?? "Blog"}
            fill
            priority
            className="object-cover rounded-3xl"
            sizes="100vw"
          />
          <span className="absolute right-2 top-2 rounded-full bg-white/60 px-4 py-1.5 text-center text-xs font-light uppercase text-[#122620] transition-all duration-300 hover:bg-white z-10">
            {formatDate(data?.date)}
          </span>
        </div>
      )}
      <div
        className="cms-blog mt-10"
        dangerouslySetInnerHTML={{
          __html: data?.content ?? "",
        }}
      />
    </article>
  );
}
