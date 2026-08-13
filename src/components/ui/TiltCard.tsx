"use client";

import {
  createElement,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { canHover } from "@/lib/motion";

type ContainerTag = "div" | "article" | "li";

interface TiltCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: ContainerTag;
  maxTilt?: number;
  liftScale?: number;
}

export default function TiltCard({
  children,
  className,
  as = "div",
  maxTilt = 14,
  liftScale = 1.05,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (!canHover()) return;

      gsap.set(el, { transformPerspective: 800 });

      const rotateX = gsap.quickTo(el, "rotateX", {
        duration: 0.8,
        ease: "power2.out",
      });
      const rotateY = gsap.quickTo(el, "rotateY", {
        duration: 0.8,
        ease: "power2.out",
      });
      const scale = gsap.quickTo(el, "scale", {
        duration: 0.6,
        ease: "power2.out",
      });

      let leaveTimer = 0;

      const onEnter = () => {
        window.clearTimeout(leaveTimer);
        el.style.willChange = "transform";
        el.style.zIndex = "10";
      };

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        rotateX(py * -maxTilt);
        rotateY(px * maxTilt);
        scale(liftScale);
      };

      const onLeave = () => {
        rotateX(0);
        rotateY(0);
        scale(1);
        leaveTimer = window.setTimeout(() => {
          el.style.willChange = "auto";
          el.style.zIndex = "";
        }, 900);
      };

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        window.clearTimeout(leaveTimer);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref, dependencies: [maxTilt, liftScale] },
  );

  return createElement(
    as,
    { ref: ref as Ref<HTMLElement>, className, ...rest },
    children,
  );
}
