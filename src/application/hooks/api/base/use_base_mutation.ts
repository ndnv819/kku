import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { MutationProps, MutationResult } from './types';

// NOTE:: v5부터 isLoading deprecated
// https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
export function useBaseMutation<Res, Req>({
  mutationKey,
  mutationFn,
}: MutationProps<Res, Req>): MutationResult<Res, Req> {
  const { data, isError, mutate, mutateAsync } = useMutation<
    Res,
    AxiosError,
    Req
  >({
    mutationKey,
    mutationFn,
  });

  return {
    data,
    isError,
    mutate,
    mutateAsync,
  };
}
