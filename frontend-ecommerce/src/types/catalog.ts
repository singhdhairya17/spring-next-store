export interface ProductCategoryRef {
  name: string;
}

/** Product shape returned by public catalog APIs */
export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  description: string;
  active: boolean;
  imageUrl?: string;
  quantity: number;
  category?: ProductCategoryRef;
}

/** Category shape returned by public category APIs */
export interface CategorySummary {
  id: string;
  name: string;
  description: string;
  /** Optional; backend may omit or null for categories without imagery */
  image_url?: string | null;
}
