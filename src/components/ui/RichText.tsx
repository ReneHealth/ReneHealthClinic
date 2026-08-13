import { createElement } from "react";
import type { Html } from "@/lib/types";

type Tag = "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4";

interface RichTextProps {
  html: Html;
  as?: Tag;
  className?: string;
}

export default function RichText({
  html,
  as = "div",
  className,
}: RichTextProps) {
  if (!html) return null;

  const unwrap = as !== "div";
  const single = unwrap && /^\s*<p>(?![\s\S]*<p[\s>])([\s\S]*)<\/p>\s*$/i.exec(html);
  const content = single ? single[1] : html;

  return createElement(as, {
    className: className ? `richText ${className}` : "richText",
    dangerouslySetInnerHTML: { __html: content },
  });
}
