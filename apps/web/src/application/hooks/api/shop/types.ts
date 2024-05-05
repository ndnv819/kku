import type { ShopDTO } from 'src/pages/api/shop/dtos';

export interface ShopsTypes {
  data?: ShopDTO[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  filteredShops: (status: boolean, category?: string) => ShopDTO[];
}

export interface ShopByIdTypes {
  data?: ShopDTO;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}
