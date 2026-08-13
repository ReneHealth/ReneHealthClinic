"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

export type ImageDataType = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type RoleItemType = {
  title?: string;
  description?: string;
  image?: ImageDataType | null;
};

export type RoleSectionDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  items?: RoleItemType[];
};

export type RolePropsType = {
  content?: RoleSectionDataType;
  className?: string;
};

export default function Role({
  content,
  className = "",
}: RolePropsType) {
  const typedContent = content;

  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const items = Array.isArray(typedContent?.items) ? typedContent.items : [];

  return (
    <section className={`px-5 pt-10 md:px-6 md:py-18 ${className}`}>
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-xl">
          <SectionHeading
            label={label}
            heading={heading}
            paragraph={paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-6 max-w-[560px] space-y-4 leading-[normal]"
          />
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 md:mt-20">
          {items.map((item, i) => {
            const title = item?.title ?? "";
            const description = item?.description ?? "";
            const imageSrc = item?.image?.src ?? "";
            const imageAlt = item?.image?.alt ?? "";
            const imageWidth = item?.image?.width ?? 100;
            const imageHeight = item?.image?.height ?? 100;
            const itemKey = title || i;

            return (
              <Reveal
                key={itemKey}
                delay={i * 0.1}
                className={`sm:px-8 ${
                  i > 0 ? "sm:border-[#81DBDB] sm:border-l" : ""
                } ${i === 0 ? "sm:pl-0 sm:pr-8" : ""}`}
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                    className="h-[100px] w-[100px] object-cover"
                  />
                ) : null}
                <h3 className="mt-5 text-[18px] font-bold">{title}</h3>
                <RichText
                  html={description}
                  className="mt-2 max-w-sm leading-[normal] opacity-50"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}