"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";
import { prefersReducedMotion } from "@/lib/motion";

export type StepScrollerStepType = {
  title?: string;
  description?: string;
  image?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
};

export type StepScrollerDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  steps?: StepScrollerStepType[];
};

export type StepScrollerPropsType = {
  content?: StepScrollerDataType;
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

const CARD_HEIGHTS = [
  "md:h-[210px]",
  "md:h-[260px]",
  "md:h-[310px]",
  "md:h-[360px]",
];

export default function StepScroller({
  content,
  className = "",
}: StepScrollerPropsType) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);

  const typedContent = content;

  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const steps = (
    Array.isArray(typedContent?.steps) ? typedContent.steps : []
  ) as StepScrollerStepType[];
  const total = steps.length;

  useGSAP(
    () => {
      const nums = gsap.utils.toArray<HTMLElement>(".step-num");
      const cards = gsap.utils.toArray<HTMLElement>(".step-card");

      const setActive = (active: number) => {
        if (activeRef.current) {
          activeRef.current.textContent = pad(active + 1);
        }
        nums.forEach((num, i) => {
          const step = i + 2;
          const collapse = step !== total && step <= active + 1;
          num.style.width = collapse ? "0px" : "38px";
          num.style.opacity = collapse ? "0" : "1";
          num.style.marginLeft = collapse ? "0px" : i === 0 ? "0px" : "-8px";
        });
      };

      if (prefersReducedMotion()) {
        const track = trackRef.current;
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        if (!track) return;

        const onScroll = () => {
          const max = track.scrollWidth - track.clientWidth;
          const progress = max > 0 ? track.scrollLeft / max : 0;
          setActive(Math.min(total - 1, Math.round(progress * (total - 1))));
        };
        track.addEventListener("scroll", onScroll, { passive: true });
        return () => track.removeEventListener("scroll", onScroll);
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const row = rowRef.current;
        const track = trackRef.current;
        if (!row || !track) return;

        row.style.willChange = "transform";

        const drift = gsap.to(row, {
          x: () => -(row.scrollWidth - track.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${total * 70}%`,
            pin: true,
            anticipatePin: 0.5,

            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActive(Math.min(total - 1, Math.floor(self.progress * total)));
            },
          },
        });

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 56, scale: 0.92, rotate: 1.5 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: drift,
                start: "left 96%",
                end: "left 62%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );

          gsap.fromTo(
            card,

            { backgroundColor: "rgba(255,255,255,0.08)" },
            {
              backgroundColor: "rgba(255,255,255,0.16)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: drift,
                start: "left 70%",
                end: "right 30%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        return () => {
          row.style.willChange = "";
        };
      });

      mm.add("(max-width: 767px)", () => {
        const track = trackRef.current;
        if (!track) return;

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                scroller: track,
                horizontal: true,
                start: "left 95%",
                once: true,
              },
            },
          );
        });

        const onScroll = () => {
          const max = track.scrollWidth - track.clientWidth;
          const progress = max > 0 ? track.scrollLeft / max : 0;
          setActive(Math.min(total - 1, Math.round(progress * (total - 1))));
        };

        track.addEventListener("scroll", onScroll, { passive: true });
        return () => track.removeEventListener("scroll", onScroll);
      });
    },
    { scope: sectionRef, dependencies: [total] },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-ink ${className}`}
    >
      <div className="flex min-h-[600px] flex-col justify-center gap-10 px-5 py-14 md:h-svh md:min-h-[640px] md:justify-between md:gap-0 md:px-6 md:py-0 md:pt-24 md:pb-16">
        <div className="mx-auto w-full max-w-[1400px] text-white">
          <SectionHeading
            label={label}
            heading={heading}
            paragraph={paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-3 max-w-[520px] leading-[normal] text-white/70"
          />
        </div>

        <div
          ref={trackRef}
          className="mt-auto w-full snap-x snap-mandatory overflow-x-auto md:snap-none md:overflow-visible md:pb-[30px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden motion-reduce:overflow-x-auto"
        >
          <div
            ref={rowRef}
            className="flex w-fit max-w-none items-end gap-4 px-5 md:gap-5 md:pl-[65vw] md:pr-6"
          >
            {steps.map((step, i) => (
              <article
                key={i}
                className={`step-card flex h-[220px] w-[280px] shrink-0 snap-start flex-col rounded-2xl bg-white/8 p-6 md:w-[380px] md:p-7 ${CARD_HEIGHTS[i] ?? CARD_HEIGHTS[CARD_HEIGHTS.length - 1]}`}
              >
                <h3 className="display-serif text-[20px] font-bold italic leading-[normal] text-white md:text-[25px]">
                  {step.title}
                </h3>
                <RichText
                  html={step.description ?? ""}
                  className="mt-3 text-[16px] leading-[normal] text-white/50"
                />
                {step.image?.src ? (
                  <Image
                    src={step.image.src}
                    alt={step.image.alt ?? ""}
                    width={step.image.width ?? 32}
                    height={step.image.height ?? 32}
                    className="mt-auto ml-auto h-8 w-auto opacity-90"
                  />
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 md:mt-0">
          <span className="flex items-center">
            <span className="relative z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-[2px]">
              <span ref={activeRef}>01</span>
            </span>
            <span className="-ml-2 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/40 text-ink/70 backdrop-blur-md">
              {pad(total)}
            </span>
          </span>
          <div className="hidden h-px flex-1 bg-white/20 md:block" />

          <span className="hidden items-center md:flex">
            {steps.slice(1).map((_, i) => (
              <span
                key={i}
                className="step-num -ml-2 flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-ink transition-all duration-300 ease-out first:ml-0"
              >
                {pad(i + 2)}
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
