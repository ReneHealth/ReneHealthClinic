"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useIntroDone } from "@/components/providers/IntroProvider";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
export type ImageDataType = {
  src?: string;
  alt?: string;
};
export type CtaLinkType = {
  href?: string;
  label?: string;
  target?: string;
};
export type GlobalInnerHeroDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  image?: ImageDataType | null;
  cta?: CtaLinkType | null;
};
export type GlobalInnerHeroPropsType = {
  content?: GlobalInnerHeroDataType;
  className?: string;
};
export default function GlobalInnerHero({
  content,
  className = "",
}: GlobalInnerHeroPropsType) {
  const introDone = useIntroDone();
  const typedContent = content;
  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const imageSrc = typedContent?.image?.src ?? "";
  const imageAlt = typedContent?.image?.alt ?? heading;
  const cta = typedContent?.cta ?? null;
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
    <section
      className={`relative flex h-[100lvh] min-h-[650px] max-h-[800px] items-center justify-center overflow-hidden pt-[150px] md:pt-0 ${className}`}
    >
      {imageSrc ? (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="noise-layer absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center px-5 text-center text-white md:px-6">
        {label ? (
          <motion.p
            {...enter(0)}
            className="section-label rounded-full bg-white/15 px-4 py-1.5 text-white/90 backdrop-blur-[2px]"
          >
            {label}
          </motion.p>
        ) : null}
        <SplitReveal
          as="h1"
          trigger="intro"
          delay={0.15}
          className="display-serif mt-4 max-w-[900px] text-[30px] md:text-[50px]"
        >
          {heading}
        </SplitReveal>
        <motion.div {...enter(2)}>
          <RichText
            html={paragraph}
            className="mt-5 max-w-[750px] text-[16px] leading-[normal] text-white/90"
          />
        </motion.div>
        {cta ? (
          <motion.div {...enter(3)} className="mt-8">
            <Button cta={cta} variant="banner" />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
