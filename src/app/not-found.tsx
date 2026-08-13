import type { Metadata } from "next";
import NotFoundContent from "@/components/sections/NotFound";
import { getSiteChrome } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Page Not Found | Rene Health Clinic",
  description:
    "The page you were looking for isn't here. Find counselling, physical health, insurance and team information at Rene Health Clinic in Coquitlam.",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const { settings } = await getSiteChrome();

  return (
    <NotFoundContent
      booking={settings.booking}
      phone={settings.phone}
      phoneHref={settings.phoneHref}
    />
  );
}
