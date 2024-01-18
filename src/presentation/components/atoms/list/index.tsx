import { List } from 'react-virtualized';

interface ListProps {
  width?: number;
  listHeight?: number;
  overscanRowCount: number;
  onRowsRendered: () => void;
  rowCount?: number;
  rowHeight?: number;
  rowRenderer: () => React.ReactNode;
}

export const ListContainer = ({
  width = 50,
  listHeight = 50,
  overscanRowCount = 10,
  onRowsRendered,
  rowCount = 5,
  rowHeight = 50,
  rowRenderer,
}: ListProps) => {
  return (
    <List
      width={width} // 전체 크기
      height={listHeight} // 전체 높이
      overscanRowCount={overscanRowCount}
      onRowsRendered={onRowsRendered}
      rowCount={rowCount} // 항목 개수
      rowHeight={rowHeight} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
    />
  );
};

ListContainer.displayName = ListContainer;
