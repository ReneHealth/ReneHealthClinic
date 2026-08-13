"use client";

import { createElement, useRef, type ReactNode, type Ref } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/components/providers/IntroProvider";
import { isDesktop, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(SplitText);

type HeadingTag = "h1" | "h2" | "h3" | "p";

interface SplitRevealProps {
  children?: ReactNode;
  html?: string;
  as?: HeadingTag;
  delay?: number;
  className?: string;
  trigger?: "scroll" | "intro";
}

export default function SplitReveal({
  children,
  html,
  as = "h2",
  delay = 0,
  className,
  trigger = "scroll",
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const introDone = useIntroDone();
  const ready = trigger === "intro" ? introDone : true;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !ready) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      gsap.set(el, { opacity: 1 });

      const filters = isDesktop();

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        onSplit: (self) =>
          gsap.fromTo(
            self.lines,
            {
              yPercent: 110,
              autoAlpha: 0,
              ...(filters
                ? {
                    filter:
                      "blur(3px) drop-shadow(0px 26px 18px rgba(20,41,43,0.4))",
                  }
                : null),
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              ...(filters
                ? {
                    filter:
                      "blur(0px) drop-shadow(0px 0px 0px rgba(20,41,43,0))",
                  }
                : null),
              duration: 1,
              delay,
              stagger: 0.12,
              ease: "power4.out",
              scrollTrigger:
                trigger === "scroll"
                  ? {
                      trigger: el,
                      start: "top 88%",
                      once: true,
                      invalidateOnRefresh: true,
                    }
                  : undefined,
            },
          ),
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [ready, delay, trigger] },
  );

  const props = {
    ref: ref as Ref<HTMLElement>,
    className,
    style: { opacity: 0 },
  };

  return html !== undefined
    ? createElement(as, {
        ...props,
        dangerouslySetInnerHTML: { __html: unwrapParagraph(html) },
      })
    : createElement(as, props, children);
}

function unwrapParagraph(html: string): string {
  const single = /^\s*<p>(?![\s\S]*<p[\s>])([\s\S]*)<\/p>\s*$/i.exec(html);
  return single ? single[1] : html;
}
