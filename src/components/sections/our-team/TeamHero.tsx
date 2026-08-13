"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TeamHeroType as Content } from "@/lib/teamContent";
import { useIntroDone } from "@/components/providers/IntroProvider";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
export default function TeamHero({ content }: { content: Content }) {
  const introDone = useIntroDone();
  const enter = (order: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: {
      delay: order * 0.15,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });
  return (
    <section className="relative flex h-[100lvh] min-h-[650px] max-h-[800px] items-center justify-center overflow-hidden">
      {content.image ? (
        <div className="absolute inset-0">
          <Image
            src={content.image.src}
            alt={content.image.alt || content.heading}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="noise-layer absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center px-5 text-center text-white md:px-6">
        <motion.p
          {...enter(0)}
          className="section-label rounded-full bg-white/15 px-4 py-1.5 text-white/90 backdrop-blur-[2px]"
        >
          {content.label}
        </motion.p>
        <SplitReveal
          as="h1"
          trigger="intro"
          delay={0.15}
          className="display-serif mt-4 max-w-[900px] text-[30px] md:text-[50px]"
        >
          {content.heading}
        </SplitReveal>
        <motion.div {...enter(2)}>
          <RichText
            html={content.paragraph}
            className="mt-5 max-w-[750px] text-[16px] leading-[normal] text-white/90"
          />
        </motion.div>
        {content.cta ? (
          <motion.div {...enter(3)} className="mt-8">
            <Link
              href={content.cta.href}
              target={content.cta.target}
              rel={
                content.cta.target === "_blank"
                  ? "noopener noreferrer"
                  : undefined
              }
              className="btn-3d flex items-center gap-2 rounded-full border border-white/70 bg-white px-8 py-[11px] text-sm text-ink transition-all duration-500 hover:bg-transparent hover:text-white"
            >
              {content.cta.label}
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path
                  d="M2.5 5L6.5 9L10.5 5"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
