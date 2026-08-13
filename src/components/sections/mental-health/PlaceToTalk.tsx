"use client";

import Image from "next/image";
import type { CounsellingIntro } from "@/lib/types";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";

export default function PlaceToTalk({
  content,
}: {
  content: CounsellingIntro;
}) {
  return (
    <section className=" px-5 py-10 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex max-w-xl flex-col justify-between gap-10 lg:order-1 lg:py-2">
          <Reveal from="left">
            <p className="section-label">{content.label}</p>
          </Reveal>

          <div>
            <Reveal delay={0.1} from="left">
              <RichText
                html={content.heading}
                as="h2"
                className="about-heading text-[30px] md:text-[40px]"
              />
            </Reveal>
            <Reveal delay={0.2} from="left">
              <RichText
                html={content.paragraph}
                className="mt-6 max-w-[520px] leading-[normal]"
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="lg:order-2">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
