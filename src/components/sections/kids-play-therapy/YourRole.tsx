"use client";

import Image from "next/image";
import type { RoleSection } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

export default function YourRole({ content }: { content: RoleSection }) {
  return (
    <section className=" px-5 pt-10 md:px-6 md:py-18">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-xl">
          <SectionHeading
            label={content.label}
            heading={content.heading}
            paragraph={content.paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-6 max-w-[560px] space-y-4 leading-[normal]"
          />
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 md:mt-20">
          {content.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.1}
              className={`sm:px-8 ${i > 0 ? "sm:border-[#81DBDB] sm:border-l" : ""} ${i === 0 ? "sm:pr-8 sm:pl-0" : ""}`}
            >
              {item.image ? (
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className="h-[100px] w-[100px]   object-cover"
                />
              ) : null}
              <h3 className="mt-5 text-[18px] font-bold">{item.title}</h3>
              <RichText
                html={item.description}
                className="mt-2 max-w-sm leading-[normal] opacity-50"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
