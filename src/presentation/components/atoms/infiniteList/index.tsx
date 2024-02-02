import { ComponentType, CSSProperties, useCallback, useMemo } from 'react';
import {
  AutoSizer,
  Index,
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
  rowComponent: ComponentType<ListTypeProps<T>>;
  emptyComponent?: ComponentType;
  overscanRowCount?: number;
  // for react-query
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<any>;
  bottomLoaderComponent?: ComponentType;
}

export function InfiniteList<T>({
  data,
  totalElements, // 추가하면 좋은 속성
  rowHeight = 100,
  rowComponent: RowComponent,
  emptyComponent: EmptyComponent,
  overscanRowCount = 0,
  // for react-query
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  bottomLoaderComponent: BottomLoaderComponent,
}: InfiniteListProps<T>) {
  const rowCount = useMemo(() => {
    return hasNextPage ? data.length + 1 : data.length;
  }, [data, hasNextPage]);

  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => {
      return !!data[index];
    },
    [data],
  );

  const onBottomLoaderRenderer = useCallback((): JSX.Element => {
    if (BottomLoaderComponent) {
      return <BottomLoaderComponent />;
    }
    return <DefaultLoader />;
  }, [BottomLoaderComponent]);

  const onRowRenderer = useCallback(
    (props: ListRowProps): JSX.Element => {
      if (data[props.index] === undefined) {
        return onBottomLoaderRenderer();
      }
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

  // eslint-disable-next-line consistent-return
  const loadMoreRows = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      return fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage]);

  const onEmptyRenderer = useCallback((): JSX.Element => {
    if (EmptyComponent) {
      return <EmptyComponent />;
    }
    return <EmptyView />;
  }, [EmptyComponent]);

  return (
    <WindowScroller>
      {({ height, isScrolling, scrollTop, onChildScroll }) => (
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
  );
}

InfiniteList.displayName = InfiniteList;
