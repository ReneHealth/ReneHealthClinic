"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import type { VisitorGuideSection } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/motion";


export default function VisitorGuide({
  content,
}: {
  content: VisitorGuideSection;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
      className="relative flex min-h-[340px] items-center overflow-hidden md:min-h-[550px]"
    >
      {content.image ? (
        <div ref={imageRef} className="absolute inset-0 scale-[1.15]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-[#000] opacity-20" />

      <div className="relative z-10 mx-auto max-w-[700px] px-5 py-20 text-center text-white md:px-6">
        <SectionHeading
          label={content.label}
          heading={content.heading}
          paragraph={content.paragraph}
          headingClassName="display-serif mt-3 text-[30px] leading-[normal] md:text-[50px]"
          paragraphClassName="mx-auto mt-4 max-w-[460px] leading-[normal] text-white/85"
        />

        {content.cta ? (
          <Reveal delay={0.3} className="mt-8">
            <Link
              suppressHydrationWarning
              href={content.cta.href}
              target={content.cta.target}
              rel={
                content.cta.target === "_blank"
                  ? "noopener noreferrer"
                  : undefined
              }
              className="btn-3d inline-block rounded-full border border-white/70 px-8 py-[11px] text-sm uppercase tracking-[0.05em] text-white transition-all duration-500 hover:bg-white hover:text-ink"
            >
              {content.cta.label}
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
