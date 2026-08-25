"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMemberType, TeamSectionType } from "@/lib/teamContent";
import Button, { FOCUS_RING } from "@/components/ui/Button";
import { bookNowCta } from "@/lib/format";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
import TiltCard from "@/components/ui/TiltCard";
import TickRing from "@/components/ui/TickRing";
interface TeamProps {
  content: TeamSectionType;
  onSelectMember: (member: TeamMemberType) => void;
}
export default function TeamList({ content, onSelectMember }: TeamProps) {
  return (
    <section id="team" className="bg-white mb-10">
      {content.categories.map((category, categoryIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`px-6  py-16 md:py-24 ${categoryIndex % 2 === 1 ? "bg-[#F6FAFC]" : "bg-[#ffffff]"}
          `}
        >
          <div className="mx-auto max-w-350">
            <div className="mx-auto max-w-6xl text-center">
              <Reveal>
                <p className="section-label">{category.label}</p>
              </Reveal>
              <SplitReveal
                delay={0.1}
                className="display-serif mt-2 text-[30px] md:text-[50px]"
              >
                {category.title}
              </SplitReveal>
              <Reveal delay={0.2}>
                <RichText
                  html={category.description}
                  as="p"
                  className="mx-auto mt-3 max-w-2xl leading-[normal] text-slate-body"
                />
              </Reveal>
            </div>
            <div className="mt-10 flex flex-wrap items-stretch justify-center gap-2">
              {category.members.map((member, index) => {
                const booking = bookNowCta(member.popup?.buttonUrl);

                return (
                  <motion.div
                    key={member.id}
                    className="h-full"
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <TiltCard
                      as="article"
                      role="button"
                      tabIndex={0}
                      aria-label={`Meet ${member.name}`}
                      onClick={() => onSelectMember(member)}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter" && e.key !== " ") return;
                        e.preventDefault();
                        onSelectMember(member);
                      }}
                      className={`group flex h-full w-full cursor-pointer sm:w-[344px] flex-col rounded-xl bg-foam px-5.5 pt-2.5 pb-4.5 ${FOCUS_RING}`}
                    >
                      <div className="relative mx-auto aspect-square w-full max-w-[310px]">
                        <TickRing index={index} />
                        <div className="absolute inset-[4.5%] overflow-hidden rounded-full">
                          <Image
                            src={member.image.src}
                            alt={member.image.alt || member.name}
                            fill
                            sizes="300px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-3.5 right-3.5 flex h-18.75 w-18.75 flex-col items-center justify-center rounded-full bg-white/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(255,255,255,0.15),0_8px_24px_-6px_rgba(20,41,43,0.35)] transition-transform duration-500 group-hover:scale-110"
                        >
                          <Image
                            src="/images/teams-arrow.svg"
                            alt=""
                            width={13}
                            height={13}
                          />
                          <span className="text-[13px] leading-none">Meet</span>
                        </span>
                      </div>
                      <h3 className="display-serif mt-4 text-[25px]">
                        {member.name}
                      </h3>
                      <p className="text-[14px] opacity-50">{member.role}</p>
                      <RichText
                        html={member.description}
                        className="mt-4 text-[16px] leading-[normal] [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden"
                      />
                      {booking ? (
                        <div
                          className="mt-auto pt-5 w-full"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <Button
                            cta={booking}
                            variant="solid"
                            className="w-full"
                            size="sm"
                          />
                        </div>
                      ) : null}
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}
