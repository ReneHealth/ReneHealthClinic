"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type {
  SectionCta,
  SectionHeader,
  SectionImage,
} from "@/lib/types/sections";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";
import TiltCard from "@/components/ui/TiltCard";
import Parallax from "@/components/ui/Parallax";

export type ServiceItemDataType = {
  title?: string;
  description?: string;
};

export type ServiceColumnDataType = {
  label?: string;
  title?: string;
  layout?: string;
  cta?: SectionCta | null;
  image?: SectionImage | null;
  items?: ServiceItemDataType[];
};

export type ServicesDataType = SectionHeader & {
  columns?: ServiceColumnDataType[];
};

export default function Services({ content }: { content?: ServicesDataType }) {
  return (
    <section className="px-5 md:px-6 pb-10 md:pb-30">
      <div className="mx-auto max-w-[800px] text-center">
        <SectionHeading
          label={content?.label}
          heading={content?.heading ?? ""}
          paragraph={content?.paragraph}
          headingClassName="display-serif mt-3 text-5xl md:text-[50px] leading-[60px]"
          paragraphClassName="mt-5 text-[16px] leading-[normal]"
        />
      </div>

      <div className="mx-auto mt-10 md:mt-16 grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-8">
        {(content?.columns ?? []).map((col, colIndex) => {
          const isSplit = col.layout === "split";

          return (
            <motion.div
              key={colIndex}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: colIndex * 0.15,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                isSplit
                  ? "lg:col-span-2 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12"
                  : undefined
              }
            >
              <TiltCard maxTilt={5} className="rounded-3xl">
                <Link
                  suppressHydrationWarning
                  href={col.cta?.href ?? "#"}
                  target={col.cta?.target}
                  rel={
                    col.cta?.target === "_blank"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`group relative block overflow-hidden rounded-3xl ${
                    isSplit ? "aspect-[7/3] lg:aspect-[2/1]" : "aspect-[7/3]"
                  }`}
                >
                  <Parallax speed={0.1} className="absolute inset-0">
                    {col.image?.src ? (
                      <Image
                        src={col.image.src}
                        alt={col.image.alt || col.title || ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    ) : null}
                  </Parallax>
                  <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/40" />
                  {col.cta ? (
                    <span className="btn-3d absolute inset-0 m-auto flex h-fit w-fit items-center rounded-full border border-white/70 px-6 py-[9px] text-sm text-white transition-all duration-500 group-hover:bg-white group-hover:text-ink">
                      {col.cta.label}
                    </span>
                  ) : null}
                </Link>
              </TiltCard>
              <div className="content-box">
                <p
                  className={`section-label2 mt-8 ${isSplit ? "lg:mt-0" : ""}`}
                >
                  {col.label}
                </p>
                <h3 className="mt-1 text-[20px] md:text-[25px] font-bold leading-[normal] italic">
                  {col.title}
                </h3>

                <ul className="mt-4">
                  {(col.items ?? []).map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="grid gap-2 border-t border-line py-6  first:border-line sm:grid-cols-[1fr_1fr] sm:gap-8"
                    >
                      <h4 className="text-[18px] font-bold">{item.title}</h4>
                      <RichText
                        html={item.description ?? ""}
                        className="text-[15px] leading-[normal] opacity-60"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
