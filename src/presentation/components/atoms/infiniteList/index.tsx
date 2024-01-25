import { ComponentType, CSSProperties, useCallback, useMemo } from 'react';
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

  const rowCount = useMemo(() => {
    return data.length;
  }, [data]);

  const onRowRenderer = useCallback(
    (props: ListRowProps): JSX.Element => {
      return (
        <RowComponent
          key={props.index}
          index={props.index}
          item={data[props.index]!}
          style={props.style}
        />
      );
    },
    [data],
  );

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
    ({index}: {index: number}): boolean => {
      return !!data[index];
    },
    [data],
  );


  return (
    <>
      <WindowScroller>
        {({ height, isScrolling, scrollTop }) => (
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
        )}
      </WindowScroller>
      {isFetchingNextPage && onLoaderRenderer}
    </>
  );
}

InfiniteList.displayName = InfiniteList;
