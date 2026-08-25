"use client";

import { useEffect, type RefObject } from "react";

const EDGE_EPSILON = 1;
const LINE_HEIGHT = 16;
const EASE = 0.16;

type Rail = Pick<
  HTMLElement,
  | "scrollLeft"
  | "scrollWidth"
  | "clientWidth"
  | "clientHeight"
  | "setAttribute"
  | "removeAttribute"
  | "addEventListener"
  | "removeEventListener"
>;

export function attachRailScrollChain(el: Rail): () => void {
  let target = 0;
  let frame = 0;

  const step = () => {
    const diff = target - el.scrollLeft;
    if (Math.abs(diff) < 1) {
      el.scrollLeft = target;
      frame = 0;
      return;
    }
    const move = diff * EASE;
    el.scrollLeft += Math.abs(move) < 1 ? Math.sign(diff) : move;
    frame = requestAnimationFrame(step);
  };

  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

    const delta =
      e.deltaMode === 1
        ? e.deltaY * LINE_HEIGHT
        : e.deltaMode === 2
          ? e.deltaY * el.clientHeight
          : e.deltaY;

    const max = el.scrollWidth - el.clientWidth;
    const from = frame ? target : el.scrollLeft;
    const atEdge =
      delta > 0 ? from >= max - EDGE_EPSILON : from <= EDGE_EPSILON;

    if (atEdge) {
      el.removeAttribute("data-lenis-prevent-wheel");
      return;
    }

    el.setAttribute("data-lenis-prevent-wheel", "");
    e.preventDefault();

    target = Math.max(0, Math.min(max, from + delta));
    if (!frame) frame = requestAnimationFrame(step);
  };

  el.addEventListener("wheel", onWheel as EventListener, { passive: false });
  return () => {
    cancelAnimationFrame(frame);
    el.removeEventListener("wheel", onWheel as EventListener);
    el.removeAttribute("data-lenis-prevent-wheel");
  };
}

export function useRailScrollChain(
  ref: RefObject<HTMLDivElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled || !ref.current) return;
    return attachRailScrollChain(ref.current);
  }, [ref, enabled]);
}
