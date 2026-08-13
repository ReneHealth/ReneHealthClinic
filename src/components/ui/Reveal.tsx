"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isDesktop, prefersReducedMotion } from "@/lib/motion";


interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left";
}

export default function Reveal({
  children,
  delay = 0,
  className,
  from = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          filter: "none",
          clearProps: "willChange",
        });
        return;
      }

      const offset =
        from === "left"
          ? { x: -48, y: 0, rotateY: 14 }
          : { x: 0, y: 32, rotateX: -8 };
      const blur = isDesktop();
      gsap.fromTo(
        el,
        {
          opacity: 0,
          ...offset,
          ...(blur ? { filter: "blur(8px)" } : null),
          transformPerspective: 700,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          ...(blur ? { filter: "blur(0px)" } : null),
          duration: 1,
          delay,
          ease: "power3.out",
          onComplete: () => gsap.set(el, { clearProps: "willChange,filter" }),
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [delay, from] },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}
