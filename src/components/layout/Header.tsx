"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import type { NavLink, SiteMenus, SiteSettings } from "@/lib/types";
import RichText from "@/components/ui/RichText";

const EASE = [0.16, 1, 0.3, 1] as const;

const MENU_SURFACE = "#e6efed";

const DOOR_IN = 0.9;

const OPEN_ANGLE = 90;

const DOOR_EASE = [0.7, 0, 0.3, 1] as const;

const LEAF_OVERLAP = 0.4;

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-mist";

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-full w-full fill-none stroke-current ${className ?? ""}`}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean): string {
  return `btn-3d group relative inline-flex items-center gap-1.5 rounded-sm text-[14px] ${active ? "font-medium text-white" : "font-normal text-white/90"} tracking-[0.12em] uppercase transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent`;
}

function navUnderlineClass(active: boolean): string {
  return `absolute -bottom-1 left-0 h-px w-full origin-right ${active ? "scale-x-100 origin-left" : "scale-x-0"} bg-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100`;
}

function NavDropdown({
  link,
  align,
  pathname,
}: {
  link: NavLink;
  align: "left" | "right";
  pathname: string;
}) {
  const children = link.children ?? [];
  const sectionActive =
    isActive(pathname, link.href) ||
    children.some((child) => isActive(pathname, child.href));
  const sideClass = align === "left" ? "left-0" : "right-0";
  const caretSideClass = align === "left" ? "left-8" : "right-8";
  const originClass = align === "left" ? "origin-top-left" : "origin-top-right";
  const itemClosedX = align === "left" ? "-translate-x-2" : "translate-x-2";

  return (
    <div className="group/nav relative">
      <Link
        href={link.href}
        className={navLinkClass(sectionActive)}
        aria-haspopup="true"
        aria-current={sectionActive ? "page" : undefined}
      >
        {link.label}
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className="h-[5px] w-[9px] fill-none stroke-current opacity-70 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/nav:translate-y-[2px]"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
        <span className={navUnderlineClass(sectionActive)} />
      </Link>

      <div
        className={`pointer-events-none absolute top-full z-50 ${sideClass} pt-5 opacity-0 transition-opacity duration-300 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-focus-within/nav:pointer-events-auto group-focus-within/nav:opacity-100`}
      >
        <span
          aria-hidden
          className={`absolute top-[14px] h-3 w-3 ${caretSideClass} rotate-45 rounded-[3px] border-l border-t border-white/15 bg-pine/85 backdrop-blur-2xl`}
        />
        <div
          className={`relative ${originClass} [transform:perspective(1000px)_rotateX(-16deg)_translateY(-10px)_scale(0.95)] overflow-hidden rounded-[22px] border border-white/15 bg-pine/85 p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-[650ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/nav:[transform:perspective(1000px)_rotateX(0deg)_translateY(0px)_scale(1)] group-focus-within/nav:[transform:perspective(1000px)_rotateX(0deg)_translateY(0px)_scale(1)] ${
            children.length > 5
              ? "w-[500px] [--cols:2]"
              : "w-[280px] [--cols:1]"
          }`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-aqua/25 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-aqua/70 to-transparent"
          />

          <p className="section-label relative px-2.5 pt-1 pb-2.5 !text-aqua/80">
            Explore {link.label}
          </p>
          <div className="relative mb-1 h-px w-full bg-white/10" />

          <div className="relative grid grid-cols-[repeat(var(--cols),minmax(0,1fr))]">
            {children.map((child, i) => {
              const childActive = isActive(pathname, child.href);
              return (
                <Link
                  key={child.id}
                  href={child.href}
                  target={child.target}
                  rel={
                    child.target === "_blank"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-current={childActive ? "page" : undefined}
                  style={{ transitionDelay: `${90 + i * 35}ms` }}
                  className={`group/item flex items-center gap-3 rounded-[14px] px-3.5 py-[11px] text-[14px] leading-tight opacity-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.07] hover:text-white group-hover/nav:translate-x-0 group-hover/nav:opacity-100 group-focus-within/nav:translate-x-0 group-focus-within/nav:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aqua/70 ${itemClosedX} ${childActive ? "bg-white/[0.07] text-white" : "text-white/65"}`}
                >
                  <span
                    aria-hidden
                    className={`h-px w-3 shrink-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/item:w-5 group-hover/item:bg-aqua group-hover/item:shadow-[0_0_10px_1px_rgba(129,219,219,0.55)] ${childActive ? "w-5 bg-aqua shadow-[0_0_10px_1px_rgba(129,219,219,0.55)]" : "bg-white/30"}`}
                  />
                  <span className="flex-1 whitespace-nowrap">
                    {child.label}
                  </span>
                  {childActive ? null : (
                    <span
                      aria-hidden
                      className="h-3.5 w-3.5 shrink-0 -translate-x-1.5 text-aqua opacity-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-0 group-hover/item:opacity-100"
                    >
                      <ArrowUpRight />
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavGroup({
  links,
  className,
  align,
  pathname,
}: {
  links: NavLink[];
  className?: string;
  align: "left" | "right";
  pathname: string;
}) {
  return (
    <nav className={className}>
      {links.map((link) => {
        if (link.children?.length) {
          return (
            <NavDropdown
              key={link.id}
              link={link}
              align={align}
              pathname={pathname}
            />
          );
        }
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.id}
            href={link.href}
            target={link.target}
            rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
            aria-current={active ? "page" : undefined}
            className={navLinkClass(active)}
          >
            {link.label}
            <span className={navUnderlineClass(active)} />
          </Link>
        );
      })}
    </nav>
  );
}

function NavBar({
  left,
  right,
  logo,
  pathname,
}: {
  left: NavLink[];
  right: NavLink[];
  logo: SiteSettings["headerLogo"];
  pathname: string;
}) {
  return (
    <div className="mx-auto grid h-30 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10">
      <NavGroup
        links={left}
        align="left"
        pathname={pathname}
        className="col-start-1 hidden items-center gap-8 lg:flex"
      />

      <Link
        href="/"
        aria-label="Rene Health Clinic home"
        className={`col-start-2 justify-self-center rounded-sm ${FOCUS_RING} focus-visible:ring-white focus-visible:ring-offset-transparent`}
      >
        {logo ? (
          <Image
            src={logo.src}
            alt={logo.alt || "Rene Health Clinic"}
            width={logo.width}
            height={logo.height}
            priority
            className="h-25 w-auto rounded-full"
          />
        ) : null}
      </Link>

      <NavGroup
        links={right}
        align="right"
        pathname={pathname}
        className="col-start-3 hidden items-center justify-end gap-8 lg:flex"
      />
    </div>
  );
}

function MenuButton({
  open,
  onToggle,
  buttonRef,
  headerRef,
}: {
  open: boolean;
  onToggle: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
  headerRef: RefObject<HTMLElement | null>;
}) {
  const [past, setPast] = useState(false);
  const [belowLg, setBelowLg] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setBelowLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const header = headerRef.current;
    const threshold = header
      ? header.offsetTop + header.offsetHeight
      : window.innerHeight * 0.9;
    setPast(latest > threshold);
  });

  const visible = belowLg || past || open;

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-menu"
      onClick={onToggle}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: reduce ? 0 : visible ? 0 : -12,
        rotateY: reduce ? 0 : open ? 180 : 0,
      }}
      whileHover={reduce ? undefined : { rotateX: -10, scale: 1.06 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        pointerEvents: visible ? "auto" : "none",
        transformPerspective: 500,
      }}
      className={`fixed right-5 top-5 z-[60] flex h-14 w-14 flex-col items-center justify-center gap-1.5 rounded-full bg-aqua text-ink shadow-[0_6px_20px_-6px_rgba(20,41,43,0.45)] transition-colors duration-300 hover:bg-aqua-soft md:right-8 ${FOCUS_RING}`}
    >
      <span
        className={`h-px w-6 bg-ink transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
      />
      <span
        className={`h-px w-6 bg-ink transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
      />
    </motion.button>
  );
}

function YouAreHereTag() {
  return (
    <span className="section-label !text-teal-ink shrink-0 whitespace-nowrap !text-[12px] !font-bold !leading-[normal]">
      [ you are here ]
    </span>
  );
}

function MenuLink({
  link,
  index,
  onClose,
  reduce,
  pathname,
}: {
  link: NavLink;
  index: number;
  onClose: () => void;
  reduce: boolean | null;
  pathname: string;
}) {
  const delay = reduce ? 0 : DOOR_IN + 0.1 + index * 0.06;
  const active = isActive(pathname, link.href);
  return (
    <div className="border-b border-line/60 first:border-t">
      <Link
        href={link.href}
        target={link.target}
        rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={onClose}
        aria-current={active ? "page" : undefined}
        className={`group flex items-center justify-between gap-6 py-4 md:py-[1.15rem] ${FOCUS_RING} focus-visible:ring-offset-2`}
      >
        <span className="flex items-baseline gap-3">
          <span className="block overflow-hidden py-[0.08em] pb-[0.15em]">
            <motion.span
              initial={reduce ? { opacity: 0 } : { y: "115%", rotateX: -75 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ delay, duration: 0.75, ease: EASE }}
              style={{ transformPerspective: 600, transformOrigin: "50% 100%" }}
              className={`display-serif block text-[30px] leading-[1.05] transition-[color,padding-left] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:pl-3 group-hover:text-pine-soft group-focus-visible:pl-3 group-focus-visible:text-pine-soft md:text-[50px] ${active ? "text-ink" : "text-ink/35"}`}
            >
              {link.label}
            </motion.span>
          </span>
          {active ? <YouAreHereTag /> : null}
        </span>
        <span
          aria-hidden
          className="h-5 w-5 shrink-0 translate-x-[-10px] text-teal-ink opacity-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:h-6 md:w-6"
        >
          <ArrowUpRight />
        </span>
      </Link>

      {link.children?.length ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.12, duration: 0.6, ease: EASE }}
          className="grid grid-cols-1 gap-x-8 gap-y-0 pb-4 sm:grid-cols-2"
        >
          {link.children.map((child) => {
            const childActive = isActive(pathname, child.href);
            return (
              <Link
                key={child.id}
                href={child.href}
                target={child.target}
                rel={
                  child.target === "_blank" ? "noopener noreferrer" : undefined
                }
                onClick={onClose}
                aria-current={childActive ? "page" : undefined}
                className={`group/sub touch-target flex items-center gap-2.5 rounded-lg py-[7px] text-[15px] transition-colors duration-300 hover:text-pine-soft ${FOCUS_RING} focus-visible:ring-offset-2 ${childActive ? "text-ink font-medium" : "text-slate-body"}`}
              >
                <span
                  aria-hidden
                  className={`h-px w-3 shrink-0 bg-current transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/sub:w-6 group-hover/sub:opacity-100 group-focus-visible/sub:w-6 ${childActive ? "w-6 opacity-100" : "opacity-50"}`}
                />
                {child.label}
                {childActive ? <YouAreHereTag /> : null}
              </Link>
            );
          })}
        </motion.div>
      ) : null}
    </div>
  );
}

function MenuOverlay({
  onClose,
  overlayRef,
  fullscreenLinks,
  settings,
  pathname,
}: {
  onClose: () => void;
  overlayRef: RefObject<HTMLDivElement | null>;
  fullscreenLinks: NavLink[];
  settings: SiteSettings;
  pathname: string;
}) {
  const reduce = useReducedMotion();

  const railIn = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: reduce ? 0 : DOOR_IN + delay,
      duration: 0.7,
      ease: EASE,
    },
  });

  const leafVariants = {
    hidden: (dir: number) =>
      reduce ? { opacity: 0 } : { rotateY: dir * OPEN_ANGLE, opacity: 0 },
    visible: reduce
      ? { opacity: 1, transition: { duration: 0.25 } }
      : {
          rotateY: 0,
          opacity: 1,
          transition: {
            rotateY: { duration: DOOR_IN, ease: DOOR_EASE },
            opacity: { duration: 0.3, ease: "linear" },
          },
        },
    exit: (dir: number) =>
      reduce
        ? { opacity: 0, transition: { duration: 0.2 } }
        : {
            rotateY: dir * OPEN_ANGLE,
            opacity: 0,
            transition: {
              rotateY: { delay: 0.2, duration: 0.9, ease: DOOR_EASE },
              opacity: { delay: 0.85, duration: 0.25, ease: "linear" },
            },
          },
  };

  const contentVariants = {
    hidden: { opacity: 0, pointerEvents: "none" as const },
    visible: {
      opacity: 1,
      pointerEvents: "auto" as const,
      transition: { delay: reduce ? 0 : DOOR_IN, duration: 0 },
    },
    exit: {
      opacity: 0,
      pointerEvents: "none" as const,
      transition: { duration: reduce ? 0.15 : 0.24, ease: EASE },
    },
  };

  return (
    <motion.div
      ref={overlayRef}
      id="site-menu"
      variants={{ hidden: {}, visible: {}, exit: {} }}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ perspective: "2800px" }}
      className="fixed inset-0 z-50"
    >
      {([1, -1] as const).map((dir) => (
        <motion.div
          key={dir}
          custom={dir}
          variants={leafVariants}
          style={{
            transformOrigin: dir === 1 ? "left center" : "right center",
            backgroundColor: MENU_SURFACE,
            [dir === 1 ? "left" : "right"]: 0,
            width: `${50 + LEAF_OVERLAP}%`,
            willChange: "transform",
          }}
          className="absolute inset-y-0"
        />
      ))}

      <motion.div variants={contentVariants} className="absolute inset-0">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(58%_44%_at_100%_0%,rgba(129,219,219,0.22),transparent_60%)]" />

        <div
          data-lenis-prevent
          className="absolute inset-0 overflow-y-auto overscroll-contain"
        >
          <div className="relative mx-auto flex min-h-svh max-w-[1400px] flex-col px-6 pt-15 md:pt-28 pb-16 md:px-10 lg:pt-32">
            <motion.span
              {...railIn(0.05)}
              className="section-label !text-pine-soft !font-bold"
            >
              Menu
            </motion.span>

            <div className="mt-10 grid gap-14 lg:mt-14 lg:my-auto lg:grid-cols-[1.5fr_1fr] lg:gap-20 [align-items:self-start]">
              <nav aria-label="Primary" className="flex flex-col">
                {fullscreenLinks.map((link, i) => (
                  <MenuLink
                    key={link.id}
                    link={link}
                    index={i}
                    onClose={onClose}
                    reduce={reduce}
                    pathname={pathname}
                  />
                ))}
              </nav>

              <div className="flex flex-col gap-10 md:sticky md:top-52">
                <motion.div {...railIn(0.24)} className="flex flex-col gap-2">
                  <p className="section-label !text-pine-soft !font-bold mb-1">
                    {settings.menu.contactTitle}
                  </p>
                  {settings.menu.email ? (
                    <a
                      href={`mailto:${settings.menu.email}`}
                      className={`touch-target w-fit rounded-sm text-[17px] text-ink transition-colors duration-300 hover:text-pine-soft ${FOCUS_RING}`}
                    >
                      {settings.menu.email}
                    </a>
                  ) : null}
                  {settings.menu.phone ? (
                    <a
                      href={settings.menu.phoneHref}
                      className={`touch-target w-fit rounded-sm text-[17px] text-ink transition-colors duration-300 hover:text-pine-soft ${FOCUS_RING}`}
                    >
                      {settings.menu.phone}
                    </a>
                  ) : null}
                  <RichText
                    html={settings.menu.address}
                    as="p"
                    className="mt-1 text-[15px] leading-relaxed text-slate-body"
                  />
                </motion.div>

                <motion.dl
                  {...railIn(0.32)}
                  className="flex flex-col gap-1.5 border-t border-line/70 pt-6"
                >
                  <p className="section-label !text-pine-soft !font-bold mb-1">
                    {settings.menu.hoursTitle}
                  </p>
                  {settings.menu.hours.map((h, i) => (
                    <div
                      key={i}
                      className="flex justify-between gap-6 text-[15px] text-slate-body"
                    >
                      <dt>{h.days}</dt>
                      <dd className="text-ink">{h.time}</dd>
                    </div>
                  ))}
                </motion.dl>

                <motion.div {...railIn(0.4)}>
                  <Link
                    href={settings.menu.booking.href}
                    target={settings.menu.booking.target}
                    rel={
                      settings.menu.booking.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={onClose}
                    className={`btn-3d w-full justify-between md:w-fit group inline-flex items-center gap-5 rounded-full bg-ink py-2 pr-2 pl-7 text-mist shadow-[0_18px_40px_-20px_rgba(20,41,43,0.7)] transition-colors duration-500 hover:bg-pine-soft ${FOCUS_RING}`}
                  >
                    <span className="text-[15px] font-medium tracking-[0.02em]">
                      {settings.menu.booking.label}
                    </span>
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-aqua text-ink">
                      <span className="absolute h-[18px] w-[18px] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:opacity-0">
                        <ArrowUpRight />
                      </span>
                      <span className="absolute h-[18px] w-[18px] -translate-x-4 translate-y-4 opacity-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight />
                      </span>
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface HeaderProps {
  menus: SiteMenus;
  settings: SiteSettings;
}

export default function Header({ menus, settings }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;
    const { style } = document.documentElement;
    const previous = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const overlay = overlayRef.current;
      const toggle = buttonRef.current;
      if (!overlay || !toggle) return;
      const nodes = [
        toggle,
        ...overlay.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      ];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (!(active instanceof HTMLElement) || !nodes.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {settings.marquee ? (
        <div className="relative z-30 bg-aqua-soft py-2.5">
          <RichText
            as="p"
            html={settings.marquee}
            className="hidden text-center text-[0.8125rem] font-medium text-ink md:block"
          />
          <div className="overflow-hidden md:hidden">
            <div className="flex w-max animate-marquee whitespace-nowrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <RichText
                  key={i}
                  as="span"
                  html={settings.marquee}
                  className="px-6 text-[14px] font-normal text-ink"
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <header ref={headerRef} className="absolute inset-x-0 z-40">
        <NavBar
          left={menus.headerDesktopLeft}
          right={menus.headerDesktopRight}
          logo={settings.headerLogo}
          pathname={pathname}
        />
      </header>

      <MenuButton
        open={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
        buttonRef={buttonRef}
        headerRef={headerRef}
      />

      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay
            onClose={() => setMenuOpen(false)}
            overlayRef={overlayRef}
            fullscreenLinks={menus.menuFullscreen}
            settings={settings}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
}
