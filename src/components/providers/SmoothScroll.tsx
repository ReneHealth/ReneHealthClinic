"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/motion";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    const prefersReduced = prefersReducedMotion();
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    ScrollTrigger.config({ ignoreMobileResize: true });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let lastHeight = 0;
    let frame = 0;
    const refresh = () => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
      lastHeight = document.body.scrollHeight;
    };

    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    let lastWidth = window.innerWidth;
    let lastViewport = window.innerHeight;
    const observer = new ResizeObserver(() => {
      const width = window.innerWidth;
      const viewport = window.innerHeight;
      const urlBarOnly = width === lastWidth && viewport !== lastViewport;
      lastWidth = width;
      lastViewport = viewport;
      if (urlBarOnly || document.body.scrollHeight === lastHeight) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(refresh);
    });
    observer.observe(document.body);

    return () => {
      window.removeEventListener("load", refresh);
      cancelAnimationFrame(frame);
      observer.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
