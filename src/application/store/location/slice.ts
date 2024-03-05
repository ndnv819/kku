/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper-future';

import { LocationEnumZod } from '../constants';
import type { LocationState } from './types';

const initialState: LocationState = {
  lat: undefined,
  lng: undefined,
};

const LocationSlice = createSlice({
  name: LocationEnumZod.Enum.location,
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<LocationState>) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
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

export const LocationActions = LocationSlice.actions;
export const LocationName = LocationSlice.name;
export const LocationReducer = LocationSlice.reducer;
