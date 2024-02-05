/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper-future';

import { StoreEnumZod } from '../constants';
import type { ShopFilterState, ShopTypeEnum } from './types';

const initialState: ShopFilterState = {
  type: '전체',
};

const bokjiFilterSlice = createSlice({
  name: StoreEnumZod.Enum.shop_filter,
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<ShopTypeEnum>) => {
      state.type = action.payload;
    },
    clear: (_state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        // @ts-ignore
        ...action.payload[StoreEnum.BOKJI_FILTER],
      };
    });
  },
});

export const bokjiFilterActions = bokjiFilterSlice.actions;
export const bokjiFilterName = bokjiFilterSlice.name;
export const bokjiFilterReducer = bokjiFilterSlice.reducer;
