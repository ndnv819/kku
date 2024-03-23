import { requestGet } from '@infrastructure/network';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import { useBaseQuery } from '../base/use_base_query';
import type { ShopByIdTypes } from './types';

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
