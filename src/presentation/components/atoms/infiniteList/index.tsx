import { ComponentType, useCallback, useMemo } from 'react';
import {
  AutoSizer,
  Index,
  InfiniteLoader,
  List,
  ListRowProps,
  WindowScroller,
} from 'react-virtualized';

import { DefaultLoader } from '../loader';

export interface InfiniteListRowType<T> {
  rowIndex: number;
  style: React.CSSProperties;
  item: T;
}

export interface InfiniteListProps<T> {
  data: T[];
  emptyComponent?: ComponentType;
  rowComponent: ComponentType<InfiniteListRowType<T>>;
  overscanRowCount?: number;
  rowHeight?: number;
  // for react-query
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<any>;
  bottomLoaderComponent?: ComponentType;
}

export function InfiniteList<T>({
  data,
  emptyComponent: EmptyComponent,
  rowComponent: RowComponent,
  overscanRowCount = 10,
  rowHeight = 100,
  // for react-query
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  bottomLoaderComponent: BottomLoaderComponent,
}: InfiniteListProps<T>): JSX.Element {
  // 1. include loader height within the list with +1
  const rowCount = useMemo(() => {
    return hasNextPage ? data.length + 1 : data.length;
  }, [data, hasNextPage]);

  // 2. render empty
  const noRowsRenderer = useCallback((): JSX.Element => {
    if (EmptyComponent) {
      return <EmptyComponent />;
    }
    return <p>no data</p>;
  }, [EmptyComponent]);

  // 3. render bottom loader
  const bottomLoaderRenderer = useCallback(() => {
    if (BottomLoaderComponent) {
      return <BottomLoaderComponent />;
    }
    return <DefaultLoader />;
  }, [BottomLoaderComponent]);

  // 3. render row or loader
  const rowRenderer = useCallback(
    (props: ListRowProps): JSX.Element => {
      if (data[props.index] === undefined) {
        return bottomLoaderRenderer();
      }
      return (
        <RowComponent
          key={props.key}
          rowIndex={props.index}
          style={props.style}
          item={data[props.index]}
        />
      );
    },
    [data],
  );

  // 3. load more
  const loadMoreRows = useCallback((): Promise<any> => {
    if (hasNextPage && !isFetchingNextPage) {
      return fetchNextPage();
    }
    return () => {};
  }, [hasNextPage, isFetchingNextPage]);

  // 4. check if row is rendered
  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => {
      // NOTE:: https://github.com/bvaughn/react-virtualized/blob/master/docs/creatingAnInfiniteLoadingList.md
      // return !hasNextPage || index < data.length;
      return !!data[index];
    },
    [data],
  );

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={rowCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  ref={registerChild}
                  autoHeight
                  height={height}
                  width={width}
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                  onScroll={onChildScroll}
                  noRowsRenderer={noRowsRenderer}
                  onRowsRendered={onRowsRendered}
                  rowRenderer={rowRenderer}
                  overscanRowCount={overscanRowCount}
                  rowHeight={rowHeight}
                  rowCount={rowCount}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
    </WindowScroller>
  );
}
