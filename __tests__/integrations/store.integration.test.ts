import type { RootState } from '@application/store';
import { store } from '@application/store';
import {
  bokjiFilterActions,
  bokjiFilterName,
} from '@application/store/shopFilter/slice';
import type { EnhancedStore } from '@reduxjs/toolkit';

describe('[Redux] Store', () => {
  let reduxStore: EnhancedStore<RootState>;

  beforeEach(() => {
    reduxStore = store;
  });

  test('상점필터의 타입을 변경할 시 특정타입을 가지는 상태로 변한다', () => {
    store.dispatch(bokjiFilterActions.changeType('카페'));
    const currentState = reduxStore.getState()[bokjiFilterName];
    expect(currentState.type).toBe('카페');
  });

  test('상점필터를 초기화할시 전체를 가진 기본상태로 변한다', () => {
    store.dispatch(bokjiFilterActions.changeType('카페'));
    store.dispatch(bokjiFilterActions.clear());
    const currentState = reduxStore.getState()[bokjiFilterName];
    expect(currentState.type).toBe('전체');
  });
});
