"use client";

import Image from "next/image";
import Link from "next/link";
import type { KidsSupportSection } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";
import TiltCard from "@/components/ui/TiltCard";

export default function WhatWeSupport({
  content,
}: {
  content: KidsSupportSection;
}) {
  const [card0, card1, card2, card3] = content.cards;

  return (
    <section className="px-5 py-10 md:px-6 md:pb-20">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          label={content.label}
          heading={content.heading}
          paragraph={content.paragraph}
          headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
          paragraphClassName="mt-5 text-[16px] leading-[normal]"
        />
      </div>

      <div className="mx-auto mt-10 grid max-w-[1400px] gap-2 md:mt-16 md:grid-cols-3 md:grid-rows-2">
        <SupportCard
          card={card0}
          delay={0}
          className="md:col-start-1 md:row-start-1"
        />

        <Reveal
          delay={0.15}
          className="min-h-[260px] md:col-start-2 md:row-span-2 md:row-start-1"
        >
          <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-xl">
            {content.image ? (
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            ) : null}
          </div>
        </Reveal>

        <SupportCard
          card={card1}
          delay={0.08}
          className="md:col-start-3 md:row-start-1"
        />
        <SupportCard
          card={card2}
          delay={0.16}
          className="md:col-start-1 md:row-start-2"
        />
        <SupportCard
          card={card3}
          delay={0.24}
          className="md:col-start-3 md:row-start-2"
        />
      </div>
    </section>
  );
}

function SupportCard({
  card,
  delay,
  className,
}: {
  card: KidsSupportSection["cards"][number];
  delay: number;
  className: string;
}) {
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <TiltCard
        as="article"
        maxTilt={6}
        className="flex h-full min-h-[210px] flex-col rounded-xl border border-aqua/20 bg-foam p-5"
      >
        {card.icon ? (
          <Image
            src={card.icon.src}
            alt={card.icon.alt}
            width={card.icon.width}
            height={card.icon.height}
            className="h-9 w-fit"
          />
        ) : null}
        <div className="mt-auto pt-8">
          <h3 className="text-[18px] font-bold">{card.title}</h3>
          <RichText
            html={card.description}
            className="mt-2 text-[16px] leading-[normal] opacity-50"
          />

          {card.cta ? (
            <Link
              href={card.cta.href}
              target={card.cta.target}
              rel={
                card.cta.target === "_blank" ? "noopener noreferrer" : undefined
              }
              className="group mt-5 inline-flex items-center gap-1.5 text-[14px] text-ink"
            >
              <span className="border-b border-transparent transition-colors duration-500 group-hover:border-ink">
                {card.cta.label}
              </span>
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 fill-none stroke-current stroke-[1.5] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
              >
                <path d="M2.5 8h11M9.5 4l4 4-4 4" />
              </svg>
            </Link>
          ) : null}
        </div>
      </TiltCard>
    </Reveal>
  );
}
