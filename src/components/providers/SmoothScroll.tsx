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

function hashTarget(hash: string): HTMLElement | null {
  if (hash.length < 2) return null;
  return document.getElementById(decodeURIComponent(hash.slice(1)));
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const target = hashTarget(window.location.hash);
    if (!target) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }

    let frame = 0;
    let top = -1;
    let stable = 0;
    let budget = 120;

    const land = () => {
      // Lenis keeps the previous page's limit
      lenis.resize();
      const next = target.getBoundingClientRect().top + window.scrollY;
      stable = next === top ? stable + 1 : 0;
      top = next;

      if (stable < 4 && budget-- > 0) {
        lenis.scrollTo(Math.max(0, next - window.innerHeight), {
          immediate: true,
        });
        frame = requestAnimationFrame(land);
        return;
      }

      frame = requestAnimationFrame(() =>
        lenis.scrollTo(target, {
          onComplete: () => lenis.scrollTo(target, { duration: 0.4 }),
        }),
      );
    };

    frame = requestAnimationFrame(land);
    return () => cancelAnimationFrame(frame);
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

    const onAnchorClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const link = (e.target as HTMLElement | null)?.closest("a");
      if (
        !link ||
        link.target === "_blank" ||
        link.origin !== window.location.origin ||
        link.pathname !== window.location.pathname
      )
        return;

      const target = hashTarget(link.hash);
      if (!target) return;

      e.preventDefault();
      window.history.pushState(null, "", link.hash);
      lenis.scrollTo(target);
    };
    document.addEventListener("click", onAnchorClick, true);

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
      document.removeEventListener("click", onAnchorClick, true);
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
