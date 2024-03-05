import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { QueryProps, QueryResult } from './types';

export function useBaseQuery<Res>({
  queryKey,
  queryFn,
  enabled,
  initialData,
}: QueryProps<Res>): QueryResult<Res> {
  const { data, isError, isFetching, isLoading } = useQuery<Res, AxiosError>({
    queryKey,
    queryFn,
    enabled,
    initialData,
  });

  return {
    data,
    isError,
    isFetching,
    isLoading,
  };
}
