"use client";

import { useRef } from "react";
import Button, { type CtaLinkType } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";
import RichText from "@/components/ui/RichText";
import TiltCard from "@/components/ui/TiltCard";
import { prefersReducedMotion } from "@/lib/motion";

export type FeatureCardType = {
  title?: string;
  description?: string;
  cta?: CtaLinkType | null;
};

export type FeatureCardsDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  footnote?: string;
  cta?: CtaLinkType | null;
  backgrounds?: string[];
  cards?: FeatureCardType[] | readonly FeatureCardType[];
};

export type FeatureCardsPropsType = {
  content?: FeatureCardsDataType;
  numbered?: boolean;
  className?: string;
};

export default function FeatureCards({
  content,
  numbered = false,
  className = "",
}: FeatureCardsPropsType) {
  const sectionRef = useRef<HTMLElement>(null);

  const label = content?.label ?? "";
  const heading = content?.heading ?? "";
  const paragraph = content?.paragraph ?? "";
  const footnote = content?.footnote ?? "";
  const cta = content?.cta;
  const background = content?.backgrounds?.[0];
  const cards = (
    Array.isArray(content?.cards) ? content.cards : []
  ) as FeatureCardType[];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add(
        { mobile: "(max-width: 767px)", desktop: "(min-width: 768px)" },
        (context) => {
          const desktop = !!context.conditions?.desktop;

          const tl = gsap.timeline({
            scrollTrigger: desktop
              ? {
                  trigger: sectionRef.current,
                  start: "top top",
                  end: "+=150%",
                  pin: true,
                  anticipatePin: 0.5,
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                }
              : { trigger: sectionRef.current, start: "top 75%", once: true },
          });

          tl.fromTo(
            ".fc-head > *",
            { y: 60, rotateX: -20, transformPerspective: 800, autoAlpha: 0 },
            {
              y: 0,
              rotateX: 0,
              stagger: 0.12,
              autoAlpha: 1,
              duration: 0.6,
              onComplete: () =>
                gsap.set(".fc-head > *", { clearProps: "transform" }),
            },
            0,
          );

          tl.fromTo(
            ".fc-card",
            desktop
              ? {
                  y: 120,
                  rotateX: 35,
                  transformPerspective: 900,
                  transformOrigin: "50% 100%",
                  autoAlpha: 0,
                  filter: "blur(12px)",
                }
              : { y: 60, autoAlpha: 0 },
            desktop
              ? {
                  y: 0,
                  rotateX: 0,
                  autoAlpha: 1,
                  filter: "blur(0px)",
                  duration: 0.8,
                  ease: "power3.out",
                }
              : { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
            desktop ? 0.8 : 0.4,
          );
        },
      );
    },
    { scope: sectionRef, dependencies: [cards.length] },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-svh overflow-hidden bg-cover bg-center md:h-svh md:min-h-[640px] ${className}`}
      style={background ? { backgroundImage: `url(${background})` } : undefined}
    >
      {background ? <div className="absolute inset-0 bg-black/25" /> : null}

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1400px] flex-col gap-8 px-5 py-16 md:min-h-0 md:h-full md:justify-between md:gap-0 md:px-6 md:pt-24 md:pb-10">
        <div className="fc-head w-full text-white [text-shadow:0_1px_18px_rgba(20,41,43,0.45)]">
          <p className="section-label">{label}</p>
          <h2 className="display-serif mt-1 text-[30px] md:text-[50px]">
            {heading}
          </h2>
          <RichText
            html={paragraph}
            className="mt-3 max-w-[560px] text-[16px] leading-[normal] text-white/90"
          />
          {cta ? (
            <Button
              cta={cta}
              variant="solid"
              size="sm"
              className="mt-7 font-medium [text-shadow:none] transition-colors"
            />
          ) : null}
        </div>

        <div className="fc-cards grid gap-4 md:grid-cols-3 md:gap-2 mt-auto">
          {cards.map((card, i) => (
            <TiltCard
              key={i}
              as="article"
              maxTilt={6}
              className={`fc-card fc-card-${i} relative flex h-full flex-col rounded-xl bg-ink/80 p-5 text-white will-change-[transform,opacity] md:min-h-[280px] md:bg-ink/35 md:p-6 md:backdrop-blur-2xl`}
            >
              <h3 className="text-[20px] font-bold italic md:text-[25px]">
                {card?.title ?? ""}
              </h3>
              <RichText
                html={card?.description ?? ""}
                className="mt-3 text-[16px] leading-[normal] text-white/50"
              />
              {numbered ? (
                <p
                  aria-hidden="true"
                  className="display-serif mt-auto pt-6 text-right text-[60px] leading-none text-white/95 md:text-[100px]"
                >
                  {i + 1}
                </p>
              ) : null}
              {card?.cta ? (
                <div className="mt-auto pt-6">
                  <Button cta={card.cta} size="sm" />
                </div>
              ) : null}
            </TiltCard>
          ))}
        </div>

        {footnote ? (
          <div className="fc-footnote max-w-[570px]  mt-[30px]">
            <span
              aria-hidden="true"
              className="block h-px w-[333px] bg-white/40"
            />
            <RichText
              html={footnote}
              className="mt-3 text-[14px] leading-[normal] text-white/70"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
