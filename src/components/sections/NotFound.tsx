"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SplitReveal from "@/components/ui/SplitReveal";
import { useIntroDone } from "@/components/providers/IntroProvider";
import type { CtaLink } from "@/lib/types/common";

interface NotFoundProps {
  booking: CtaLink;
  phone: string;
  phoneHref: string;
}

export default function NotFound({ booking, phone, phoneHref }: NotFoundProps) {
  const introDone = useIntroDone();

  const enter = (order: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: {
      delay: order * 0.12,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-white">
      <div className="noise-layer absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-44 pb-24 md:px-6 md:pt-52 md:pb-32">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.p {...enter(0)} className="section-label">
            Error 404
          </motion.p>

          <SplitReveal
            as="h1"
            trigger="intro"
            delay={0.1}
            className="display-serif mt-2 text-[34px] leading-[1.1] sm:text-[46px] md:text-[64px]"
          >
            We can&rsquo;t find that page
          </SplitReveal>

          <motion.p
            {...enter(2)}
            className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[normal] text-white/80"
          >
            The link may be out of date, or the page may have moved. You can
            head back to the homepage, or book an appointment straight away.
          </motion.p>

          <motion.div
            {...enter(3)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              cta={booking}
              variant="solid"
              className="w-full sm:w-auto"
            />
            <Button
              cta={{ label: "Back To Home", href: "/" }}
              className="w-full sm:w-auto"
            />
          </motion.div>
        </div>

        <motion.p
          {...enter(4)}
          className="mt-12 text-center text-[15px] text-white/60"
        >
          Still stuck? Call{" "}
          <a
            href={phoneHref}
            className="touch-target text-white underline underline-offset-4 transition-colors duration-300 hover:text-aqua"
          >
            {phone}
          </a>{" "}
          or{" "}
          <Link
            href="/contact-us"
            className="touch-target text-white underline underline-offset-4 transition-colors duration-300 hover:text-aqua"
          >
            get in touch
          </Link>
          .
        </motion.p>
      </div>
    </main>
  );
}
