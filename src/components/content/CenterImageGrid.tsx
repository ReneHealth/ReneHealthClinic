"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";
import TiltCard from "@/components/ui/TiltCard";

export type IconDataType = {
  src?: string;
  width?: number;
  height?: number;
  [key: string]: any;
};

export type CtaDataType = {
  label?: string;
  href?: string;
  target?: string;
  [key: string]: any;
};

export type CardItemType = {
  title?: string;
  description?: string;
  icon?: IconDataType;
  cta?: CtaDataType | null;
  [key: string]: any;
};

export type ImageDataType = {
  src?: string;
  alt?: string;
  [key: string]: any;
};

export type CenterImageGridDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  image?: ImageDataType | null;
  cards?: CardItemType[] | readonly CardItemType[] | any;
  [key: string]: any;
};

export type CenterImageGridPropsType = {
  content?: CenterImageGridDataType | any;
  richHeading?: boolean;
  className?: string;
};

export type SupportCardPropsType = {
  card?: CardItemType;
  delay?: number;
  className?: string;
};

function SupportCard({
  card,
  delay = 0,
  className = "",
}: SupportCardPropsType) {
  const title = card?.title ?? "";
  const description = card?.description ?? "";
  const iconSrc = card?.icon?.src ?? "";
  const iconAlt = card?.icon?.alt ?? "";
  const iconWidth = card?.icon?.width ?? 0;
  const iconHeight = card?.icon?.height ?? 0;
  const ctaHref = card?.cta?.href ?? "";
  const ctaLabel = card?.cta?.label ?? "";
  const ctaTarget = card?.cta?.target;

  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <TiltCard
        as="article"
        maxTilt={6}
        className="flex h-full min-h-[210px] flex-col rounded-xl border border-aqua/20 bg-foam p-5"
      >
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={iconWidth}
            height={iconHeight}
            className="h-9 w-fit"
          />
        ) : null}
        <div className="mt-auto pt-8">
          <h3 className="text-[18px] font-bold">{title}</h3>
          <RichText
            html={description}
            className="mt-2 text-[16px] leading-[normal] opacity-50"
          />

          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              target={ctaTarget}
              rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
              className="group mt-5 inline-flex items-center gap-1.5 text-[14px] text-ink"
            >
              <span className="border-b border-transparent transition-colors duration-500 group-hover:border-ink">
                {ctaLabel}
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

export default function CenterImageGrid({
  content,
  richHeading = false,
  className = "",
}: CenterImageGridPropsType) {
  const label = content?.label ?? "";
  const heading = content?.heading ?? "";
  const paragraph = content?.paragraph ?? "";
  const imageSrc = content?.image?.src ?? "";
  const imageAlt = content?.image?.alt ?? "";

  const cards = content?.cards ?? [];
  const card0 = cards[0];
  const card1 = cards[1];
  const card2 = cards[2];
  const card3 = cards[3];

  return (
    <section className={`px-5 py-10 md:px-6 md:pb-20 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        {richHeading ? (
          <>
            {label ? (
              <Reveal>
                <p className="section-label">{label}</p>
              </Reveal>
            ) : null}
            <Reveal delay={label ? 0.1 : 0}>
              <RichText
                html={heading}
                as="h2"
                className="display-serif mt-1 text-[30px] md:text-[50px]"
              />
            </Reveal>
            {paragraph ? (
              <Reveal delay={label ? 0.2 : 0.1}>
                <RichText
                  html={paragraph}
                  className="mx-auto mt-5 text-[16px] leading-[normal]"
                />
              </Reveal>
            ) : null}
          </>
        ) : (
          <SectionHeading
            label={label}
            heading={heading}
            paragraph={paragraph}
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-5 text-[16px] leading-[normal]"
          />
        )}
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
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
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
