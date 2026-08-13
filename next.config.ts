import type { NextConfig } from "next";

const wpHost = (() => {
  try {
    return new URL(process.env.WP_URL ?? "http://rene-health-clinic.local").hostname;
  } catch {
    return "rene-health-clinic.local";
  }
})();

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
      remotePatterns: [
      
      { protocol: "https", hostname: wpHost },
    ],
    
  },
  redirects: async () => [
    {
      source: "/insurance",
      destination: "/insurance-direct-billing",
      permanent: true,
    },
    { source: "/contact", destination: "/contact-us", permanent: true },
    { source: "/counselling", destination: "/mental-health", permanent: true },
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
