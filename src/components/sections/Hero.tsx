"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import type { HeroPanel } from "@/lib/types";
import { useIntroDone } from "@/components/providers/IntroProvider";
import SplitReveal from "@/components/ui/SplitReveal";
import RichText from "@/components/ui/RichText";
import { canHover } from "@/lib/motion";

export default function Hero({
  panels,
  id,
}: {
  panels: HeroPanel[];
  id?: string;
}) {
  const introDone = useIntroDone();
  const sectionRef = useRef<HTMLElement>(null);

  const enter = (panel: number, order: number, offset: number) => ({
    initial: { opacity: 0, y: offset },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: offset },
    transition: {
      delay: panel * 0.15 + order * 0.15,
      duration: order === 0 ? 1 : 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (!canHover()) return;

      const layers = gsap.utils.toArray<HTMLElement>(".hero-photo");
      gsap.set(layers, { scale: 1.08 });

      const movers = layers.map((layer) => ({
        x: gsap.quickTo(layer, "xPercent", {
          duration: 0.8,
          ease: "power3.out",
        }),
        y: gsap.quickTo(layer, "yPercent", {
          duration: 0.8,
          ease: "power3.out",
        }),
      }));

      const onMove = (e: PointerEvent) => {
        const r = section.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach(({ x, y }) => {
          x(px * -3);
          y(py * -3);
        });
      };

      section.addEventListener("pointermove", onMove);
      return () => section.removeEventListener("pointermove", onMove);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative flex flex-col h-[100svh] min-h-[640px] md:flex-row"
    >
      {panels.map((panel, i) => (
        <div
          key={i}
          className="relative flex min-h-[40svh] overflow-hidden md:min-h-0 flex-1 basis-0"
        >
          <div className="hero-photo absolute inset-0">
            {panel.image ? (
              <Image
                src={panel.image.src}
                alt={panel.image.alt || panel.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>

          <div className="absolute inset-0 bg-black/30 md:hidden" />

          <div
            className={`relative z-10 flex w-full flex-col items-center justify-center px-8 py-14 text-center text-white md:py-0 ${i === 0 ? "pt-35 md:pt-0" : ""}`}
          >
            <SplitReveal
              as="h1"
              trigger="intro"
              delay={i * 0.15}
              className="display-serif text-4xl md:text-[45px] lg:text-[50px]"
            >
              {panel.title}
            </SplitReveal>

            <motion.div {...enter(i, 1, 24)}>
              <RichText
                html={panel.description}
                className="mt-5 max-w-[350px] text-[16px] leading-[normal] text-white"
              />
            </motion.div>

            {panel.cta || panel.bookCta ? (
              <motion.div
                {...enter(i, 2, 24)}
                className="mt-4 flex flex-col items-center gap-4 md:mt-8"
              >
                {panel.cta ? (
                  <>
                    <Link
                      href={panel.cta.href}
                      target={panel.cta.target}
                      rel={
                        panel.cta.target === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="touch-target inline-flex items-center gap-1.5 text-white underline underline-offset-4 transition-colors duration-300 hover:text-aqua md:hidden"
                    >
                      {panel.cta.label}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                    <span className="hidden md:block">
                      <Button cta={panel.cta} variant="banner" size="sm" />
                    </span>
                  </>
                ) : null}

                {panel.bookCta ? (
                  <span className="md:hidden">
                    <Button cta={panel.bookCta} variant="banner" size="sm" />
                  </span>
                ) : null}
              </motion.div>
            ) : null}
          </div>
        </div>
      ))}
    </section>
  );
}
