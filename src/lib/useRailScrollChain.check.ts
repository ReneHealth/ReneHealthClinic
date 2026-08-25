import assert from "node:assert/strict";
import { attachRailScrollChain } from "./useRailScrollChain.ts";

let queue: FrameRequestCallback[] = [];
globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
  queue.push(cb)) as typeof requestAnimationFrame;
globalThis.cancelAnimationFrame = (() => {}) as typeof cancelAnimationFrame;
const flush = (frames = 200) => {
  for (let i = 0; i < frames && queue.length; i++) {
    const [cb, ...rest] = queue;
    queue = rest;
    cb(i);
  }
};

function makeRail(
  scrollWidth = 1756,
  clientWidth = 851,
  integerScroll = false,
) {
  let handler: ((e: any) => void) | null = null;
  const attrs = new Set<string>();
  let left = 0;
  const el = {
    get scrollLeft() {
      return left;
    },
    set scrollLeft(v: number) {
      left = integerScroll ? Math.trunc(v) : v;
    },
    scrollWidth,
    clientWidth,
    clientHeight: 400,
    setAttribute: (n: string) => attrs.add(n),
    removeAttribute: (n: string) => attrs.delete(n),
    addEventListener: (_: string, h: any) => (handler = h),
    removeEventListener: () => (handler = null),
  };
  const cleanup = attachRailScrollChain(el as never);
  let prevented = 0;
  const wheel = (deltaY: number, deltaMode = 0, deltaX = 0) =>
    handler?.({ deltaY, deltaX, deltaMode, preventDefault: () => prevented++ });
  return {
    el,
    cleanup,
    wheel,
    attrs,
    prevented: () => prevented,
    max: scrollWidth - clientWidth,
  };
}

{
  const r = makeRail();
  r.wheel(3, 1);
  r.wheel(3, 1);
  r.wheel(3, 1);
  assert.equal(r.el.scrollLeft, 0, "no jump inside the wheel handler");
  flush(1);
  assert.ok(r.el.scrollLeft > 0 && r.el.scrollLeft < 144, "eases, not jumps");
  flush();
  assert.equal(Math.round(r.el.scrollLeft), 144, "lands on 3 notches x 16px");
  assert.ok(r.attrs.has("data-lenis-prevent-wheel"), "Lenis held off mid-rail");
  assert.equal(r.prevented(), 3);
}

{
  const r = makeRail();
  for (let i = 0; i < 20; i++) r.wheel(500);
  flush();
  assert.equal(Math.round(r.el.scrollLeft), r.max, "clamped to the last card");
  r.wheel(500);
  assert.ok(
    !r.attrs.has("data-lenis-prevent-wheel"),
    "page scrolls on past end",
  );
  const before = r.prevented();
  r.wheel(500);
  assert.equal(r.prevented(), before, "no preventDefault once handed off");
}

{
  const r = makeRail();
  r.wheel(300);
  flush();
  for (let i = 0; i < 10; i++) r.wheel(-300);
  flush();
  assert.equal(Math.round(r.el.scrollLeft), 0);
  r.wheel(-300);
  assert.ok(
    !r.attrs.has("data-lenis-prevent-wheel"),
    "page scrolls up past start",
  );
}

{
  const r = makeRail(1756, 851, true);
  r.wheel(3, 1);
  r.wheel(3, 1);
  r.wheel(3, 1);
  flush();
  assert.equal(r.el.scrollLeft, 144, "lands exactly, no sub-pixel stall");
  assert.equal(queue.length, 0, "rAF loop exited instead of spinning");

  for (let i = 0; i < 20; i++) r.wheel(500);
  flush();
  assert.equal(r.el.scrollLeft, r.max, "clamps exactly to the end");
  assert.equal(queue.length, 0);

  for (let i = 0; i < 20; i++) r.wheel(-500);
  flush();
  assert.equal(r.el.scrollLeft, 0, "returns exactly to the start");
  assert.equal(queue.length, 0);
}

{
  const r = makeRail();
  r.wheel(4, 0, 40);
  assert.equal(r.prevented(), 0, "horizontal gestures pass through");
  assert.equal(r.el.scrollLeft, 0);
}

{
  const r = makeRail();
  r.wheel(1, 2);
  flush();
  assert.equal(Math.round(r.el.scrollLeft), 400);
}

console.log("useRailScrollChain: all checks passed");
