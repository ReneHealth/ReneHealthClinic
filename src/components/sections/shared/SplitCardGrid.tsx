"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";
import TiltCard from "@/components/ui/TiltCard";

export type SplitCardCtaType = {
  label?: string;
  href?: string;
  target?: string;
};

export type SplitCardType = {
  title?: string;
  description?: string;
  cta?: SplitCardCtaType | null;
};

export type SplitCardGridDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  cards?: SplitCardType[];
};

export type SplitCardGridPropsType = {
  content?: SplitCardGridDataType;
  className?: string;
};

export default function SplitCardGrid({
  content,
  className = "",
}: SplitCardGridPropsType) {
  const typedContent = content;

  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const cards = (
    Array.isArray(typedContent?.cards) ? typedContent.cards : []
  ) as SplitCardType[];

  return (
    <section className={`px-5 py-10 md:px-6 md:py-20 ${className}`}>
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-10">
        <div className="max-w-xl lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            label={label}
            heading={heading}
            paragraph={paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[45px]"
            paragraphClassName="mt-6 max-w-[480px] leading-[normal]"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {cards.map((card, i) => {
            const isWide = cards.length % 2 === 1 && i === cards.length - 1;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: (i % 2) * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={isWide ? "w-full" : "w-full sm:w-[calc(50%-8px)]"}
              >
                <TiltCard
                  as="article"
                  maxTilt={4}
                  className="group flex h-full min-h-[150px] flex-col rounded-xl border border-aqua/20 bg-foam p-6 transition-colors duration-500 hover:border-aqua/40 hover:bg-aqua/20"
                >
                  <h3 className="text-[18px] font-bold">{card.title}</h3>
                  <RichText
                    html={card.description ?? ""}
                    className="mt-2 text-[16px] leading-[normal] opacity-50"
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
                      className="mt-auto inline-flex w-fit items-center gap-1.5 pt-6 text-[14px] text-ink"
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
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
