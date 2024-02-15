import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { MutationProps, MutationResult } from './types';

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
    mutationFn: (req: Req) => mutationFn(req),
  });

  return {
    data,
    isError,
    mutate,
    mutateAsync,
  };
}
