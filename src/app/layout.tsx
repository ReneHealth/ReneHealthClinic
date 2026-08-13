import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./fontawesome-brands.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import IntroProvider from "@/components/providers/IntroProvider";
import ScrollScene from "@/components/ui/ScrollScene";
import Header from "@/components/layout/Header";
import BookButton from "@/components/layout/BookButton";
import Footer from "@/components/layout/Footer";
import { getSiteChrome } from "@/lib/wp";

const boska = localFont({
  src: [
    {
      path: "../../public/fonts/Boska-Variable.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Boska-VariableItalic.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  variable: "--font-boska",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://renehealth.ca",
  ),
  title: {
    default: "Rene Health Clinic | Counselling & Physical Health in Coquitlam",
    template: "%s",
  },
  description:
    "Rene Health brings counselling and physical health services together in one Coquitlam clinic. Care for your mind and body, so you can feel stronger, steadier, and more like yourself.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { settings, menus } = await getSiteChrome();

  return (
    <html lang="en" className={boska.variable}>
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Header menus={menus} settings={settings} />
          <IntroProvider>
            <BookButton booking={settings.booking} />
            {children}
          </IntroProvider>
          <ScrollScene exit={false}>
            <Footer settings={settings} menus={menus} />
          </ScrollScene>
        </SmoothScroll>
      </body>
    </html>
  );
}
