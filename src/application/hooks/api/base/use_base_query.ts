import { useQuery } from '@tanstack/react-query';

import type { QueryProps, QueryResult } from './types';

export function useBaseQuery<Res>({
  queryKey,
  queryFn,
}: QueryProps<Res>): QueryResult<Res> {
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn,
  });

  return {
    data,
    isError,
    isLoading,
    isFetching,
  };
}
