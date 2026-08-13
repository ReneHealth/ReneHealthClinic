"use client";

import Image from "next/image";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";

export type ImageDataType = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type TwoColumnImageContentDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  image?: ImageDataType | null;
};

export type TwoColumnImageContentPropsType = {
  content?: TwoColumnImageContentDataType;
  reverse?: boolean;
  className?: string;
};

export default function TwoColumnImageContent({
  content,
  reverse = false,
  className = "",
}: TwoColumnImageContentPropsType) {
  const typedContent = content;

  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const imageSrc = typedContent?.image?.src ?? "";
  const imageAlt = typedContent?.image?.alt ?? "";

  return (
    <section className={`px-5 py-10 md:px-6 md:py-24 ${className}`}>
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-2 lg:gap-16">
        <div
          className={`flex max-w-xl flex-col justify-between gap-10 lg:py-2 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <Reveal from="left">
            <p className="section-label">{label}</p>
          </Reveal>

          <div>
            <Reveal delay={0.1} from="left">
              <RichText
                html={heading}
                as="h2"
                className="about-heading text-[30px] md:text-[40px]"
              />
            </Reveal>
            <Reveal delay={0.2} from="left">
              <RichText
                html={paragraph}
                className="mt-6 max-w-[520px] leading-[normal]"
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className={reverse ? "lg:order-1" : "lg:order-2"}>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
