"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/motion";

export type ImageDataType = {
  src?: string;
  alt?: string;
};

export type CtaDataType = {
  label?: string;
  href?: string;
  target?: string;
};

export type CtaBannerDataType = {
  heading?: string;
  paragraph?: string;
  image?: ImageDataType | null;
  cta?: CtaDataType | null;
};

export type CtaImageBannerPropsType = {
  content?: CtaBannerDataType;
  className?: string;
};

export default function CtaImageBanner({
  content,
  className = "",
}: CtaImageBannerPropsType) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const typedContent = content;

  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const imageSrc = typedContent?.image?.src ?? "";
  const imageAlt = typedContent?.image?.alt ?? "";
  const cta = typedContent?.cta ?? null;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        imageRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-[420px] items-center overflow-hidden md:min-h-[600px] ${className}`}
    >
      {imageSrc ? (
        <div ref={imageRef} className="absolute inset-0 scale-[1.15]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 mx-auto max-w-2xl px-5 py-14 text-center text-white [text-shadow:0_1px_18px_rgba(20,41,43,0.45)] md:px-6">
        <SectionHeading
          heading={heading}
          paragraph={paragraph}
          align="center"
          headingClassName="display-serif text-[34px] leading-[1.1] sm:text-[46px] md:text-[72px] lg:text-[100px] md:leading-[1.05]"
          paragraphClassName="max-w-[470px]"
        />

        {cta ? (
          <Reveal delay={0.25} className="mt-8">
            <Button cta={cta} className="[text-shadow:none]" />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}