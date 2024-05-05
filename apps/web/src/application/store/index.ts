import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper-future';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { bookmarkName, bookmarkReducer } from './bookmark/slice';
import { bottomSheetName, bottomSheetReducer } from './bottomSheet/slice';
import { locationName, locationReducer } from './locationPosition/slice';
import { shopFilterName, shopFilterReducer } from './shopFilter/slice';

// MARK: Store 정의
const rootReducer = combineReducers({
  [shopFilterName]: shopFilterReducer,
  [locationName]: locationReducer,
  [bottomSheetName]: bottomSheetReducer,
  [bookmarkName]: bookmarkReducer,
});

/* eslint-disable */
const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log(`액션: ${JSON.stringify(action)}`);
  const result = next(action);
  console.log(`업데이트됨: ${JSON.stringify(store.getState())}`);

  return result;
};
/* eslint-enable */

// NOTE:: redux-persist 정의
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [bookmarkName],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => {
    const options = {
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    };
    if (process.env.NODE_ENV === 'development') {
      return getDefaultMiddleware(options).concat(loggerMiddleware);
    }
    return getDefaultMiddleware(options);
  },
});

export const persistor = persistStore(store);

const makeStore = () => store;

// MARK: Store type 정의
type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// SSR를위한 Redux Wrapper 생성
export const wrapper = createWrapper<AppStore>(makeStore);
