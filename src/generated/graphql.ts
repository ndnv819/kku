import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends Record<string, unknown>, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  _FieldSet: { input: any; output: any };
}

export enum ErrorDetail {
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN',
}

export enum ErrorType {
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN',
}

/**
 * 반려동물 동반가능 공간
 * Example: 전체, 야외(테라스 등), 실내
 */
export enum PetAllowedLocationEnum {
  All = 'All',
  Indoor = 'Indoor',
  Outdoor = 'Outdoor',
}

export interface Query {
  __typename?: 'Query';
  _service: _Service;
  /**
   * 사용자의 현재 위치로부터 가까운 상점 정보를 불러옵니다
   * 사용자의 위치는 위도와 경도로부터 계산됩니다
   */
  nearestShops: Shop[];
  /** 반려동물 동반이 가능한 상점 정보를 불러옵니다 */
  shops: Shop[];
}

export interface QueryNearestShopsArgs {
  distanceKm?: InputMaybe<Scalars['Int']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
}

/** 반려동뭉 동반이 가능한 상점 정보 */
export interface Shop {
  __typename?: 'Shop';
  /**
   * 상점 구주소
   * Example: 부산광역시 부산진구 부전동 227-2 삼정타워 1층
   */
  address: Scalars['String']['output'];
  /**
   * 상점 신주소
   * Example: 부산광역시 부산진구 중앙대로 672 삼정타워 1층
   */
  addressLoad: Scalars['String']['output'];
  /**
   * 상점 고유ID
   * Examle: 01HHSA0B50M8PNV5JDH7BWZ5X2
   */
  id: Scalars['ID']['output'];
  /**
   * 상점 위치 위도
   * Example: 35.1529881
   */
  latitude: Scalars['Float']['output'];
  /**
   * 상점 위치 경도
   * Example: 129.0596393
   */
  longitude: Scalars['Float']['output'];
  /**
   * 상점 이름
   * Example: 쉐이크쉑 서면점네이버페이
   */
  name: Scalars['String']['output'];
  /**
   * 반려동물 동반가능 공간
   * Example: 전체, 야외(테라스 등), 실내
   */
  petAllowedLocations: PetAllowedLocationEnum;
  /** 상점 원본데이터 정보 */
  source: ShopSource;
  /**
   * 상점 연락처
   * Example: 051-520-3707
   */
  tel: Scalars['String']['output'];
  /**
   * 상점 대표 이미지 리스트
   * Example: ["https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210107_152%2F1610009484928eqmPY_JPEG%2F2019_0828_SSB5729_1_HR.jpg"]
   */
  thumbnails: Scalars['String']['output'][];
}

/** 상점 원본데이터 정보 */
export interface ShopSource {
  __typename?: 'ShopSource';
  /**
   * 상점 원본데이터 URL
   * Example: https://pcmap.place.naver.com/restaurant/1055942194/home
   */
  sourceUrl: Scalars['String']['output'];
}

export interface _Service {
  __typename?: '_Service';
  sdl: Scalars['String']['output'];
}

export type GetShopsQueryVariables = Exact<Record<string, never>>;

export interface GetShopsQuery {
  __typename?: 'Query';
  shops: {
    __typename?: 'Shop';
    id: string;
    name: string;
    petAllowedLocations: PetAllowedLocationEnum;
    tel: string;
    address: string;
    addressLoad: string;
    latitude: number;
    longitude: number;
    thumbnails: string[];
    source: { __typename?: 'ShopSource'; sourceUrl: string };
  }[];
}

export type GetNearestShopsQueryVariables = Exact<{
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  distanceKm?: InputMaybe<Scalars['Int']['input']>;
}>;

export interface GetNearestShopsQuery {
  __typename?: 'Query';
  nearestShops: {
    __typename?: 'Shop';
    id: string;
    name: string;
    petAllowedLocations: PetAllowedLocationEnum;
    tel: string;
    address: string;
    addressLoad: string;
    latitude: number;
    longitude: number;
    thumbnails: string[];
    source: { __typename?: 'ShopSource'; sourceUrl: string };
  }[];
}

export const GetShopsDocument = gql`
  query GetShops {
    shops {
      id
      name
      petAllowedLocations
      tel
      address
      addressLoad
      latitude
      longitude
      thumbnails
      source {
        sourceUrl
      }
    }
  }
`;

/**
 * __useGetShopsQuery__
 *
 * To run a query within a React component, call `useGetShopsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShopsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShopsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShopsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetShopsQuery, GetShopsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetShopsQuery, GetShopsQueryVariables>(
    GetShopsDocument,
    options,
  );
}
export function useGetShopsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetShopsQuery,
    GetShopsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetShopsQuery, GetShopsQueryVariables>(
    GetShopsDocument,
    options,
  );
}
export function useGetShopsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetShopsQuery,
    GetShopsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetShopsQuery, GetShopsQueryVariables>(
    GetShopsDocument,
    options,
  );
}
export type GetShopsQueryHookResult = ReturnType<typeof useGetShopsQuery>;
export type GetShopsLazyQueryHookResult = ReturnType<
  typeof useGetShopsLazyQuery
>;
export type GetShopsSuspenseQueryHookResult = ReturnType<
  typeof useGetShopsSuspenseQuery
>;
export type GetShopsQueryResult = Apollo.QueryResult<
  GetShopsQuery,
  GetShopsQueryVariables
>;
export const GetNearestShopsDocument = gql`
  query GetNearestShops(
    $latitude: Float!
    $longitude: Float!
    $distanceKm: Int
  ) {
    nearestShops(
      latitude: $latitude
      longitude: $longitude
      distanceKm: $distanceKm
    ) {
      id
      name
      petAllowedLocations
      tel
      address
      addressLoad
      latitude
      longitude
      thumbnails
      source {
        sourceUrl
      }
    }
  }
`;

/**
 * __useGetNearestShopsQuery__
 *
 * To run a query within a React component, call `useGetNearestShopsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNearestShopsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNearestShopsQuery({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      distanceKm: // value for 'distanceKm'
 *   },
 * });
 */
export function useGetNearestShopsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetNearestShopsQuery,
    GetNearestShopsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNearestShopsQuery, GetNearestShopsQueryVariables>(
    GetNearestShopsDocument,
    options,
  );
}
export function useGetNearestShopsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNearestShopsQuery,
    GetNearestShopsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetNearestShopsQuery,
    GetNearestShopsQueryVariables
  >(GetNearestShopsDocument, options);
}
export function useGetNearestShopsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetNearestShopsQuery,
    GetNearestShopsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetNearestShopsQuery,
    GetNearestShopsQueryVariables
  >(GetNearestShopsDocument, options);
}
export type GetNearestShopsQueryHookResult = ReturnType<
  typeof useGetNearestShopsQuery
>;
export type GetNearestShopsLazyQueryHookResult = ReturnType<
  typeof useGetNearestShopsLazyQuery
>;
export type GetNearestShopsSuspenseQueryHookResult = ReturnType<
  typeof useGetNearestShopsSuspenseQuery
>;
export type GetNearestShopsQueryResult = Apollo.QueryResult<
  GetNearestShopsQuery,
  GetNearestShopsQueryVariables
>;
