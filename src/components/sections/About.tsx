"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutSection } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
import TiltCard from "@/components/ui/TiltCard";

export default function About({ content }: { content: AboutSection }) {
  return (
    <section className="px-5 md:px-6 py-10 md:py-25">
      <div className="mx-auto max-w-[640px] text-center">
        <Reveal>
          <p className="section-label">{content.label}</p>
        </Reveal>
        <SplitReveal
          html={content.heading}
          delay={0.1}
          className="display-serif about-heading mt-5 text-[30px] md:text-[40px]"
        />
        <Reveal delay={0.2}>
          <RichText
            html={content.paragraph}
            className="mx-auto mt-7 max-w-[505px] text-[16px] leading-[normal]"
          />
        </Reveal>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1400px] gap-3 md:mt-25 md:grid-cols-3">
        {content.cards.map((card, i) => (
          <motion.div
            key={i}
            className="h-full"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.12,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <TiltCard
              as="article"
              className="group flex h-full flex-col rounded-xl bg-foam px-5 pb-5 pt-5"
            >
              <div className="mx-auto rounded-2xl overflow-hidden flex w-full shrink-0 items-center justify-center">
                {card.image ? (
                  <Image
                    src={card.image.src}
                    alt={card.image.alt || `${card.titleA} ${card.titleB}`}
                    width={card.image.width}
                    height={card.image.height}
                    className="h-auto w-full drop-shadow-[0_18px_28px_rgba(20,41,43,0.18)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                ) : null}
              </div>
              <h3 className="italic font-bold mt-8 text-[25px] leading-[1.2] about-card">
                {card.titleA.replace(" +", "")} <span>+</span>
                <br />
                {card.titleB}
              </h3>
              <RichText
                html={card.description}
                className="mt-4 opacity-60 leading-[normal]"
              />
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
