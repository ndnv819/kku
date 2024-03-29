import type { RootState } from '@application/store';
import { bookmarkActions } from '@application/store/bookmark/slice';
import type { BookmarkState } from '@application/store/bookmark/types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import type { bookmarkResultType } from './types';

// TODO:: isBookmarked,filteredBookmarkList와 dispatch 함수 분리
// TODO:: toggleBookmark 추가
// TODO:: Hook 이름 수정
export function useBookmark(): bookmarkResultType {
  const bookmarkState: BookmarkState = useSelector<RootState, BookmarkState>(
    (state) => state.bookmark,
  );
  const dispatch = useDispatch();

  const isBookmarked = useCallback(
    (id: string): boolean => {
      if (bookmarkState.bookmarkList.some((s) => s && s.id === id)) {
        return true;
      }
      return false;
    },
    [bookmarkState],
  );

  const addBookmark = useCallback((shop: ShopDTO): void => {
    dispatch(bookmarkActions.addBookmark(shop));
  }, []);

  const deleteBookmark = useCallback((id: string): void => {
    dispatch(bookmarkActions.deleteBookmark(id));
  }, []);

  const toggleBookmark = useCallback(
    (shop: ShopDTO): void => {
      if (!shop) {
        return;
      }
      const is = isBookmarked(shop.id);
      if (!is) {
        addBookmark(shop);
        return;
      }
      deleteBookmark(shop.id);
    },
    [bookmarkState],
  );

  const filteredBookmarkList = useCallback(
    (status: boolean, category?: string): ShopDTO[] | [] => {
      if (!bookmarkState.bookmarkList) {
        return [];
      }
      if (!status && !category) {
        return bookmarkState.bookmarkList;
      }
      if (status && !category) {
        return bookmarkState.bookmarkList.filter(
          (b) =>
            b!.openingTime.split('\n')[0] === '영업 중' ||
            b!.openingTime.split('\n')[0] === '곧 영업 종료',
        );
      }
      if (status && category) {
        return bookmarkState.bookmarkList
          .filter(
            (b) =>
              b!.openingTime.split('\n')[0] === '영업 중' ||
              b!.openingTime.split('\n')[0] === '곧 영업 종료',
          )
          .filter((b2) => b2!.category === category);
      }
      if (!status && category) {
        return bookmarkState.bookmarkList.filter(
          (b) => b!.category === category,
        );
      }
      return bookmarkState.bookmarkList;
    },
    [bookmarkState.bookmarkList],
  );

  return {
    bookmarkList: bookmarkState.bookmarkList,
    filteredBookmarkList,
    isBookmarked,
    toggleBookmark,
  };
}
