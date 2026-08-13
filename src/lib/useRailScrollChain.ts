"use client";

import { useEffect, type RefObject } from "react";

const EDGE_EPSILON = 1;

export function useRailScrollChain(
  ref: RefObject<HTMLDivElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const max = el.scrollWidth - el.clientWidth;
      const atEdge =
        e.deltaY > 0
          ? el.scrollLeft >= max - EDGE_EPSILON
          : el.scrollLeft <= EDGE_EPSILON;

      if (atEdge) {
        el.removeAttribute("data-lenis-prevent-wheel");
        return;
      }

      el.setAttribute("data-lenis-prevent-wheel", "");
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeAttribute("data-lenis-prevent-wheel");
    };
  }, [ref, enabled]);
}
