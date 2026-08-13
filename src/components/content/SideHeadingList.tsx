"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

export type IconDataType = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type ListItemType = {
  title?: string;
  description?: string;
  icon?: IconDataType;
};

export type SideHeadingListDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  items?: ListItemType[];
};

export type SideHeadingListPropsType = {
  content?: SideHeadingListDataType;
  className?: string;
};

export default function SideHeadingList({
  content,
  className = "",
}: SideHeadingListPropsType) {
  const label = content?.label ?? "";
  const heading = content?.heading ?? "";
  const paragraph = content?.paragraph ?? "";
  const items = content?.items ?? [];

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
            {items.map((item, i) => {
              const title = item?.title ?? "";
              const description = item?.description ?? "";
              const iconSrc = item?.icon?.src ?? "";
              const iconAlt = item?.icon?.alt ?? "";
              const iconWidth = item?.icon?.width ?? 0;
              const iconHeight = item?.icon?.height ?? 0;

              return (
                <Reveal key={title || i} delay={i * 0.06} className="flex gap-5">
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt={iconAlt}
                      width={iconWidth}
                      height={iconHeight}
                      className="h-9 w-9 shrink-0"
                    />
                  ) : null}
                  <div>
                    <h3 className="text-[18px] font-bold">{title}</h3>
                    <RichText
                      html={description}
                      className="mt-1 max-w-md leading-[normal] opacity-50"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}