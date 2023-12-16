import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper-future';

import { bokjiFilterName, bokjiFilterReducer } from './shopFilter/slice';

// MARK: Store 정의
const rootReducer = combineReducers({
  [bokjiFilterName]: bokjiFilterReducer,
});
const store = configureStore({
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
