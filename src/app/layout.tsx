import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./fontawesome-brands.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import IntroProvider from "@/components/providers/IntroProvider";
import ScrollScene from "@/components/ui/ScrollScene";
import Header from "@/components/layout/Header";
import BookButton from "@/components/layout/BookButton";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import { getSiteChrome } from "@/lib/wp";
import type { SiteIcon } from "@/lib/types/common";

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

// Shipped in /public so an empty (or unreachable) CMS field still yields an icon.
const FALLBACK_FAVICON = { url: "/favicon.ico", sizes: "any" };

const descriptor = (icon: SiteIcon) => ({
  url: icon.url,
  ...(icon.type ? { type: icon.type } : null),
  ...(icon.sizes ? { sizes: icon.sizes } : null),
});

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteChrome();
  const { favicon } = settings;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://renehealth.ca",
    ),
    title: {
      default:
        "Rene Health Clinic | Counselling & Physical Health in Coquitlam",
      template: "%s",
    },
    description:
      "Rene Health brings counselling and physical health services together in one Coquitlam clinic. Care for your mind and body, so you can feel stronger, steadier, and more like yourself.",
    icons: {
      icon: [favicon ? descriptor(favicon) : FALLBACK_FAVICON],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { settings, menus } = await getSiteChrome();

  return (
    <html lang="en" className={boska.variable}>
      <body suppressHydrationWarning>
	  {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18328119686"
          strategy="afterInteractive"
        />

        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18328119686');

            gtag('config', 'AW-18328119686/RuMMCPv-8NUcEIbTw6NE', {
              'phone_conversion_number': '604-554-2620'
            });
          `}
        </Script>
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
