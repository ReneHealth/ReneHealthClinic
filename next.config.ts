import type { NextConfig } from "next";

const wpHost = (() => {
  try {
    return new URL(process.env.WP_URL ?? "http://rene-health-clinic.local").hostname;
  } catch {
    return "rene-health-clinic.local";
  }
})();

const LEGACY_SERVICE_REDIRECTS = [
  ["/mental-health/individual-counselling", "/individual-counselling"],
  ["/mental-health/mental-health-individualcounselling", "/individual-counselling"],
  // Vercel's edge router lets the /mental-health/:slug catch-all below win
  // over the entry above (it does not locally), which strands the old URL on
  // /mental-health-individualcounselling. Catch that output too so the old
  // URL reaches the right page whichever rule fires first.
  ["/mental-health-individualcounselling", "/individual-counselling"],
  ["/mental-health/couple-counselling", "/couple-counselling"],
  ["/mental-health/family-counselling", "/family-counselling"],
  ["/mental-health/kids-and-play-therapy", "/kids-and-play-therapy"],
  ["/mental-health/adhd-management", "/adhd-management"],
  ["/mental-health/anger-management", "/anger-management"],
  ["/physical-health/acupuncture", "/acupuncture"],
  ["/physical-health/chiropractic", "/chiropractic"],
  ["/physical-health/dietetics", "/dietetics"],
  ["/physical-health/massage", "/massage"],
  ["/physical-health/naturopathy", "/naturopathy"],
  ["/physical-health/nutritionist", "/nutritionist"],
  ["/physical-health/osteopathy-coquitlam", "/osteopathy-coquitlam"],
  ["/physical-health/skincare-facials-coquitlam", "/skincare-facials-coquitlam"],
].map(([source, destination]) => ({ source, destination, permanent: true }));

// The previous WordPress site served blog posts at the root (/%postname%/).
// Those are the URLs search engines still hold, so each one gets a permanent
// redirect to its /blog/<slug> home. Explicit list, not a root catch-all, so
// genuinely unknown URLs still 404.
const LEGACY_POST_SLUGS = [
  "signs-my-child-needs-therapy",
  "rene-health-best-chiropractic",
  "couples-counselling-tri-cities-coquitlam-port-moody-port-coquitlam",
  "facial-acupuncture-coquitlam-rene-health-clinic",
  "family-counselling-coquitlam-rene-health-clinic",
  "supporting-child-mental-health-back-to-school",
  "family-therapy-coquitlam-addiction-recover",
  "stress-vs-trauma-counselling-coquitlam",
  "anxiety-counselling-coquitlam",
  "depression-counselling-in-coquitlam-port-coquitlam-port-moody-rene-health-clinic",
  "mental-health-counselling-coquitlam",
  "family-counselling-coquitlam",
  "couples-counselling",
  "counselling-coquitlam-anxiety",
].map((slug) => ({
  source: `/${slug}`,
  destination: `/blog/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: wpHost },
      { protocol: "https", hostname: wpHost },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 85, 90],
  },
  redirects: async () => [
    {
      source: "/insurance",
      destination: "/insurance-direct-billing",
      permanent: true,
    },
    { source: "/contact", destination: "/contact-us", permanent: true },
    { source: "/counselling", destination: "/mental-health", permanent: true },
    {
      source:
        "/wp-content/uploads/2025/11/Rene-Health-Clinic-Visitor-Guide-1.pdf",
      destination: "/Rene-Health-Clinic-Visitor-Guide.pdf",
      permanent: true,
    },

    // The previous WordPress site nested every service under its category
    // (/mental-health/adhd-management/, /physical-health/massage/). Those
    // URLs are what Google, Bing and every inbound link still know. This
    // site flattened them, so each old path gets a permanent redirect to
    // its new home. Trailing slashes are stripped by Next before matching.
    ...LEGACY_SERVICE_REDIRECTS,
    ...LEGACY_POST_SLUGS,

    // Services the clinic no longer offers a page for. Send the old URLs
    // to the category page rather than a 404 so their link equity carries.
    ...["/physiotherapy", "/physiotherapy-rene-health-coquitlam", "/kinesiology"].map(
      (source) => ({ source, destination: "/physical-health", permanent: true }),
    ),

    // Catch-all for any other nested service slug from the old structure.
    // Explicit entries above win because Next matches redirects in order.
    { source: "/mental-health/:slug", destination: "/:slug", permanent: true },
    { source: "/physical-health/:slug", destination: "/:slug", permanent: true },
  ],
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
  ],
};

export default nextConfig;
