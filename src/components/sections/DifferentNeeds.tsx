"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { DifferentNeedsSection, NeedItem } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

const spacingFor = (count: number) => (count > 0 ? 360 / count : 0);

const R_OUTER = 539 / 542;
const R_MID = 0.66;
const R_TIP = 0.35;
const W_THICK = 3.2;
const W_THIN = 2.1;
const RIM_FROM_TOP = 0.1467;
const POINTER_LEN = 0.1651;
const TAIL_LEN = 0.1568;

function Dial({ active, items }: { active: number; items: NeedItem[] }) {
  const c = 542;
  const spacing = spacingFor(items.length);
  const r = (n: number) => Math.round(n * 1000) / 1000;
  return (
    <svg viewBox="0 0 1084 1084" className="h-full w-full" aria-hidden="true">
      <circle
        cx={c}
        cy={c}
        r={541}
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
      />
      {items.map((item, i) => {
        const a = ((i * spacing) / 180) * Math.PI;
        const sin = Math.sin(a);
        const cos = Math.cos(a);
        const at = (radius: number) =>
          [r(c + sin * c * radius), r(c - cos * c * radius)] as const;
        const [ox, oy] = at(R_OUTER);
        const [mx, my] = at(R_MID);
        const [tx, ty] = at(R_TIP);
        return (
          <g
            key={i}
            strokeOpacity={active === i ? 0 : 1}
            className="[transition:stroke-opacity_0.4s_ease]"
          >
            <line
              x1={ox}
              y1={oy}
              x2={mx}
              y2={my}
              stroke="rgba(255,255,255,0.92)"
              strokeWidth={W_THICK}
            />
            <line
              x1={mx}
              y1={my}
              x2={tx}
              y2={ty}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={W_THIN}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function DifferentNeeds({
  content,
}: {
  content: DifferentNeedsSection;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const items = content.items;
  const spacing = spacingFor(items.length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(innerRef.current, {
          scale: 0.8,
          autoAlpha: 0,
          transformOrigin: "bottom center",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            once: true,
          },
        });
      });

      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.desktop) return;

          const steps = items.length - 1;
          if (steps < 1) return;
          let current = 0;

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${items.length * 60}%`,
            pin: true,
            anticipatePin: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * steps);
              if (idx === current) return;
              current = idx;
              gsap.to(wheelRef.current, {
                rotation: -idx * spacing,
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
              });
              setActive(idx);
            },
          });
        },
      );
    },
    { scope: sectionRef, dependencies: [items.length, spacing] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-pine text-white"
    >
      <div className="relative flex min-h-svh flex-col items-center px-5 md:px-6 pt-10 md:h-svh md:pt-28">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionHeading
            label={content.label}
            heading={content.heading}
            paragraph={content.paragraph}
            labelClassName="!text-teal-text"
            headingClassName="display-serif text-[30px] md:text-[45px] lg:text-[50px]"
            paragraphClassName="mx-auto mt-2 max-w-[720px] text-[16px] leading-normal"
          />
        </div>

        <div
          ref={innerRef}
          className="relative mt-10 hidden w-full flex-1 md:block"
          style={
            {
              "--dial": "clamp(560px, min(75vw, calc(240svh - 960px)), 1084px)",
              perspective: "1400px",
            } as CSSProperties
          }
        >
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: `calc(var(--dial) * ${RIM_FROM_TOP})`,
              width: "var(--dial)",
              height: "var(--dial)",
            }}
          >
            <div className="h-full w-full [transform-style:preserve-3d] [transform:rotateX(10deg)]">
              <div
                ref={wheelRef}
                className="relative h-full w-full will-change-transform"
              >
                <Dial active={active} items={items} />
                {items.map((item, i) => {
                  const ease =
                    "transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";
                  const on = active === i;
                  return (
                    <div
                      key={i}
                      className="pointer-events-none absolute inset-0"
                      style={{ transform: `rotate(${i * spacing}deg)` }}
                    >
                      <div
                        className="absolute left-1/2 flex w-[350px] -translate-x-1/2 flex-col items-center text-center"
                        style={{ top: `calc(var(--dial) * -${RIM_FROM_TOP})` }}
                      >
                        <p
                          className={`text-[25px] font-bold leading-none tracking-[0.06em] text-aqua ${ease} ${on ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
                        >
                          {item.verb}
                        </p>
                        <div
                          aria-hidden
                          className={`mt-4 flex flex-col items-center ${ease} ${on ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
                        >
                          <span
                            className="bg-white"
                            style={{
                              width: `calc(var(--dial) * ${W_THICK / 1084})`,
                              height: `calc(var(--dial) * ${POINTER_LEN})`,
                            }}
                          />
                          <span
                            className="bg-white/50"
                            style={{
                              width: `calc(var(--dial) * ${W_THIN / 1084})`,
                              height: `calc(var(--dial) * ${TAIL_LEN})`,
                            }}
                          />
                        </div>
                        <div
                          className={`mt-2 leading-[normal] ${ease} ${on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                        >
                          <h3 className="display-serif text-[25px] leading-[normal]">
                            {item.title}
                          </h3>
                          <RichText
                            html={item.description}
                            className="mx-auto mt-2 max-w-[300px] text-[16px] leading-normal text-white opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 w-full max-w-md space-y-8 pb-10 md:pb-20 md:hidden">
          {items.map((item, i) => (
            <Reveal key={i}>
              <div className="border border-white/15 p-6 text-center rounded-[30px]">
                <p className="text-xs font-bold tracking-[0.2em] text-aqua">
                  {item.verb}
                </p>
                <h3 className="display-serif mt-2 text-2xl">{item.title}</h3>
                <RichText
                  html={item.description}
                  className="mt-2 text-sm text-white/60"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
