"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

export type IconTextItemType = {
  title?: string;
  description?: string;
  icon?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  } | null;
};

export type IconTextListDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  items?: IconTextItemType[];
};

export type IconTextListPropsType = {
  content?: IconTextListDataType;
  className?: string;
};

export default function IconTextList({
  content,
  className = "",
}: IconTextListPropsType) {
  const typedContent = content;

  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const items = (
    Array.isArray(typedContent?.items) ? typedContent.items : []
  ) as IconTextItemType[];

  return (
    <section className={`px-5 py-10 md:px-6 md:pt-20 ${className}`}>
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <SectionHeading
            label={label}
            heading={heading}
            paragraph={paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-6 max-w-[480px] leading-[normal]"
          />
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-8">
            {items.map((item, i) => (
              <Reveal key={i} delay={i * 0.06} className="flex gap-5">
                {item.icon?.src ? (
                  <Image
                    src={item.icon.src}
                    alt={item.icon.alt ?? ""}
                    width={item.icon.width ?? 36}
                    height={item.icon.height ?? 36}
                    className="h-9 w-9 shrink-0"
                  />
                ) : null}
                <div>
                  <h3 className="text-[18px] font-bold">{item.title}</h3>
                  <RichText
                    html={item.description ?? ""}
                    className="mt-1 max-w-md leading-[normal] opacity-50"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
