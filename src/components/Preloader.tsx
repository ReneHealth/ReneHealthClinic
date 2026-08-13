"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";


const SESSION_KEY = "rene-preloaded";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface PreloaderProps {
  onDone: () => void;
}

function CurtainFace() {
  return (
    <>
      <div className="absolute inset-0 bg-pine" />
      <div className="absolute inset-0 [background:radial-gradient(115%_80%_at_50%_-8%,rgba(129,219,219,0.18),transparent_58%)]" />
      <div className="absolute inset-0 [background:radial-gradient(120%_120%_at_50%_45%,transparent_50%,rgba(10,22,24,0.6))]" />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <div className="flex flex-col leading-[0.88] text-mist">
          <span className="block overflow-hidden py-[0.06em]">
            <span
              style={{ opacity: 0 }}
              className="pl-line-a display-serif block text-[clamp(2.5rem,9vw,5.5rem)]"
            >
              Rene
            </span>
          </span>
          <span className="block overflow-hidden py-[0.06em]">
            <span
              style={{ opacity: 0 }}
              className="pl-line-b display-serif block text-[clamp(2.5rem,9vw,5.5rem)]"
            >
              Health
            </span>
          </span>
        </div>

        <span
          style={{ opacity: 0 }}
          className="pl-meta mt-8 text-[0.6875rem] font-medium tracking-[0.34em] text-teal-text uppercase"
        >
          Coquitlam · British Columbia
        </span>
      </div>

      <div className="pl-rule absolute inset-x-6 bottom-8 flex items-center gap-5 md:inset-x-12 md:bottom-12">
        <span className="text-[0.6875rem] tracking-[0.28em] text-mist/45 uppercase">
          Loading
        </span>
        <div className="relative h-px flex-1 bg-mist/15">
          <div className="pl-rule-fill absolute inset-0 origin-left scale-x-0 bg-teal-text" />
        </div>
        <span className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-mist/60">
          <span className="pl-count">0</span>
          <span className="ml-0.5">%</span>
        </span>
      </div>
    </>
  );
}

export default function Preloader({ onDone }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hidden) return;
    const { style } = document.documentElement;
    const previous = style.overflow;
    style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      style.overflow = previous;
    };
  }, [hidden]);

  useGSAP(
    () => {
      const prefersReduced = prefersReducedMotion();
      const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";

      const setCount = (n: number) => {
        const text = String(n);
        containerRef.current
          ?.querySelectorAll(".pl-count")
          .forEach((el) => (el.textContent = text));
      };

      let done = false;
      let safety = 0;
      const finish = () => {
        if (done) return;
        done = true;
        window.clearTimeout(safety);
        sessionStorage.setItem(SESSION_KEY, "1");
        setHidden(true);
        onDone();
      };

      if (alreadyPlayed || prefersReduced) {
        gsap.set([".pl-line-a", ".pl-line-b", ".pl-meta"], {
          autoAlpha: 1,
          yPercent: 0,
          y: 0,
        });
        gsap.set(".pl-rule-fill", { scaleX: 1 });
        setCount(100);
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: prefersReduced ? 0.2 : 0.4,
          ease: "power2.out",
          onComplete: finish,
        });
        return;
      }

      safety = window.setTimeout(finish, 7000);

      gsap.set(".pl-half-top", { transformOrigin: "50% 100%" });
      gsap.set(".pl-half-bottom", { transformOrigin: "50% 0%" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      tl.fromTo(
        ".pl-line-a",
        { yPercent: 115, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1.1 },
        0,
      );
      tl.fromTo(
        ".pl-line-b",
        { yPercent: 115, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1.1 },
        0.13,
      );
      tl.fromTo(
        ".pl-meta",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        0.6,
      );

      const progress = { value: 0 };
      tl.to(
        progress,
        {
          value: 100,
          duration: 1.9,
          ease: "power1.inOut",
          onUpdate: () => setCount(Math.round(progress.value)),
        },
        0.35,
      );
      tl.fromTo(
        ".pl-rule-fill",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.9, ease: "power1.inOut" },
        0.35,
      );

      const exitAt = 2.55;

      tl.to(".pl-rule", { autoAlpha: 0, duration: 0.45, ease: "power2.in" }, exitAt);

      tl.to(
        ".pl-half-top",
        {
          yPercent: -100,
          rotateX: 7,
          duration: 1.25,
          ease: "power3.inOut",
        },
        exitAt + 0.2,
      );
      tl.to(
        ".pl-half-bottom",
        {
          yPercent: 100,
          rotateX: -7,
          duration: 1.25,
          ease: "power3.inOut",
        },
        exitAt + 0.2,
      );
    },
    { scope: containerRef, dependencies: [onDone] },
  );

  useEffect(() => {
    if (!hidden) return;
    ScrollTrigger.refresh();
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ perspective: "2400px" }}
      aria-hidden="true"
    >
      <div className="pl-half-top absolute inset-x-0 top-0 bottom-1/2 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[200%]">
          <CurtainFace />
        </div>
      </div>
      <div className="pl-half-bottom absolute inset-x-0 top-1/2 bottom-0 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[200%]">
          <CurtainFace />
        </div>
      </div>
    </div>
  );
}
