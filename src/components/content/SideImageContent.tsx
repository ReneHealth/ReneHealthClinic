"use client";

import Image from "next/image";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

export type ImageDataType = {
  src?: string;
  alt?: string;
};

export type SideImageContentDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  quote?: string;
  image?: ImageDataType | null;
};

export type SideImageContentPropsType = {
  content?: SideImageContentDataType;
  imagePosition?: "left" | "right";
  className?: string;
};

export default function SideImageContent({
  content,
  imagePosition = "right",
  className = "",
}: SideImageContentPropsType) {
  const label = content?.label ?? "";
  const heading = content?.heading ?? "";
  const paragraph = content?.paragraph ?? "";
  const quote = content?.quote ?? "";
  const imageSrc = content?.image?.src ?? "";
  const imageAlt = content?.image?.alt ?? "";

  const isImageLeft = imagePosition === "left";

  return (
    <section className={`bg-mist px-5 py-10 md:px-6 ${className}`}>
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-2 lg:gap-16">
        <div
          className={`flex max-w-xl flex-col justify-center ${
            isImageLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <SectionHeading
            label={label}
            heading={heading}
            paragraph={paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-6 max-w-[520px] space-y-4 leading-[normal]"
          />
        </div>

        <div className={isImageLeft ? "lg:order-1" : "lg:order-2"}>
          <Reveal delay={0.15}>
            <div className="relative aspect-[71/74] w-full overflow-hidden rounded-3xl">
              <Parallax speed={0.12} className="absolute inset-0">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : null}
              </Parallax>
              <div className="absolute inset-0 bg-[#000] opacity-20" />
              <RichText
                html={quote}
                as="p"
                className="absolute inset-x-6 bottom-6 text-[20px] leading-[1.2] font-bold text-white md:inset-x-8 md:bottom-8 md:text-[40px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}