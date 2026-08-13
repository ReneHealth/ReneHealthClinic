"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { SectionHeader, SectionImage } from "@/lib/types/sections";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";
import { useRailScrollChain } from "@/lib/useRailScrollChain";

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex gap-0.5 text-amber-400"
      aria-label={`${count} star rating`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export type ReviewItemDataType = {
  id?: string;
  tagline?: string;
  quote?: string;
  name?: string;
  avatar?: SectionImage | null;
  rating?: number;
};

export type ReviewsDataType = SectionHeader & {
  items?: ReviewItemDataType[];
};

export default function Reviews({ content }: { content?: ReviewsDataType }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max <= 0 ? 0 : el.scrollLeft / max);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.pointerType === "touch") return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft =
      drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.releasePointerCapture(e.pointerId);
  };

  useRailScrollChain(trackRef);

  return (
    <section className="overflow-hidden bg-aqua py-10 md:py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-6">
        <div className="max-w-[560px]">
          <SectionHeading
            label={content?.label}
            heading={content?.heading ?? ""}
            paragraph={content?.paragraph}
            from="left"
            labelClassName="!text-white"
            headingClassName="display-serif mt-2 text-[30px] !leading-[normal] text-ink md:text-[50px]"
            paragraphClassName="mt-3 text-[16px] leading-[normal]"
          />
        </div>
      </div>

      <div
        ref={trackRef}
        data-lenis-prevent-touch
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="no-scrollbar mt-5 md:mt-12 flex snap-x gap-3 overflow-x-auto overscroll-x-contain pt-2 pb-1 pl-6 md:pl-[max(5rem,calc((100vw-1400px)/2+1.5rem))]"
      >
        {(content?.items ?? []).map((review, reviewIndex) => (
          <article
            key={review.id ?? reviewIndex}
            className="relative flex w-[86vw] max-w-[530px] shrink-0 flex-col rounded-xl bg-mist p-6 md:p-8 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
          >
            <p className="section-label">{review.tagline}</p>
            <RichText
              html={review.quote ?? ""}
              className="mt-4 grow text-[20px] md:text-[25px] italic leading-[28px] opacity-50"
            />
            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-foam text-sm font-bold text-pine">
                {review.avatar?.src ? (
                  <Image
                    src={review.avatar.src}
                    alt={review.avatar.alt || review.name || ""}
                    width={50}
                    height={50}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  (review.name ?? "").charAt(0)
                )}
              </div>
              <div>
                <p className="text-[18px] font-bold">{review.name}</p>
                <Stars count={review.rating ?? 5} />
              </div>
            </div>
            <Image
              src="/images/quote-icon.svg"
              alt=""
              width={58}
              height={50}
              className="absolute bottom-[10px] right-[10px]"
            />
          </article>
        ))}
        <div aria-hidden="true" className="w-6 shrink-0" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mt-10 h-[4px] w-[500px] max-w-full bg-white/50 rounded-[5px] overflow-hidden">
          <div
            className="h-[4px] bg-white transition-[width] rounded-[5px] overflow-hidden duration-150"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
