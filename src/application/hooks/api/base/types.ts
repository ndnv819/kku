export interface QueryProps<Res> {
  queryKey: string[];
  queryFn: () => Res | Promise<Res>;
  enabled?: boolean;
}

export interface QueryResult<Res> {
  data?: Res;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export interface MutationProps<Res, Req> {
  mutationKey: string[];
  mutationFn: (req: Req) => Promise<Res>;
}

export interface MutationResult<Res, Req> {
  data?: Res;
  isError: boolean;
  mutate: (req: Req) => void;
  mutateAsync: (req: Req) => Promise<Res>;
}
