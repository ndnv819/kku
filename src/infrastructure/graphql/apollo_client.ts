import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';

import { errorLink, httpLink } from './links';

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
