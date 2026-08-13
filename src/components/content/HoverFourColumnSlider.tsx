"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";
import { canHover } from "@/lib/motion";

export type ImageDataType = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type SliderStepType = {
  title?: string;
  description?: string;
  image?: ImageDataType | null;
};

export type HoverFourColumnSliderDataType = {
  label?: string;
  heading?: string;
  paragraph?: string;
  steps?: SliderStepType[] | readonly SliderStepType[];
};

export type HoverFourColumnSliderPropsType = {
  content?: HoverFourColumnSliderDataType;
  className?: string;
};

const OPEN_GROW = 3.2;

const pad = (n: number) => String(n).padStart(2, "0");

export default function HoverFourColumnSlider({
  content,
  className = "",
}: HoverFourColumnSliderPropsType) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  const typedContent = content;

  const label = typedContent?.label ?? "";
  const heading = typedContent?.heading ?? "";
  const paragraph = typedContent?.paragraph ?? "";
  const steps: SliderStepType[] = Array.isArray(typedContent?.steps)
    ? (typedContent.steps as SliderStepType[])
    : [];
  const total = steps.length;

  if (total === 0) return null;

  return (
    <section className={`px-5 py-10 md:px-6 md:py-20 ${className}`}>
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-[700px]">
          <SectionHeading
            label={label}
            heading={heading}
            paragraph={paragraph}
            from="left"
            headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
            paragraphClassName="mt-3 max-w-[600px] leading-[normal]"
          />
        </div>

        <Reveal delay={0.15} className="mt-10 md:mt-14">
          <div className="flex h-[640px] flex-col gap-2 md:h-[520px] md:flex-row">
            {steps.map((step, i) => {
              const isOpen = active === i;
              const panelId = `${baseId}-step-${i}`;
              const imageSrc = step?.image?.src ?? "";
              const imageAlt = step?.image?.alt ?? "";

              return (
                <button
                  key={i}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onPointerEnter={() => canHover() && setActive(i)}
                  style={{ flexGrow: isOpen ? OPEN_GROW : 1 }}
                  className="group relative flex basis-0 cursor-pointer overflow-hidden rounded-[15px] text-left transition-[flex-grow] duration-1000 [transition-timing-function:var(--ease-out-expo)]"
                >
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover transition-transform duration-1000 [transition-timing-function:var(--ease-out-expo)] ${
                        isOpen ? "scale-100" : "scale-110"
                      }`}
                    />
                  ) : null}

                  <div
                    className={`absolute inset-0 transition-colors duration-1000 ${
                      isOpen ? "bg-ink/0" : "bg-ink/55"
                    }`}
                  />

                  <div
                    aria-hidden="true"
                    className={`absolute right-6 top-6 z-10 flex items-center transition-opacity duration-500 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="relative z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(255,255,255,0.15),0_8px_24px_-6px_rgba(20,41,43,0.35)] backdrop-blur-[2px]">
                      {pad(i + 1)}
                    </span>
                    <span className="-ml-2 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/55 text-ink/70 backdrop-blur-md">
                      {pad(total)}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto flex w-full flex-col p-5 text-white md:p-6">
                    <span
                      aria-hidden="true"
                      className={`display-serif font-bold italic leading-none text-white/90 transition-[font-size] duration-1000 [transition-timing-function:var(--ease-out-expo)] ${
                        isOpen
                          ? "text-[60px] md:text-[100px]"
                          : "text-[30px] md:text-[50px]"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    <h3
                      className={`mt-3 font-bold italic transition-[font-size] duration-1000 [transition-timing-function:var(--ease-out-expo)] ${
                        isOpen ? "text-[25px]" : "text-[18px]"
                      }`}
                    >
                      {step?.title ?? ""}
                    </h3>

                    <div
                      id={panelId}
                      className={`grid transition-[grid-template-rows,opacity] duration-1000 [transition-timing-function:var(--ease-out-expo)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <RichText
                        html={step?.description ?? ""}
                        className="overflow-hidden text-[16px] leading-[normal] text-white/80 md:w-[550px] md:max-w-full"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
