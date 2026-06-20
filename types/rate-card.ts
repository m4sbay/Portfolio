export type PerItemRate = {
  name: string;
  description: string;
  priceMin: number;
  priceMax: number;
};

export type BundlePackage = {
  name: string;
  subtitle: string;
  price: number;
  pricePerUnit?: string;
  designTurnaround: string;
  phase: string;
  description: string;
  items: string[];
  /** Feature items not included (shown muted with X icon) */
  itemsExcluded?: string[];
  /** Exclusive feature items (shown bold with accent checkmark) */
  itemsExclusive?: string[];
  savings: string;
  featured?: boolean;
  revisi: string;
  /** Strikethrough anchor price label above main price */
  anchorPrice?: string;
  /** Small pill badge shown in card header (e.g. "Slot terbatas") */
  slotBadge?: string;
  extras?: string[];
};
