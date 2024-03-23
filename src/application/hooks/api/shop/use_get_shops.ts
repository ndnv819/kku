import { requestGet } from '@infrastructure/network';
import { useCallback } from 'react';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import { useBaseQuery } from '../base/use_base_query';
import type { ShopsTypes } from './types';

export function useGetShops(initialData?: ShopDTO[]): ShopsTypes {
  const { data, isError, isFetching, isLoading } = useBaseQuery<ShopDTO[]>({
    queryKey: ['shops'],
    queryFn: () => requestGet<ShopDTO[]>('/api/shop'),
    initialData,
  });

  // 필터링 종합
  const filteredShops = useCallback(
    (status: boolean, category?: string): ShopDTO[] | [] => {
      if (!data) {
        return [];
      }
      if (!status && !category) {
        return data;
      }
      if (status && !category) {
        return data.filter(
          (d) =>
            d!.openingTime.split('\n')[0] === '영업 중' ||
            d!.openingTime.split('\n')[0] === '곧 영업 종료',
        );
      }
      if (status && category) {
        return data
          .filter(
            (d) =>
              d!.openingTime.split('\n')[0] === '영업 중' ||
              d!.openingTime.split('\n')[0] === '곧 영업 종료',
          )
          .filter((d2) => d2!.category === category);
      }
      if (!status && category) {
        return data.filter((d2) => d2!.category === category);
      }
      return data;
    },
    [data],
  );

  return {
    data,
    isError,
    isFetching,
    isLoading,
    filteredShops,
  };
}
