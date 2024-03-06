import type { ShopDTO } from 'src/pages/api/shop/dtos';

export interface ShopsTypes {
  data?: ShopDTO[];
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  dataGroupByIsInBusiness?: (isInBusiness: boolean) => ShopDTO[] | undefined;
}

export interface ShopByIdTypes {
  data?: ShopDTO;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}
