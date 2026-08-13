"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { InsuranceProvider, WhoWeBillSection } from "@/lib/types";
import { ScrollTrigger } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import RichText from "@/components/ui/RichText";

interface Match extends InsuranceProvider {
  tabId: string;
  tabLabel: string;
}

function ProviderCard({ provider }: { provider: InsuranceProvider }) {
  return (
    <div className="flex h-[120px] items-center justify-center rounded-xl bg-foam p-5 md:h-[170px] md:p-14">
      {provider.logo ? (
        <div className="relative h-full w-full">
          <Image
            src={provider.logo.src}
            alt={provider.logo.alt || provider.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-center text-[15px] leading-[normal] font-bold text-balance">
          {provider.name}
        </span>
      )}
    </div>
  );
}

export default function WhoWeBill({ content }: { content: WhoWeBillSection }) {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");
  const searchId = useId();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let timer = 0;
    let first = true;

    const observer = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    });

    observer.observe(el);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const tab = content.tabs[activeTab];
  const trimmed = query.trim();
  const searching = trimmed.length > 0;

  const matches = useMemo<Match[]>(() => {
    if (!searching) return [];
    const q = trimmed.toLowerCase();

    return content.tabs.flatMap((t) =>
      t.providers
        .filter((p) => p.name.toLowerCase().includes(q))
        .map((p) => ({ ...p, tabId: t.id, tabLabel: t.label })),
    );
  }, [content.tabs, trimmed, searching]);

  const grouped = useMemo(() => {
    const byTab = new Map<string, { label: string; items: Match[] }>();
    for (const match of matches) {
      const entry = byTab.get(match.tabId) ?? {
        label: match.tabLabel,
        items: [],
      };
      entry.items.push(match);
      byTab.set(match.tabId, entry);
    }
    return [...byTab.values()];
  }, [matches]);

  return (
    <section
      ref={sectionRef}
      id="who-we-bill"
      className="bg-[#F7FAFC] px-5 py-10 md:px-6 md:py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <SectionHeading
              label={content.label}
              heading={content.heading}
              paragraph={content.paragraph}
              from="left"
              headingClassName="display-serif mt-1 text-[30px] md:text-[50px]"
              paragraphClassName="mt-3 max-w-[520px] leading-[normal]"
            />
          </div>

          <Reveal delay={0.2} className="md:justify-self-end">
            <label
              htmlFor={searchId}
              className="flex w-full items-center gap-2 rounded-full border border-line bg-white px-5 py-3 focus-within:border-aqua md:w-[320px]"
            >
              <span className="sr-only">Search all insurance providers</span>
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all providers"
                className="w-full bg-transparent text-[16px] outline-none placeholder:text-ink/40"
              />
              {searching ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="shrink-0 text-[18px] leading-none opacity-50 transition-opacity hover:opacity-100"
                >
                  &times;
                </button>
              ) : (
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 fill-none stroke-current stroke-[1.5] opacity-50"
                >
                  <circle cx="9" cy="9" r="6" />
                  <path d="M13.5 13.5 17 17" />
                </svg>
              )}
            </label>
            <p
              aria-live="polite"
              className="mt-2 text-center text-[13px] opacity-50 md:text-right"
            >
              {searching
                ? `${matches.length} ${matches.length === 1 ? "result" : "results"} across all categories`
                : " "}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10 md:mt-14">
          <div
            className={`flex justify-center transition-opacity duration-300 ${
              searching ? "pointer-events-none opacity-40" : ""
            }`}
            aria-hidden={searching}
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-[30px] bg-ink/5 p-1.5 md:gap-0 md:rounded-full">
              {content.tabs.map((t, i) => (
                <div key={t.id} className="flex items-center">
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-4 w-px bg-ink/15 md:block"
                    />
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setActiveTab(i)}
                    aria-pressed={activeTab === i}
                    className={`min-h-[44px] rounded-full px-5 py-2.5 text-[16px] transition-colors duration-300 ${
                      activeTab === i
                        ? "bg-aqua text-ink"
                        : "text-ink/50 hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {searching ? (
            matches.length === 0 ? (
              <p className="mt-6 py-10 text-center opacity-50">
                No providers match &ldquo;{trimmed}&rdquo;.
              </p>
            ) : (
              <div className="mt-6 space-y-8">
                {grouped.map((group) => (
                  <div key={group.label}>
                    <p className="section-label2 mb-3">{group.label}</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                      {group.items.map((provider) => (
                        <ProviderCard key={provider.name} provider={provider} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : tab.html ? (
            <RichText
              html={tab.html}
              className="mt-6 rounded-2xl bg-foam p-6 text-[16px] leading-[normal] md:p-10 [&_li]:mb-2.5 [&_li]:break-inside-avoid [&_ul]:gap-x-10 sm:[&_ul]:columns-2 lg:[&_ul]:columns-3 [&_li]:before:mr-2 [&_li]:before:opacity-40 [&_li]:before:content-['•']"
            />
          ) : tab.providers.length === 0 ? (
            <p className="mt-6 py-6 text-center opacity-50">
              No providers listed for this category.
            </p>
          ) : (
            <div className="mt-6 overflow-hidden">
              <div
                className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]"
                style={{ animationDuration: "40s" }}
              >
                {[...tab.providers, ...tab.providers].map((provider, i) => (
                  <div
                    key={`${provider.name}-${i}`}
                    className="w-[160px] shrink-0 sm:w-[200px]"
                  >
                    <ProviderCard provider={provider} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <RichText
            html={content.note}
            className="mt-5 max-w-[560px] text-[14px] leading-[normal] opacity-50"
          />
        </Reveal>
      </div>
    </section>
  );
}
