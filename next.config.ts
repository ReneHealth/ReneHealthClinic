import type { NextConfig } from "next";

const wpHost = (() => {
  try {
    return new URL(process.env.WP_URL ?? "http://rene-health-clinic.local").hostname;
  } catch {
    return "rene-health-clinic.local";
  }
})();

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
