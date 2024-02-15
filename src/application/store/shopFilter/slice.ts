/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper-future';

import { StoreEnumZod } from '../constants';
import type { ShopFilterState, ShopTypeEnum } from './types';

const initialState: ShopFilterState = {
  type: '전체',
};

const shopFilterSlice = createSlice({
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
        ...action.payload[StoreEnum.SHOP_FILTER],
      };
    });
  },
});

export const shopFilterActions = shopFilterSlice.actions;
export const shopFilterName = shopFilterSlice.name;
export const shopFilterReducer = shopFilterSlice.reducer;
