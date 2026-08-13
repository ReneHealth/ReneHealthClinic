"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

export type FaqItemType = {
  id?: string;
  question?: string;
  answer?: string;
};

export type FaqSectionDataType = {
  label?: string;
  tagline?: string;
  heading?: string;
  paragraph?: string;
  items?: FaqItemType[] | readonly FaqItemType[];
};

export type FaqPropsType = {
  content?: FaqSectionDataType;
  className?: string;
};

export default function Faq({
  content,
  className = "py-10 md:py-32",
}: FaqPropsType) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  const typedContent = content;

  const label = typedContent?.label ?? typedContent?.tagline ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const items = (
    Array.isArray(typedContent?.items) ? typedContent.items : []
  ) as FaqItemType[];

  return (
    <section id="faq" className={`px-5 md:px-6 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          label={label}
          heading={heading}
          paragraph={paragraph}
          headingClassName="display-serif mt-1 !leading-[normal] text-[30px] md:text-[50px]"
          paragraphClassName="mt-5 text-[16px] leading-[normal]"
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl md:mt-14">
        {items.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${baseId}-faq-${i}`;
          const question = item?.question ?? "";
          const answer = item?.answer ?? "";
          const itemKey = (item?.id ?? question) || i;

          return (
            <Reveal key={itemKey} delay={i * 0.05}>
              <div
                className={`border-b transition-colors duration-500 ${
                  isOpen
                    ? "active rounded-2xl border-transparent bg-foam"
                    : open === i + 1
                      ? "border-transparent"
                      : "border-line"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="btn-3d-wide flex w-full items-center justify-between gap-6 px-4 py-3 text-left md:px-6 md:py-6"
                >
                  <span className="display-serif text-[20px] leading-[normal] md:text-[25px]">
                    {question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 text-ink"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4 fill-none stroke-current stroke-[1.5]"
                    >
                      <path d="M3 13 13 3M5 3h8v8" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <RichText
                        html={answer}
                        className="px-4 pb-4 text-[16px] richText leading-[normal] opacity-50 md:px-6 md:pb-6"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
