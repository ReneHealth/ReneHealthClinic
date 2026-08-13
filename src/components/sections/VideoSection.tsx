"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isDesktop, prefersReducedMotion } from "@/lib/motion";
import type { VideoSectionContent } from "@/lib/types";

const REST_WIDTH = 1360;
const MIN_GUTTER = 24;
const REST_RADIUS = 24;
const bustCache = (src: string) =>
  `${src}${src.includes("?") ? "&" : "?"}cb=${Date.now()}`;

const logPlayFailure = (error: unknown) => {
  if (error instanceof DOMException && error.name === "NotAllowedError") return;
  console.error("[VideoSection] play() failed", error);
};

interface VideoSectionProps {
  content: VideoSectionContent;
  className?: string;
}

export default function VideoSection({
  content,
  className = "",
}: VideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const [src, setSrc] = useState(content.src);
  const retriedRef = useRef(false);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const handleLoadedMetadata = useCallback(() => {
    if (!retriedRef.current) return;
    if (triggerRef.current?.isActive && isDesktop()) {
      void videoRef.current?.play().catch(logPlayFailure);
    }
  }, []);

  const handleError = useCallback(() => {
    const code = videoRef.current?.error?.code;
    if (
      code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED &&
      !retriedRef.current
    ) {
      retriedRef.current = true;
      setSrc(bustCache(content.src));
      return;
    }
    console.error(
      `[VideoSection] ${content.src} failed to load (MediaError code ${code ?? "unknown"})`,
    );
  }, [content.src]);

  const start = useCallback(() => {
    setStarted(true);
    void videoRef.current?.play().catch(logPlayFailure);
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next) start();
  }, [start]);

  useGSAP(
    () => {
      const video = videoRef.current;

      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onToggle: (self) => {
          if (!video) return;
          if (self.isActive) {
            if (isDesktop()) void video.play().catch(logPlayFailure);
          } else {
            video.pause();
          }
        },
      });

      if (prefersReducedMotion()) {
        gsap.set(".video-frame", { clipPath: "inset(0px round 0px)" });
        return;
      }

      const sideInset = () => {
        const w =
          document.querySelector<HTMLElement>(".video-frame")?.offsetWidth ??
          window.innerWidth;
        const target = Math.min(REST_WIDTH, w - MIN_GUTTER * 2);
        return Math.max(0, (w - target) / 2);
      };

      gsap.fromTo(
        ".video-frame",
        {
          clipPath: () =>
            `inset(0px ${sideInset()}px 0px ${sideInset()}px round ${REST_RADIUS}px)`,
        },
        {
          clipPath: "inset(0px 0px 0px 0px round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "top 28%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={` pb-10 md:pb-32 ${className}`}>
      <div className="video-frame relative aspect-[1360/600] max-h-[86svh] w-full will-change-[clip-path]">
        <video
          ref={videoRef}
          src={src}
          poster={content.poster || undefined}
          preload="metadata"
          playsInline
          loop
          muted={muted}
          onError={handleError}
          onLoadedMetadata={handleLoadedMetadata}
          aria-label={content.label || undefined}
          className="h-full w-full object-cover"
        />

        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label="Play the clinic tour video"
            className="btn-3d absolute inset-0 grid place-items-center md:hidden"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-mist shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_10px_30px_-8px_rgba(20,41,43,0.55)] backdrop-blur-md">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="btn-3d absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-white/12 text-mist shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_10px_30px_-8px_rgba(20,41,43,0.55)] backdrop-blur-md hover:bg-white/20 md:bottom-8 md:right-8"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H3v6h3l5 4z" />
            {muted ? (
              <>
                <path d="m17 9 4 6" />
                <path d="m21 9-4 6" />
              </>
            ) : (
              <>
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 6a9 9 0 0 1 0 12" />
              </>
            )}
          </svg>
        </button>
      </div>
    </section>
  );
}
