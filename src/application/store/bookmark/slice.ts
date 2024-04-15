/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper-future';

// 1. initial state 2. createSlice
import { StoreEnumZod } from '../constants';
import type { BookmarkActionType, BookmarkState } from './types';

const initialState: BookmarkState = {
  bookmarkList: [],
};

const bookmarkSlice = createSlice({
  name: StoreEnumZod.Enum.bookmark,
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<BookmarkActionType>) => {
      const isBookmarked = state.bookmarkList.find(
        (b) => b!.id === action.payload!.id,
      );
      if (!isBookmarked) {
        state.bookmarkList.push(action.payload);
      }
    },
    deleteBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarkList = state.bookmarkList.filter(
        (b) => b!.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // @ts-ignore
        ...action.payload[StoreEnumZod.Enum.bookmark],
      };
    });
  },
});

export const bookmarkActions = bookmarkSlice.actions;
export const bookmarkName = bookmarkSlice.name;
export const bookmarkReducer = bookmarkSlice.reducer;
