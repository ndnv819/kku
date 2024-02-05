// integration test: mocking 없이 library를 직접 사용해서 테스트함
import { store } from '@application/store/index';
import { bokjiFilterActions } from '@application/store/shopFilter/slice';

describe('[shopFilter]', () => {
  // NOTE:: test가 실제로 어떻게 동작하는지 로직에 대해 상세히 입력
  test('reducer 중 changeType을 실행했을 때, 값이 제대로 변경되는지 확인', () => {
    // dispatch: store의 action을 발생시킴, store는 reducer 함수를 실행시켜서 해당 action을 처리함
    store.dispatch(bokjiFilterActions.changeType('식당'));
    // expect에서 store 값 가져와서 제대로 바뀌었는지 확인
    expect(store.getState().shop_filter.type).toBe('식당');
  });

  test('reducer 중 clear를 실행했을 때, 값이 제대로 변경되는지 확인', () => {
    store.dispatch(bokjiFilterActions.clear());

    expect(store.getState().shop_filter.type).toBe('전체');
  });
});
