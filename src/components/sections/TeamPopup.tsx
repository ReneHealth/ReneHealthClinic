"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { TeamMemberType } from "@/lib/teamContent";
import RichText from "@/components/ui/RichText";
import { getLenis } from "@/lib/lenis";

interface TeamPopupProps {
  member: TeamMemberType | null;
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 44 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 24,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function TeamPopup({ member, onClose }: TeamPopupProps) {
  const [isMounted, setIsMounted] = useState(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const isOpen = !!member;

  useEffect(() => {
    if (!isOpen) return;

    const lenis = getLenis();
    lenis?.stop();

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-999 flex overscroll-contain items-center justify-center bg-ink/70 p-5 backdrop-blur-md"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            data-lenis-prevent
            className="brand-scrollbar relative max-h-[92vh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-[0_40px_100px_-24px_rgba(20,41,43,0.55)] ring-1 ring-black/5 lg:flex lg:flex-col lg:overflow-hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-aqua via-teal-text to-aqua"
            />

            <div className="sticky top-0 z-16 h-0">
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close"
                variants={itemVariants}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-aqua hover:text-ink cursor-pointer"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              </motion.button>
            </div>

            <div className="grid grid-rows-[auto_auto] lg:min-h-0 lg:grid-cols-[360px_minmax(0,1fr)] lg:grid-rows-1 lg:overflow-hidden">
              <aside className="brand-scrollbar relative bg-foam p-8 text-center lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain">
                {member.popup.image.src ? (
                  <motion.div
                    variants={itemVariants}
                    className="mx-auto max-w-50 overflow-hidden rounded-full shadow-[0_20px_50px_-16px_rgba(20,41,43,0.35)]"
                  >
                    <Image
                      src={member.popup.image.src}
                      alt={member.popup.image.alt}
                      width={600}
                      height={800}
                      className="h-auto w-full object-cover"
                    />
                  </motion.div>
                ) : null}
                <motion.h2
                  variants={itemVariants}
                  className="display-serif mt-6 text-4xl"
                >
                  {member.popup.title}
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="mt-2 text-slate-body"
                >
                  {member.popup.designation}
                </motion.p>
                {member.popup.buttonLabel && (
                  <motion.div variants={itemVariants}>
                    <Link
                      href={member.popup.buttonUrl ?? "#"}
                      target="_blank"
                      className="transition-all btn-3d mt-8 inline-flex rounded-full bg-aqua px-7 py-3 transition-transform duration-300 hover:scale-105"
                    >
                      {member.popup.buttonLabel}
                    </Link>
                  </motion.div>
                )}
              </aside>
              <motion.div
                variants={itemVariants}
                className="brand-scrollbar cms-default p-5 md:p-12 lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain"
              >
                <RichText
                  html={member.popup.introduction}
                  className="max-w-none"
                />
                {member.popup.content && (
                  <motion.div
                    variants={itemVariants}
                    className="mt-5 border-t border-line pt-5"
                  >
                    <RichText
                      html={member.popup.content}
                      className="max-w-none"
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
