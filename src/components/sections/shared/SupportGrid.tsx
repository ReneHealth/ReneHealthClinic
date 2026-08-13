"use client";

import Image from "next/image";
import type {
  SectionCard,
  SectionHeader,
} from "@/lib/types/sections";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";
import TiltCard from "@/components/ui/TiltCard";

export type SupportGridDataType = SectionHeader & {
  cards?: SectionCard[];
};

export type SupportGridPropsType = {
  content?: SupportGridDataType;
  expanded?: boolean;
};

export default function SupportGrid({
  content,
  expanded = false,
}: SupportGridPropsType) {
  const label = content?.label ?? "";
  const heading = content?.heading ?? "";
  const paragraph = content?.paragraph ?? "";
  const cards = Array.isArray(content?.cards) ? content.cards : [];

  return (
    <section className="px-5 py-10 md:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          label={label}
          heading={heading}
          paragraph={paragraph}
          headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
          paragraphClassName="mt-5 text-[16px] leading-[normal]"
        />
      </div>

      <div className="mx-auto mt-10 flex max-w-[1400px] flex-wrap justify-center gap-2 md:mt-16">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              delay: (i % 3) * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full md:w-[calc(50%-4px)] lg:w-[calc(33.333%-5.334px)]"
          >
            <TiltCard
              as="article"
              maxTilt={6}
              className="group flex h-full min-h-[250px] flex-col rounded-xl border border-aqua/20 bg-foam p-5 transition-colors duration-500 hover:border-aqua/40 hover:bg-aqua/20"
            >
              {card.icon?.src ? (
                <Image
                  src={card.icon.src}
                  alt={card.icon.alt ?? ""}
                  width={card.icon.width ?? 36}
                  height={card.icon.height ?? 36}
                  className="h-9 w-fit transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1"
                />
              ) : null}

              <div
                className={
                  !expanded || card.icon ? "mt-auto pt-10" : undefined
                }
              >
                <h3 className="text-[18px] font-bold">{card.title}</h3>
                <RichText
                  html={card.description ?? ""}
                  className={`mt-2 text-[16px] leading-[normal] opacity-50 ${
                    expanded
                      ? ""
                      : "[display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden"
                  }`}
                />

                {card.cta?.href ? (
                  <Link
                    href={card.cta.href}
                    target={card.cta.target}
                    rel={
                      card.cta.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-ink"
                  >
                    <span className="border-b border-transparent transition-colors duration-500 group-hover:border-ink">
                      {card.cta.label}
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 fill-none stroke-current stroke-[1.5] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
                    >
                      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
                    </svg>
                  </Link>
                ) : null}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
