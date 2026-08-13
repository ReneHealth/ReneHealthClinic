import type { CtaLink, MediaImage } from "@/lib/types/common";

export interface WpImageNode {
  sourceUrl?: string | null;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
}

export interface WpImageField {
  node?: WpImageNode | null;
}

const EMBEDDED_MEDIA =
  /<(?:iframe|img|video|audio|embed|object|svg|picture|source)\b/i;

const EXTERNAL_URL = /^https?:\/\//i;

export function str(value?: string | null, fallback = ""): string {
  return value ?? fallback;
}

export function hasContent(value?: string | null): boolean {
  if (!value) return false;
  if (EMBEDDED_MEDIA.test(value)) return true;
  return (
    value
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim().length > 0
  );
}

export function filled(...values: (string | null | undefined)[]): boolean {
  return values.some(hasContent);
}

export function hasRows(rows: readonly unknown[] | null | undefined): boolean {
  return (rows?.length ?? 0) > 0;
}

export function selectValue(value: unknown): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return typeof raw === "string" ? raw : "";
}

export function cta(
  label?: string | null,
  url?: string | null,
): CtaLink | undefined {
  if (!hasContent(url)) return undefined;

  const href = str(url);

  return {
    label: str(label),
    href,
    ...(EXTERNAL_URL.test(href) ? { target: "_blank" as const } : null),
  };
}

export function image(
  field?: WpImageField | WpImageNode | null,
): MediaImage | undefined {
  const node =
    (field as WpImageField | null | undefined)?.node ??
    (field as WpImageNode | null | undefined);

  if (!node?.sourceUrl) return undefined;

  return {
    src: node.sourceUrl,
    alt: str(node.altText),
    width: node.mediaDetails?.width ?? 100,
    height: node.mediaDetails?.height ?? 100,
  };
}
