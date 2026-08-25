"use client";
import { useEffect, useRef, useState } from "react";
import ScrollScene from "@/components/ui/ScrollScene";
import TeamList from "./TeamList";
import TeamPopup from "../TeamPopup";
import { CategoryTabs } from "@/components/sections/Team";
import { getLenis } from "@/lib/lenis";
import type { TeamMemberType, TeamSectionType } from "@/lib/teamContent";
interface TeamSectionProps {
  content: TeamSectionType;
}
const BAR_HEIGHT = 72;
export default function TeamSection({ content }: TeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(
    null,
  );
  const [active, setActive] = useState(content.categories[0]?.id ?? "");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current?.offsetHeight ?? BAR_HEIGHT;
      const current = content.categories.reduce((seen, category) => {
        const el = document.getElementById(category.id);
        const top = el?.getBoundingClientRect().top ?? Infinity;
        return top <= bar + 4 ? category.id : seen;
      }, content.categories[0]?.id ?? "");
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [content.categories]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const bar = barRef.current?.offsetHeight ?? BAR_HEIGHT;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -bar });
      return;
    }
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - bar,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="relative">
        {content.categories.length > 1 ? (
          <div
            ref={barRef}
            className="sticky top-0 z-30 border-b border-aqua/15 bg-mist py-3 pl-6 pr-[76px] md:pr-[100px]"
          >
            <div className="mx-auto w-full min-w-0 max-w-350">
              <CategoryTabs
                categories={content.categories}
                active={active}
                onSelect={scrollToCategory}
              />
            </div>
          </div>
        ) : null}
        <ScrollScene>
          <TeamList content={content} onSelectMember={setSelectedMember} />
        </ScrollScene>
      </div>
      <TeamPopup
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  );
}
