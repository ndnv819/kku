import type { RootState } from '@application/store';
import { bookmarkActions } from '@application/store/bookmark/slice';
import type { BookmarkState } from '@application/store/bookmark/types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ShopDTO } from 'src/pages/api/shop/dtos';

import type { bookmarkResultType } from './types';

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
    [bookmarkState.bookmarkList],
  );

  const addBookmark = useCallback((shop: ShopDTO): void => {
    dispatch(bookmarkActions.addBookmark(shop));
  }, []);

  const deleteBookmark = useCallback((id: string): void => {
    dispatch(bookmarkActions.deleteBookmark(id));
  }, []);

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
    addBookmark,
    deleteBookmark,
  };
}
