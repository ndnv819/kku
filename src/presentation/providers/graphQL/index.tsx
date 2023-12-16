/* eslint-disable */
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { createApolloClient } from '@infrastructure/graphql/apollo_client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { ReactNode, useRef } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export function initializeApollo(
  initialState = null,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

   // SSR이나 SSG로부터 initialState을 받아온다면, 기존에 브라우저에 존재하는 cache와 initialState를 merge함 (Hydrate 된다는 의미)
  if (initialState) {
    // 기존에 브라우저에 존재하는 cache를 가져옴 (NextJS는 client-side에서 SPA처럼 동작하기 때문에 cache가 유지됨)
    const existingCache = _apolloClient.extract();

    // merge는 deepmerge 패키지를 사용함
    const data = merge(existingCache, initialState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });
    // merge된 데이터로 캐싱 object 갱신
    _apolloClient.cache.restore(data);
  }
  // SSR(ServerSideProps)나 SSG(StaticProps)에서 사용될때는 항상 새로운 new Apollo Client 를 생성
  if (typeof window === 'undefined') {
    return _apolloClient;
  }
  // 브라우저에서는 항상 1개의 apolloClient 만 생성하도록 보장
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }
  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>, // 이때 client는 항상 server-side의 client
  pageProps: any,
): any {
  // SSR환경에서 사용자가 정의한 props에 서버에서 query한 데이터를 "APOLLO_STATE_PROP_NAME" key와 함께 합침
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
}

export function useApollo(pageProps: any): ApolloClient<NormalizedCacheObject> {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const storeRef = useRef<ApolloClient<NormalizedCacheObject>>();
  if (!storeRef.current) {
    storeRef.current = initializeApollo(state);
  }

  return storeRef.current;
}

export function GraphqlProvider({ children, pageProps }: { children: ReactNode; pageProps: any; }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}
