import { requestGet } from '@infrastructure/network';
import { useCallback } from 'react';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import { useBaseQuery } from '../base/use_base_query';
import type { ShopByIdTypes, ShopsTypes } from './types';

export function useGetShops(initialData: ShopDTO[]): ShopsTypes {
  const { data, isError, isFetching, isLoading } = useBaseQuery<ShopDTO[]>({
    queryKey: ['shops'],
    queryFn: () => requestGet<ShopDTO[]>('/api/shop'),
    initialData,
  });

  const dataGroupByIsInBusiness = useCallback(
    (isInBusiness: boolean): ShopDTO[] | undefined => {
      if (!isInBusiness) {
        return data;
      }

      return data?.filter(
        (d) =>
          (d.openingTime && d.openingTime.split('\n')[0] === '영업 중') ||
          (d.openingTime && d.openingTime.split('\n')[0] === '곧 영업 종료'),
      );
    },
    [data],
  );

  return {
    isError,
    isFetching,
    isLoading,
    dataGroupByIsInBusiness,
  };
}

export function useGetShopsById(
  id: string,
  initialData: ShopDTO,
): ShopByIdTypes {
  const { data, isError, isFetching, isLoading } = useBaseQuery({
    queryKey: ['shop', id],
    queryFn: () => requestGet<ShopDTO>(`/api/shop/${id}`),
    initialData,
  });

  return { data, isError, isFetching, isLoading };
}
