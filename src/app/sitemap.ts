import type { MetadataRoute } from "next";
import { wpQuery } from "@/lib/graphql";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://renehealth.ca"
).replace(/\/$/, "");

const USE_WP = process.env.NEXT_PUBLIC_CONTENT_SOURCE === "wordpress";

const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },

  { path: "/mental-health", priority: 0.9 },
  { path: "/physical-health", priority: 0.9 },

  { path: "/individual-counselling", priority: 0.8 },
  { path: "/couple-counselling", priority: 0.8 },
  { path: "/family-counselling", priority: 0.8 },
  { path: "/kids-and-play-therapy", priority: 0.8 },
  { path: "/adhd-management", priority: 0.8 },
  { path: "/anger-management", priority: 0.8 },

  { path: "/acupuncture", priority: 0.8 },
  { path: "/chiropractic", priority: 0.8 },
  { path: "/dietetics", priority: 0.8 },
  { path: "/massage", priority: 0.8 },
  { path: "/naturopathy", priority: 0.8 },
  { path: "/nutritionist", priority: 0.8 },
  { path: "/osteopathy-coquitlam", priority: 0.8 },
  { path: "/skincare-facials-coquitlam", priority: 0.8 },

  { path: "/insurance-direct-billing", priority: 0.8 },
  { path: "/insurance-direct-billing/icbc", priority: 0.7 },
  { path: "/insurance-direct-billing/extended-health-insurance", priority: 0.7 },
  { path: "/insurance-direct-billing/worksafebc", priority: 0.7 },
  { path: "/our-team", priority: 0.8 },
  { path: "/contact-us", priority: 0.8 },

  { path: "/blog", priority: 0.7 },
];

const POSTS_QUERY = `
  query SitemapPosts {
    posts(first: 500, where: { status: PUBLISH }) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`;

interface SitemapPosts {
  posts: { nodes: Array<{ slug: string; modifiedGmt: string | null }> } | null;
}

async function blogEntries(): Promise<MetadataRoute.Sitemap> {
  if (!USE_WP) return [];

  try {
    const data = await wpQuery<SitemapPosts>(
      POSTS_QUERY,
      {},
      { tags: ["post"] },
    );

    return (data.posts?.nodes ?? []).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.modifiedGmt
        ? new Date(`${post.modifiedGmt}Z`)
        : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  return [...staticEntries, ...(await blogEntries())];
}
