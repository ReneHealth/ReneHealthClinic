"use client";

import { type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import RichText from "@/components/ui/RichText";
import { getLenis } from "@/lib/lenis";
import type { NavLink, SiteMenus, SiteSettings } from "@/lib/types";

const FAQ_ID = "faq";

const isFaqLink = (href: string) => href.split("?")[0].endsWith(`#${FAQ_ID}`);

const onFaqClick = (e: MouseEvent<HTMLAnchorElement>) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const target = document.getElementById(FAQ_ID);
  if (!target) return;

  e.preventDefault();
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target);
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

interface FooterProps {
  settings: SiteSettings;
  menus: SiteMenus;
}

function splitInHalf(links: NavLink[]): [NavLink[], NavLink[]] {
  const half = Math.ceil(links.length / 2);
  return [links.slice(0, half), links.slice(half)];
}

export default function Footer({ settings, menus }: FooterProps) {
  const [bottomLeft, bottomRight] = splitInHalf(menus.footerBottom);

  return (
    <footer className="relative overflow-hidden bg-pine text-white">
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-6 pb-5 md:pb-10 pt-10 md:pt-24 lg:px-10">
        {settings.footerLogo ? (
          <Image
            src={settings.footerLogo.src}
            alt={settings.footerLogo.alt || "Rene Health Clinic"}
            width={settings.footerLogo.width}
            height={settings.footerLogo.height}
            className="mx-auto h-[90px] w-auto brightness-0 invert lg:mx-0"
          />
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 md:gap-y-12 lg:grid-cols-[2.73fr_auto_auto_auto_auto] lg:justify-between lg:gap-14">
          <div className="col-span-2 lg:col-span-1">
            <RichText
              html={settings.footerLogoContent}
              className="mx-auto max-w-xs text-center text-[16px] leading-[normal] text-white lg:mx-0 lg:text-left"
            />
            <form className="mt-8 lg:max-w-sm">
              <div className="flex items-center border-b border-white/30 transition-colors duration-300 focus-within:border-aqua">
                <input
                  type="email"
                  required
                  name="email"
                  autoComplete="email"
                  placeholder="Your email here"
                  aria-label="Email for updates"
                  className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/50"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="btn-3d touch-target p-2"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 fill-none stroke-white stroke-[1.5]"
                  >
                    <path d="M3 13 13 3M5 3h8v8" />
                  </svg>
                </button>
              </div>
              <RichText
                html={settings.newsletterNote}
                className="mt-4 text-[10px] leading-[normal] text-white/40"
              />
            </form>
          </div>

          <div>
            <h3 className="display-serif text-[25px]">{settings.hoursTitle}</h3>
            <ul className="mt-3 space-y-4 text-sm">
              {settings.hours.map((h, i) => (
                <li key={i}>
                  <p className="text-white">{h.days}</p>
                  <p className="text-white/60">{h.time}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="display-serif text-[25px]">{settings.visitTitle}</h3>
            <RichText
              html={settings.address}
              as="p"
              className="mt-3 text-sm text-white/80"
            />
            <h3 className="display-serif mt-5 text-[25px]">
              {settings.contactTitle}
            </h3>
            <p className="mt-3 text-sm text-white/80">
              {settings.phone ? (
                <a
                  href={settings.phoneHref}
                  className="touch-target hover:text-aqua"
                >
                  {settings.phone}
                </a>
              ) : null}
              {settings.phone && settings.email ? <br /> : null}
              {settings.email ? (
                <span className="inline-flex items-center gap-2 md:gap-10">
                  <a
                    href={`mailto:${settings.email}`}
                    className="touch-target underline underline-offset-4 hover:text-aqua"
                  >
                    {settings.email}
                  </a>
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 fill-none stroke-white stroke-[1.5]"
                  >
                    <path d="M3 13 13 3M5 3h8v8" />
                  </svg>
                </span>
              ) : null}
            </p>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="display-serif text-[25px]">
              {settings.exploreTitle}
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-sm lg:block lg:space-y-px">
              {menus.footerExplore.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    target={link.target}
                    onClick={isFaqLink(link.href) ? onFaqClick : undefined}
                    rel={
                      link.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="btn-3d touch-target inline-block text-white/70 transition-colors duration-300 hover:text-aqua"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {settings.socialFacebook || settings.socialInstagram ? (
            <div>
              <h3 className="display-serif text-[25px]">
                {settings.socialTitle}
              </h3>
              <div className="mt-3 flex items-center gap-4 text-lg">
                {settings.socialFacebook ? (
                  <a
                    href={settings.socialFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="touch-target text-white/70 transition-colors duration-300 hover:text-aqua"
                  >
                    <i className="fa-brands fa-facebook" aria-hidden="true" />
                  </a>
                ) : null}
                {settings.socialInstagram ? (
                  <a
                    href={settings.socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="touch-target text-white/70 transition-colors duration-300 hover:text-aqua"
                  >
                    <i className="fa-brands fa-instagram" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-1 md:mt-16 flex flex-col md:gap-4 text-[14px] md:font-medium normal-case md:mt-32 md:flex-row md:justify-between md:uppercase">
          {[bottomLeft, bottomRight].map((group, i) => (
            <nav
              key={i}
              className="grid grid-cols-2 gap-x-6 md:gap-y-2 md:flex md:flex-wrap md:gap-x-8"
            >
              {group.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  target={link.target}
                  onClick={isFaqLink(link.href) ? onFaqClick : undefined}
                  rel={
                    link.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className="btn-3d touch-target inline-block text-white/70 md:text-white/80 md:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </div>

      {settings.footerWordmark ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 select-none overflow-hidden md:bottom-0">
          <motion.p
            initial={{ y: "45%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
            className="display-serif whitespace-nowrap text-center text-[16vw] leading-[0.92] text-white/10 md:text-[255px] md:leading-[243px]"
          >
            {settings.footerWordmark}
          </motion.p>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-6 pb-[7px] pt-16 text-center text-[13px] text-white/50 md:flex-row md:pt-44 md:text-left md:text-[14px] lg:px-10">
        <p>
          © {new Date().getFullYear()} Rene Health Clinic. All rights reserved.
        </p>
        <p>
          Designed &amp; Developed by{" "}
          <a
            href="https://www.nirvanacanada.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target font-bold text-white"
          >
            Nirvana <span className="text-[#3381FF]">Canada</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
