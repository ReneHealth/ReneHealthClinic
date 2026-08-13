"use client";

import Image from "next/image";
import type { ApproachSection } from "@/lib/types";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

export default function WhyPlayTherapyWorks({
  content,
}: {
  content: ApproachSection;
}) {
  return (
    <section className="bg-mist px-5 py-10 md:px-6">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex max-w-xl flex-col justify-center">
          <SectionHeading
            label={content.label}
            heading={content.heading}
            paragraph={content.paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-6 max-w-[520px] space-y-4 leading-[normal]"
          />
        </div>

        <Reveal delay={0.15}>
          <div className="relative aspect-[71/74] w-full overflow-hidden rounded-3xl">
            <Parallax speed={0.12} className="absolute inset-0">
              {content.image ? (
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : null}
            </Parallax>
            <div className="absolute inset-0 bg-[#000] opacity-20" />
            <RichText
              html={content.quote}
              as="p"
              className="absolute inset-x-6 bottom-6 text-[20px] leading-[1.2] font-bold text-white md:inset-x-8 md:bottom-8 md:text-[40px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
