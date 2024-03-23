/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper-future';

import { StoreEnumZod } from '../constants';
import type { LocationActionType, LocationState } from './types';

const initialState: LocationState = {};

const locationSlice = createSlice({
  name: StoreEnumZod.Enum.location,
  initialState,
  reducers: {
    setLocation: (
      state: LocationState,
      action: PayloadAction<LocationActionType>,
    ) => {
      state.lat = action.payload?.lat;
      state.lng = action.payload?.lng;
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
        ...action.payload[StoreEnum.LOCATION],
      };
    });
  },
});

export const locationActions = locationSlice.actions;
export const locationName = locationSlice.name;
export const locationReducer = locationSlice.reducer;
