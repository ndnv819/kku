import type { Shop } from '@infrastructure/firebase/models/shop';

export interface ShopsDTO {
  data?: Shop[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export interface ShopDTO {
  data?: Shop;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}
