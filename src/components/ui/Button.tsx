import Link from "next/link";

export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-mist";

export type ButtonVariant = "outline" | "banner" | "solid" | "ink";
export type ButtonSize = "sm" | "md";

export type CtaLinkType = {
  href?: string;
  label?: string;
  text?: string;
  target?: string;
};

const VARIANTS: Record<ButtonVariant, string> = {
  outline:
    "border border-white/70 text-white hover:bg-white hover:text-ink",
  banner:
    "border border-white/70 bg-white text-ink hover:bg-transparent hover:text-white",
  solid: "bg-aqua text-ink hover:bg-ink hover:text-white",
  ink: "bg-ink text-mist hover:bg-pine-soft shadow-[0_18px_40px_-20px_rgba(20,41,43,0.7)]",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-6 py-[9px]",
  md: "px-8 py-[11px]",
};

const TOUCH_TARGET = "min-h-[44px] items-center";

export function buttonClasses(
  variant: ButtonVariant = "outline",
  size: ButtonSize = "md",
  className = ""
): string {
  return [
    "btn-3d inline-flex justify-center rounded-full text-sm transition-all duration-500",
    TOUCH_TARGET,
    VARIANTS[variant],
    SIZES[size],
    FOCUS_RING,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export type ButtonPropsType = {
  cta?: CtaLinkType | null;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
};

export default function Button({
  cta,
  variant = "outline",
  size = "md",
  className,
  children,
}: ButtonPropsType) {
  const typedCta = cta as CtaLinkType | undefined;

  const href = typedCta?.href ?? "";
  const label = typedCta?.label ?? typedCta?.text ?? "";
  const target = typedCta?.target;

  if (!href) return null;

  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={buttonClasses(variant, size, className)}
    >
      {children ?? label}
    </Link>
  );
}