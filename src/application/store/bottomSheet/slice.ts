import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit/react';

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
});

export const bottomSheetActions = bottomSheetSlice.actions;
export const bottomSheetName = bottomSheetSlice.name;
export const bottomSheetReducer = bottomSheetSlice.reducer;
