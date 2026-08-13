export type SectionImage = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type SectionCta = {
  label?: string;
  href?: string;
  target?: string;
};

export type SectionCard = {
  title?: string;
  description?: string;
  icon?: SectionImage | null;
  cta?: SectionCta | null;
};

export type SectionStep = {
  title?: string;
  description?: string;
  image?: SectionImage | null;
};

export type SectionHeader = {
  label?: string;
  heading?: string;
  paragraph?: string;
};
