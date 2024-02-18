import type { ComponentType, CSSProperties } from 'react';
import { useCallback, useMemo } from 'react';
import type { ListRowProps } from 'react-virtualized';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';

import { EmptyView } from '../emptyView';

export interface ListTypeProps<T> {
  index: number;
  item: T;
  style: CSSProperties;
}

export interface ListProps<T> {
  data: T[];
  totalElements?: number;
  rowHeight?: number;
  rowRenderer: ComponentType<ListTypeProps<T>>;
  emptyRenderer?: ComponentType;
  overscanRowCount?: number;
}

// vertical
export function VerticalList<T>({
  data,
  totalElements: _totalElements, // 추가하면 좋은 속성
  rowHeight = 100,
  rowRenderer: RowComponent,
  emptyRenderer: EmptyComponent,
  overscanRowCount = 10,
}: ListProps<T>) {
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

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              height={height}
              isScrolling={isScrolling}
              onChildScroll={onChildScroll}
              scrollTop={scrollTop}
              width={width}
              autoHeight
              rowHeight={rowHeight}
              rowCount={rowCount}
              rowRenderer={onRowRenderer}
              noRowsRenderer={onEmptyRenderer}
              overscanRowCount={overscanRowCount}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}

VerticalList.displayName = VerticalList;
