export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

export const canHover = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !prefersReducedMotion();
