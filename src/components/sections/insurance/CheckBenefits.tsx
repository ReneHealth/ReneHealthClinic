"use client";

import Image from "next/image";
import type { CheckBenefitsSection } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

export default function CheckBenefits({
  content,
}: {
  content: CheckBenefitsSection;
}) {
  return (
    <section className="px-5 py-10 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex max-w-xl flex-col lg:h-full">
          <SectionHeading
            label={content.label}
            heading={content.heading}
            paragraph={content.paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-6 max-w-[480px] leading-[normal]"
          />

          <Reveal delay={0.25} from="left" className="mt-auto pt-10">
            <span aria-hidden="true" className="block h-px w-[280px] bg-line" />
            <RichText
              html={content.footnote}
              className="mt-3 max-w-[420px] text-[14px] leading-[normal] opacity-50"
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          {content.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="flex gap-4">
              {content.icon ? (
                <Image
                  src={content.icon.src}
                  alt={content.icon.alt}
                  width={content.icon.width}
                  height={content.icon.height}
                  className="mt-2 h-8 w-8 shrink-0"
                />
              ) : null}
              <div>
                <h3 className="text-[18px] font-bold">{item.title}</h3>
                <RichText
                  html={item.description}
                  className="mt-1 max-w-md leading-[normal] opacity-50"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
