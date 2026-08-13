const DEV_WP_URL = "http://rene-health-clinic.local";
const DEFAULT_SITE_URL = "https://renehealth.ca";

function trimSlash(value: string): string {
  return value.trim().replace(/\/$/, "");
}

function readWpUrl(): string {
  const value = process.env.WP_URL;
  if (value?.trim()) return trimSlash(value);

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "WP_URL is not set. Every canonical URL, OG tag, JSON-LD origin rewrite " +
        "and next/image host allowlist is derived from it, so a missing value " +
        "produces a site that renders but points at nothing.",
    );
  }

  return DEV_WP_URL;
}

export const WP_URL = readWpUrl();

export const SITE_URL = trimSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
);

export const WP_REVALIDATE = Number(process.env.WP_REVALIDATE ?? 300);
