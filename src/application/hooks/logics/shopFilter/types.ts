export interface ShopFilterStatusResult {
  status: boolean;
  changeStatus: () => void;
}

export interface ShopFilterCategoryResult {
  category?: string;
  changeCategory: (shopsCategory: string) => void;
}
