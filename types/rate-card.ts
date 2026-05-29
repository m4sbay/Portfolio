export type PerItemRate = {
  name: string;
  description: string;
  priceMin: number;
  priceMax: number;
};

export type BundlePackage = {
  name: string;
  price: number;
  phase: string;
  items: string[];
  savings: string;
  featured?: boolean;
  revisi: string;
  extras?: string[];
};
