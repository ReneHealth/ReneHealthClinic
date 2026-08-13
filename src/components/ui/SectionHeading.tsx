import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
import type { Html } from "@/lib/types/common";

interface SectionHeadingProps {
  label?: string;
  heading: string;
  paragraph?: Html;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  from?: "up" | "left";
  tone?: "dark" | "light";
  className?: string;
  labelClassName?: string;
  headingClassName?: string;
  paragraphClassName?: string;
}

export default function SectionHeading({
  label,
  heading,
  paragraph,
  as = "h2",
  align = "left",
  from = "up",
  tone = "dark",
  className,
  labelClassName,
  headingClassName = "display-serif mt-1 text-[30px] md:text-[50px]",
  paragraphClassName,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={[centered ? "text-center" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label ? (
        <Reveal from={from}>
          <p
            className={[
              "section-label",
              tone === "light" ? "!text-white/70" : "",
              labelClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </p>
        </Reveal>
      ) : null}

      <SplitReveal as={as} delay={label ? 0.1 : 0} className={headingClassName}>
        {heading}
      </SplitReveal>

      {paragraph ? (
        <Reveal delay={label ? 0.2 : 0.1} from={from}>
          <RichText
            html={paragraph}
            className={[
              "mt-4 text-[16px] leading-[normal]",
              centered ? "mx-auto" : "",
              tone === "light" ? "text-white/80" : "",
              paragraphClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </Reveal>
      ) : null}
    </div>
  );
}
