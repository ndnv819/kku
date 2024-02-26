import type { Shop } from '@infrastructure/firebase/models/shop';

export interface ShopsTypes {
  data?: Shop[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export interface ShopByIdTypes {
  data?: Shop;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}
