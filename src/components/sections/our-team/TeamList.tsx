"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { TeamMemberType, TeamSectionType } from "@/lib/teamContent";
import Button, { FOCUS_RING } from "@/components/ui/Button";
import { bookNowCta } from "@/lib/format";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
import TiltCard from "@/components/ui/TiltCard";
interface TeamProps {
  content: TeamSectionType;
  onSelectMember: (member: TeamMemberType) => void;
}
function TickRing({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const ticks = 80;
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        transformOrigin: "50% 50%",
        willChange: "transform",
      }}
      animate={
        reduce
          ? undefined
          : {
              rotate: index % 2 === 0 ? 360 : -360,
            }
      }
      transition={{
        duration: 90,
        ease: "linear",
        repeat: Infinity,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {Array.from({ length: ticks }).map((_, i) => {
          const a = (i / ticks) * Math.PI * 2;
          const x1 = (50 + Math.sin(a) * 49).toFixed(3);
          const y1 = (50 - Math.cos(a) * 49).toFixed(3);
          const x2 = (50 + Math.sin(a) * 47.5).toFixed(3);
          const y2 = (50 - Math.cos(a) * 47.5).toFixed(3);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#9db0b1"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
export default function TeamList({ content, onSelectMember }: TeamProps) {
  return (
    <section id="team" className="bg-white mb-10">
      {content.categories.map((category, categoryIndex) => (
        <section
          key={category.id}
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
                          className="absolute bottom-3.5 right-3.5 flex h-18.75 w-18.75 flex-col items-center justify-center rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(255,255,255,0.15),0_8px_24px_-6px_rgba(20,41,43,0.35)] backdrop-blur-[3px] transition-transform duration-500 group-hover:scale-110"
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
