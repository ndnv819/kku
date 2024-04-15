/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit/react';
import { HYDRATE } from 'next-redux-wrapper-future';

import { StoreEnumZod } from '../constants';
import type { BottomSheetActionType, BottomSheetState } from './types';

// 1. define initial state
const initialState: BottomSheetState = {
  isOpened: false,
};

// 2. definte createSlice function
const bottomSheetSlice = createSlice({
  name: StoreEnumZod.Enum.bottom_sheet,
  initialState,
  reducers: {
    openBottomSheet: (state, action: PayloadAction<BottomSheetActionType>) => {
      state.isOpened = true;
      state.shop = action.payload;
    },
    closeBottomSheet: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // @ts-ignore
        ...action.payload[StoreEnumZod.Enum.bottom_sheet],
      };
    });
  },
});

export const bottomSheetActions = bottomSheetSlice.actions;
export const bottomSheetName = bottomSheetSlice.name;
export const bottomSheetReducer = bottomSheetSlice.reducer;
