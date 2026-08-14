"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button, { FOCUS_RING } from "@/components/ui/Button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
import TiltCard from "@/components/ui/TiltCard";
import TeamPopup from "@/components/sections/TeamPopup";
import { useRailScrollChain } from "@/lib/useRailScrollChain";
import { bookNowCta } from "@/lib/format";

export type ImageDataType = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type CtaDataType = {
  label?: string;
  href?: string;
  target?: string;
};

export type TeamCategoryOptionType = {
  id?: string;
  label?: string;
};

export type TeamPopupDataType = {
  title?: string;
  designation?: string;
  image?: ImageDataType | null;
  introduction?: string;
  buttonUrl?: string;
};

export type TeamMemberItemType = {
  id?: string;
  name?: string;
  role?: string;
  bio?: string;
  category?: string;
  image?: ImageDataType | null;
  popup?: TeamPopupDataType;
};

export type TeamSectionDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaDataType | null;
  categories?: TeamCategoryOptionType[];
  members?: TeamMemberItemType[];
};

export type TeamPropsType = {
  content?: TeamSectionDataType;
  scroll?: boolean;
  tabs?: boolean;
  centered?: boolean;
  className?: string;
};

function TickRing({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const ticks = 80;
  return (
    <motion.div
      className="absolute inset-0"
      style={{ transformOrigin: "50% 50%", willChange: "transform" }}
      animate={reduce ? undefined : { rotate: index % 2 === 0 ? 360 : -360 }}
      transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {Array.from({ length: ticks }).map((_, i) => {
          const a = (i / ticks) * Math.PI * 2;
          const x1 = (50 + Math.sin(a) * 49).toFixed(3);
          const y1 = (50 - Math.cos(a) * 49).toFixed(3);
          const x2 = (50 + Math.sin(a) * 47.5).toFixed(3);
          const y2 = (50 - Math.cos(a) * 47.5).toFixed(3);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#9db0b1"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

const SCROLL_AFTER = 4;

const ALL_CATEGORY = { id: "all", label: "All" };

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={
          direction === "left"
            ? "M10 3.5 5.5 8l4.5 4.5"
            : "M6 3.5 10.5 8 6 12.5"
        }
      />
    </svg>
  );
}

function CategoryTabs({
  categories,
  active,
  onSelect,
}: {
  categories: TeamCategoryOptionType[];
  active: string;
  onSelect: (id: string) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const scrolls = categories.length > SCROLL_AFTER;
  const [edges, setEdges] = useState({ start: false, end: false });

  const readEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft > 4, end: el.scrollLeft < max - 4 });
  }, []);

  useEffect(() => {
    if (!scrolls) return;
    const el = railRef.current;
    if (!el) return;

    readEdges();
    const observer = new ResizeObserver(readEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [scrolls, readEdges, categories.length]);

  const nudge = (direction: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const renderButton = (t: TeamCategoryOptionType) => {
    const id = t?.id ?? "";
    const label = t?.label ?? "";

    return (
      <button
        key={id}
        type="button"
        onClick={() => onSelect(id)}
        aria-pressed={active === id}
        className={`btn-3d inline-flex min-h-[44px] min-w-[135px] shrink-0 cursor-pointer items-center justify-center rounded-full border px-6 py-[9px] text-sm transition-all duration-400 ${
          active === id
            ? "border-ink text-ink"
            : "border-line text-slate-body hover:border-slate-body"
        }`}
      >
        {label}
      </button>
    );
  };

  if (!scrolls) {
    return (
      <div className="flex flex-wrap gap-3">
        {categories.map((t) => renderButton(t))}
      </div>
    );
  }

  const renderArrow = (direction: "left" | "right", enabled: boolean) => (
    <button
      type="button"
      onClick={() => nudge(direction === "left" ? -1 : 1)}
      disabled={!enabled}
      aria-label={
        direction === "left"
          ? "Scroll categories left"
          : "Scroll categories right"
      }
      className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 hover:border-slate-body disabled:pointer-events-none disabled:opacity-30 md:inline-flex"
    >
      <ChevronIcon direction={direction} />
    </button>
  );

  return (
    <div className="flex items-center gap-2">
      {renderArrow("left", edges.start)}

      <div className="relative min-w-0 flex-1">
        <div
          ref={railRef}
          onScroll={readEdges}
          data-lenis-prevent
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth py-1"
        >
          {categories.map((t) => renderButton(t))}
        </div>

        {edges.start ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-mist to-transparent md:hidden"
          />
        ) : null}
        {edges.end ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-mist to-transparent md:hidden"
          />
        ) : null}
      </div>

      {renderArrow("right", edges.end)}
    </div>
  );
}

export default function Team({
  content,
  scroll = false,
  tabs = true,
  centered = false,
  className = "",
}: TeamPropsType) {
  const typedContent = content;

  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const cta = typedContent?.cta ?? null;
  const categories = typedContent?.categories ?? [];
  const membersList = typedContent?.members ?? [];

  const [tab, setTab] = useState(ALL_CATEGORY.id);
  const [progress, setProgress] = useState(0);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const members =
    scroll || !tabs || tab === ALL_CATEGORY.id
      ? membersList
      : membersList.filter((m) => m?.category === tab);

  const openMemberPopup = (member: TeamMemberItemType) => {
    const memberName = member?.name ?? "";
    const memberRole = member?.role ?? "";
    const memberBio = member?.bio ?? "";
    const memberId = member?.id ?? "";

    const image = member?.image ?? {
      src: "",
      alt: "",
      width: 100,
      height: 100,
    };

    const popup = member?.popup ?? {
      title: memberName,
      designation: memberRole,
      image,
      introduction: memberBio,
    };

    setSelectedMember({
      id: memberId,
      name: memberName,
      role: memberRole,
      description: memberBio,
      image,
      profileUrl: "",
      popup,
    });
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const max = scrollWidth - clientWidth;
    setProgress(max > 0 ? scrollLeft / max : 0);
  };

  useRailScrollChain(trackRef, scroll);

  return (
    <section className={`bg-mist px-5 py-10 md:px-6 md:py-24 ${className}`}>
      <div className="mx-auto max-w-[1400px]">
        <div
          className={
            centered
              ? "flex flex-col items-center text-center"
              : "flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          }
        >
          <div className="max-w-xl">
            <Reveal from={centered ? undefined : "left"}>
              <p className="section-label">{label}</p>
            </Reveal>
            <SplitReveal
              delay={0.1}
              className="display-serif mt-1 text-[30px] md:text-[50px]"
            >
              {heading}
            </SplitReveal>
            <Reveal delay={0.2} from={centered ? undefined : "left"}>
              <RichText html={paragraph} className="mt-1 leading-[normal]" />
            </Reveal>
          </div>

          {scroll || !tabs || categories.length === 0 ? null : (
            <Reveal delay={0.25} className="min-w-0 md:max-w-[560px]">
              <CategoryTabs
                categories={[ALL_CATEGORY, ...categories]}
                active={tab}
                onSelect={setTab}
              />
            </Reveal>
          )}
        </div>

        <div
          ref={trackRef}
          data-lenis-prevent-touch={scroll || undefined}
          onScroll={scroll ? onScroll : undefined}
          className={
            scroll
              ? "no-scrollbar -mx-5 -my-6 mt-4 overflow-x-auto px-5 py-6 md:-mx-6 md:mt-19 md:px-6"
              : "mt-10 md:mt-25"
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={scroll ? "all" : tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.3 }}
              className={
                scroll
                  ? "flex snap-x snap-mandatory items-stretch gap-2"
                  : centered
                    ? "flex flex-wrap items-stretch justify-center gap-2"
                    : "grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
              }
            >
              {members.map((member, i) => {
                const memberId = member?.id ?? i.toString();
                const memberName = member?.name ?? "";
                const memberRole = member?.role ?? "";
                const memberBio = member?.bio ?? "";
                const memberImageSrc = member?.image?.src ?? "";
                const memberImageAlt = member?.image?.alt || memberName;
                const booking = bookNowCta(member?.popup?.buttonUrl);

                return (
                  <motion.div
                    key={memberId}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.08,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                    className={
                      scroll
                        ? "flex h-full w-[280px] shrink-0 snap-start sm:w-[340px]"
                        : centered
                          ? "flex h-full w-full sm:w-[345px]"
                          : "h-full"
                    }
                    style={scroll || centered ? { display: "flex" } : undefined}
                  >
                    <TiltCard
                      as="article"
                      role="button"
                      tabIndex={0}
                      aria-label={`Meet ${memberName}`}
                      onClick={() => openMemberPopup(member)}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter" && e.key !== " ") return;
                        e.preventDefault();
                        openMemberPopup(member);
                      }}
                      className={`group flex h-full w-full cursor-pointer flex-col rounded-[12px] bg-foam px-[22px] pt-[10px] pb-[18px] ${FOCUS_RING}`}
                    >
                      <div className="relative mx-auto aspect-square w-full max-w-[310px]">
                        <TickRing index={i} />
                        <div className="absolute inset-[4.5%] overflow-hidden rounded-full">
                          {memberImageSrc ? (
                            <Image
                              src={memberImageSrc}
                              alt={memberImageAlt}
                              fill
                              sizes="300px"
                              className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            />
                          ) : null}
                        </div>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-3.5 right-3.5 flex h-[75px] w-[75px] flex-col items-center justify-center gap-0.5 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(255,255,255,0.15),0_8px_24px_-6px_rgba(20,41,43,0.35)] backdrop-blur-[3px] transition-transform duration-500 group-hover:scale-110"
                        >
                          <Image
                            src="/images/teams-arrow.svg"
                            alt=""
                            width={13}
                            height={13}
                            className="opacity-80"
                          />
                          <span className="text-[13px] leading-[normal]">
                            meet
                          </span>
                        </span>
                      </div>
                      <h3 className="display-serif mt-[17px] text-[25px]">
                        {memberName}
                      </h3>
                      <p className="text-[14px] leading-[normal] opacity-50">
                        {memberRole}
                      </p>
                      <RichText
                        html={memberBio}
                        className="mt-4 text-[16px] leading-[normal] [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden"
                      />
                      {booking ? (
                        <div
                          className="mt-auto pt-5"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <Button
                            cta={booking}
                            variant="solid"
                            className="w-full"
                            size="sm"
                          />
                        </div>
                      ) : null}
                    </TiltCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {scroll ? (
          <div
            aria-hidden="true"
            className="mt-2 h-[3px] w-[240px] overflow-hidden rounded-full bg-aqua/25 sm:w-[350px]"
          >
            <div
              className="h-full rounded-full bg-aqua transition-[width] duration-150 ease-out"
              style={{ width: `${25 + progress * 75}%` }}
            />
          </div>
        ) : null}

        {cta && !scroll ? (
          <Reveal className="mt-12 text-center">
            <Button
              cta={cta}
              variant="solid"
              size="sm"
              className="font-regular"
            />
          </Reveal>
        ) : null}
      </div>
      <TeamPopup
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}
