"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CtaLink } from "@/lib/types";
import { useIntroDone } from "@/components/providers/IntroProvider";

export default function BookButton({ booking }: { booking: CtaLink }) {
  const introDone = useIntroDone();

  if (!booking.label) return null;

  return (
    <motion.div
      initial={{ x: -60, opacity: 0 }}
      animate={introDone ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
      transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <Link
        href={booking.href}
        target={booking.target}
        rel={booking.target === "_blank" ? "noopener noreferrer" : undefined}
        className="group relative isolate flex items-center justify-center overflow-hidden bg-aqua py-[21px] px-[21.3px] text-[14px] font-medium leading-[normal] tracking-[0.10em] text-ink uppercase shadow-[0_10px_30px_-10px_rgba(32,58,66,0.55)] transition-[translate,box-shadow,color] duration-500 [transition-timing-function:var(--ease-out-expo)] [writing-mode:vertical-rl] rotate-180 hover:translate-x-[-5px] hover:text-mist hover:shadow-[0_22px_45px_-12px_rgba(32,58,66,0.75)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-y-100"
        />
        <span
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 w-px bg-mist/0 transition-colors duration-500 group-hover:bg-mist/40"
        />
        {booking.label}
      </Link>
    </motion.div>
  );
}
