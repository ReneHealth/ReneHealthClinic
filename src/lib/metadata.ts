import type { Metadata } from "next";
import { SITE_URL, WP_URL } from "@/lib/env";

export interface OpenGraphImageType {
  sourceUrl?: string | null;
  altText?: string | null;
  mediaDetails?: {
    width?: number | null;
    height?: number | null;
  } | null;
}

export interface SeoType {
  title?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;
  metaRobotsNoindex?: string | null;
  metaRobotsNofollow?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphType?: string | null;
  opengraphSiteName?: string | null;
  opengraphUrl?: string | null;
  opengraphPublishedTime?: string | null;
  opengraphModifiedTime?: string | null;
  opengraphImage?: OpenGraphImageType | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: OpenGraphImageType | null;
  schema?: { raw?: string | null } | null;
}

export type PageType<T extends object = object> = {
  page?: (T & { seo?: SeoType | null }) | null;
};

const clean = (value?: string | null): string | undefined =>
  value?.trim() ? value.trim() : undefined;

const stripWww = (host: string): string => host.replace(/^www\./, "");

// The headless CMS lives at backend.renehealth.ca. Yoast stamps that host on
// every canonical, OpenGraph URL and JSON-LD @id it produces. WP_URL is
// *usually* the same origin, but it is an env var and has been set to a
// different spelling before - which silently left the backend host in the
// canonical tag for a month and got the whole site dropped from Google. So
// the public backend host is listed here explicitly, alongside whatever
// WP_URL says, and every rewrite matches on host (not origin) so protocol
// and www differences can never break it again.
const CMS_PUBLIC_HOST = "backend.renehealth.ca";
const CMS_HOSTS = new Set(
  [new URL(WP_URL).hostname, CMS_PUBLIC_HOST].map(stripWww),
);
const SITE_HOST = stripWww(new URL(SITE_URL).hostname);

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Matches any absolute URL origin on a CMS host, whatever the protocol or
// www prefix, e.g. https://backend.renehealth.ca or http://www.backend...
const CMS_ORIGIN_PATTERN = new RegExp(
  `https?:\\/\\/(?:www\\.)?(?:${[...CMS_HOSTS].map(escapeRegExp).join("|")})`,
  "g",
);

// Any URL on a CMS host - or on the public host under a different
// protocol/www spelling - is rewritten onto SITE_URL. Anything else is
// dropped: a canonical pointing off-site is worse than no canonical.
function toFrontendUrl(url?: string | null): string | undefined {
  const value = clean(url);
  if (!value) return undefined;

  const normalise = (pathname: string): string =>
    pathname.replace(/\/+$/, "") || "";

  if (value.startsWith("/")) return `${SITE_URL}${normalise(value)}`;

  try {
    const parsed = new URL(value);
    const host = stripWww(parsed.hostname);
    if (CMS_HOSTS.has(host) || host === SITE_HOST) {
      return `${SITE_URL}${normalise(parsed.pathname)}${parsed.search}`;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function ogImage(image?: OpenGraphImageType | null) {
  const url = clean(image?.sourceUrl);
  if (!url) return undefined;
  return [
    {
      url,
      alt: clean(image?.altText),
      width: image?.mediaDetails?.width ?? undefined,
      height: image?.mediaDetails?.height ?? undefined,
    },
  ];
}

export function MetaData(seo?: SeoType | null, fallback?: Metadata): Metadata {
  const title = clean(seo?.title) ?? fallback?.title ?? undefined;
  const description =
    clean(seo?.metaDesc) ?? fallback?.description ?? undefined;
  // The route owns its canonical, full stop. Yoast's canonical is never used:
  // the CMS stores backend.renehealth.ca URLs, and letting one through tells
  // Google the frontend page is a duplicate of the (noindexed, redirecting)
  // headless backend. Every page passes its own path via fallback.alternates.
  const canonical =
    typeof fallback?.alternates?.canonical === "string"
      ? `${SITE_URL}${fallback.alternates.canonical.replace(/\/+$/, "")}`
      : undefined;

  const images = ogImage(seo?.opengraphImage);
  const twitterImageUrl = clean(seo?.twitterImage?.sourceUrl);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: {
      index: seo?.metaRobotsNoindex !== "noindex",
      follow: seo?.metaRobotsNofollow !== "nofollow",
    },
    openGraph: {
      type: seo?.opengraphType === "article" ? "article" : "website",
      title: clean(seo?.opengraphTitle) ?? title,
      description: clean(seo?.opengraphDescription) ?? description,
      siteName: clean(seo?.opengraphSiteName),
      url: canonical ?? toFrontendUrl(seo?.opengraphUrl),
      publishedTime: clean(seo?.opengraphPublishedTime),
      modifiedTime: clean(seo?.opengraphModifiedTime),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: clean(seo?.twitterTitle) ?? clean(seo?.opengraphTitle) ?? title,
      description:
        clean(seo?.twitterDescription) ??
        clean(seo?.opengraphDescription) ??
        description,
      images: twitterImageUrl ?? images?.[0]?.url,
    },
  };
}

export function seoJsonLd(seo?: SeoType | null): string | null {
  const raw = clean(seo?.schema?.raw);
  if (!raw) return null;

  try {
    // Host-based replace, not origin-based: Yoast writes the backend origin
    // into every @id/url, and it must never survive into the public HTML.
    const rewritten = raw.replace(CMS_ORIGIN_PATTERN, SITE_URL);
    JSON.parse(rewritten);
    return rewritten.replace(
      /[<>\u2028\u2029]/g,
      (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
    );
  } catch {
    return null;
  }
}
