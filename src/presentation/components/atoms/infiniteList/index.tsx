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
  const rowCount = useMemo(() => {
    return hasNextPage ? data.length + 1 : data.length;
  }, [data, hasNextPage]);

  const noRowsRenderer = useCallback((): JSX.Element => {
    if (EmptyComponent) {
      return <EmptyComponent />;
    }
    return <p>no data</p>;
  }, [EmptyComponent]);

  // NOTE:: ListRowProps을 loader component에게도 전달해줘야 List 내부에서 위치를 잡을 수 있음
  const bottomLoaderRenderer = useCallback(
    (props: ListRowProps): JSX.Element => {
      if (BottomLoaderComponent) {
        return (
          <div key={props.key} style={{ ...props.style }}>
            <BottomLoaderComponent />
          </div>
        );
      }
      return (
        <DefaultLoader
          key={props.key}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...props.style,
          }}
        />
      );
    },
    [BottomLoaderComponent, data],
  );

  const rowRenderer = useCallback(
    (props: ListRowProps): JSX.Element => {
      if (data[props.index] === undefined) {
        return bottomLoaderRenderer(props);
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

  const loadMoreRows = useCallback((): Promise<any> => {
    if (hasNextPage && !isFetchingNextPage) {
      return fetchNextPage();
    }
    return () => {};
  }, [hasNextPage, isFetchingNextPage]);

  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => {
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
