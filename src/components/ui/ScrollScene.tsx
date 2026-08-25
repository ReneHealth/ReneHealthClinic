"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isDesktop, prefersReducedMotion } from "@/lib/motion";

interface ScrollSceneProps {
  children: ReactNode;
  className?: string;
  enter?: boolean;
  exit?: boolean;
}

export default function ScrollScene({
  children,
  className,
  enter = true,
  exit = true,
}: ScrollSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const scene = sceneRef.current;
      if (!wrap || !scene) return;

      if (prefersReducedMotion() || !isDesktop()) {
        gsap.set(scene, { rotateX: 0, opacity: 1 });
        return;
      }

      const flat = navigator.vendor === "Apple Computer, Inc.";

      gsap.set(
        scene,
        flat
          ? { opacity: 1, willChange: "opacity" }
          : {
              transformPerspective: Math.max(1200, scene.offsetHeight),
              opacity: 1,
              willChange: "transform, opacity",
            },
      );

      if (enter) {
        gsap.fromTo(
          scene,
          flat ? { opacity: 0.35 } : { rotateX: 14, opacity: 0.4 },
          {
            ...(flat ? null : { rotateX: 0 }),
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "clamp(top 92%)",
              end: "clamp(top 40%)",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      if (exit) {
        gsap.fromTo(scene, flat ? { opacity: 1 } : { rotateX: 0, opacity: 1 }, {
          ...(flat ? null : { rotateX: -12 }),
          opacity: flat ? 0.5 : 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "clamp(bottom 60%)",
            end: "clamp(bottom 5%)",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      }
    },
    { scope: wrapRef, dependencies: [enter, exit] },
  );

  return (
    <div ref={wrapRef} className={`overflow-x-clip ${className ?? ""}`}>
      <div ref={sceneRef}>{children}</div>
    </div>
  );
}
