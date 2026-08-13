import type { SeoType } from "@/lib/metadata";
import { seoJsonLd } from "@/lib/metadata";

export default function JsonLd({ seo }: { seo?: SeoType | null }) {
  const json = seoJsonLd(seo);
  if (!json) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
