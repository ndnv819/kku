import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper-future';

import { LocationName, LocationReducer } from './location/slice';
import { shopFilterName, shopFilterReducer } from './shopFilter/slice';

// MARK: Store 정의
const rootReducer = combineReducers({
  [shopFilterName]: shopFilterReducer,
  [LocationName]: LocationReducer,
});

// NOTE: test할 때는 export 추가
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
const makeStore = () => store;

// MARK: Store type 정의
type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// SSR를위한 Redux Wrapper 생성
export const wrapper = createWrapper<AppStore>(makeStore);
