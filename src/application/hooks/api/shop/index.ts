import { getShopById, getShops } from '@infrastructure/firebase/apis/shop';

import { useBaseQuery } from '../base/use_base_query';
import type { ShopDTO, ShopsDTO } from './types';

export function useGetShops(): ShopsDTO {
  const { data, isError, isFetching, isLoading } = useBaseQuery({
    queryKey: ['shops'],
    queryFn: () => getShops(),
  });

  return { data, isError, isFetching, isLoading };
}

export function useGetShopsById(id: string): ShopDTO {
  const { data, isError, isFetching, isLoading } = useBaseQuery({
    queryKey: ['shop', id],
    queryFn: () => getShopById(id),
  });

  return { data, isError, isFetching, isLoading };
}
