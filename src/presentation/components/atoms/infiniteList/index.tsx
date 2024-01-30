import {
  ComponentType,
  CSSProperties,
  useCallback,
  useMemo,
} from 'react';
import {
  AutoSizer,
  InfiniteLoader,
  List,
  ListRowProps,
  WindowScroller,
} from 'react-virtualized';

import { EmptyView } from '../emptyView';
import { DefaultLoader } from '../loader';

export interface ListTypeProps<T> {
  index: number;
  item: T;
  style: CSSProperties;
}

export interface InfiniteListProps<T> {
  data: T[];
  totalElements: number;
  rowHeight?: number;
  rowRenderer: ComponentType<ListTypeProps<T>>;
  emptyRenderer?: ComponentType;
  overscanRowCount?: number;
  // react-query
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<any>;
  bottomLoaderRender?: ComponentType;
}

export function InfiniteList<T>({
  data,
  totalElements, // 추가하면 좋은 속성
  rowHeight = 100,
  rowRenderer: RowComponent,
  emptyRenderer: EmptyComponent,
  overscanRowCount = 10,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  bottomLoaderRender: LoaderComponent,
}: InfiniteListProps<T>) {
  // hasNext
  const rowCount = useMemo(() => {
    // loader를 list 범위에 추가하기 위해서 hasNextPage를 체크해서 true면 1을 추가함
    // 마지막 index = last one은 항상 loader
    return data.length + {hasNextPage ? 1 : 0};
  }, [data, hasNextPage]);

  const onRowRenderer = useCallback(
    (props: ListRowProps): JSX.Element => {
      // props.index의 마지막값이 undefined인 경우에만 bottomloader를 렌더 
      // 왜냐면? 원래 index.length에서 loader를 추가하기 위해 +1를 했기 때문에 마지막 인덱스의 값은 undefined임.
      if (data.length === data[props.index] + 1) {
        return (
          <RowComponent
            key={props.index}
            index={props.index}
            item={data[props.index]!}
            style={props.style}
          />
        );
      }
      return <LoaderComponent />;
    },
    [data],
  );

  // loadMoreRows를 추가하여 무조건적으로 fetchNextPage가 실행되지 않도록 함 
  // 이유는> 불필요한 상황에서도 렌더링될 수 있음 최소한의 에러도 없애기 위해서 
  // hasNextPage와 isFetchingNextPage를 체크해서 fetchNextPage가 실행되어야 하는 상황을 체크해서 조건부로 렌더링함

  const onEmptyRenderer = useCallback((): JSX.Element => {
    if (EmptyComponent) {
      return <EmptyComponent />;
    }
    return <EmptyView />;
  }, [EmptyComponent]);

  const onLoaderRenderer = useCallback((): JSX.Element => {
    if (LoaderComponent) {
      return <LoaderComponent />;
    }
    return <DefaultLoader />;
  }, [LoaderComponent]);

  const isRowLoaded = useCallback(
    (index: number): boolean => {
      return !!data[index];
    },
    [data],
  );

  return (
    <WindowScroller>
      {({ height, isScrolling, scrollTop }) => (
        <>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={fetchNextPage}
            rowCount={rowCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    ref={registerChild}
                    height={height}
                    width={width}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onRowsRendered={onRowsRendered}
                    rowCount={rowCount}
                    rowHeight={rowHeight}
                    rowRenderer={onRowRenderer}
                    noRowsRenderer={onEmptyRenderer}
                    overscanRowCount={overscanRowCount}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
          {isFetchingNextPage && onLoaderRenderer}
        </>
      )}
    </WindowScroller>
  );
}

InfiniteList.displayName = InfiniteList;
