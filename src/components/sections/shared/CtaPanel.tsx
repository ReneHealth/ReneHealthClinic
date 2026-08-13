"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/motion";

export type CtaDataType = {
  label?: string;
  href?: string;
  target?: string;
};

export type CtaPanelDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  cta?: CtaDataType | null;
};

export type CtaPanelPropsType = {
  content?: CtaPanelDataType;
  className?: string;
};

const REST_WIDTH = 1400;
const MIN_GUTTER = 20;
const REST_RADIUS = 24;

export default function CtaPanel({
  content,
  className = "",
}: CtaPanelPropsType) {
  const sectionRef = useRef<HTMLElement>(null);

  const typedContent = content;

  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const cta = typedContent?.cta ?? null;

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".ubc-frame", { clipPath: "inset(0px round 0px)" });
        return;
      }

      const sideInset = () => {
        const w =
          document.querySelector<HTMLElement>(".ubc-frame")?.offsetWidth ??
          window.innerWidth;
        const target = Math.min(REST_WIDTH, w - MIN_GUTTER * 2);
        return Math.max(0, (w - target) / 2);
      };

      gsap.fromTo(
        ".ubc-frame",
        {
          clipPath: () =>
            `inset(0px ${sideInset()}px 0px ${sideInset()}px round ${REST_RADIUS}px)`,
        },
        {
          clipPath: "inset(0px 0px 0px 0px round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "top 28%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={`bg-mist ${className}`}>
      <div className="ubc-frame w-full bg-ink will-change-[clip-path]">
        <div className="mx-auto max-w-[1400px] px-5 py-14 text-center text-white md:px-6 md:py-30">
          <SectionHeading
            label={label}
            heading={heading}
            paragraph={paragraph}
            align="center"
            tone="light"
            paragraphClassName="mt-5 max-w-[800px]"
          />

          {cta ? (
            <Reveal delay={0.3} className="mt-8">
              <Button cta={cta} />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}