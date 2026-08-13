import type { ReactNode } from "react";

export interface OrderableSection {
  key: string;
  order?: number | null;
  node: ReactNode;
}

function isSet(order?: number | null): order is number {
  return typeof order === "number" && Number.isFinite(order) && order > 0;
}

export function sortSections(sections: OrderableSection[]): OrderableSection[] {
  return sections
    .map((section, index) => ({
      section,
      sortKey: isSet(section.order) ? section.order : index + 1,
      index,
    }))
    .sort((a, b) => a.sortKey - b.sortKey || a.index - b.index)
    .map((entry) => entry.section);
}

export function toOrder(value: unknown): number | undefined {
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? n : undefined;
}
