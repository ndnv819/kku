import { instance, requestGet } from '@infrastructure/axios';
import MockAdapter from 'axios-mock-adapter';

interface GetTest {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

describe('[Network]', () => {
  // global
  let mock: MockAdapter;

  // beforeAll, describe, afterAll 순서 보장 가능
  beforeAll(() => {
    mock = new MockAdapter(instance);
  });

  // nested describe
  describe('[Network] 1. request get', () => {
    // mocking
    test('Get 데이터 받아오기', async () => {
      // 내가 원하는 res값 생성
      const data: GetTest = {
        userId: 1,
        id: 1,
        title: 'title',
        completed: false,
      };
      // 가상의 get
      mock.onGet('/todos/1').reply(200, data);
      //
      const res = await requestGet('/todos/1');
      expect(res).toEqual(data);
    });
  });

  // mocking test가 끝나면 메모리에서 빠져야 하니까 restore
  afterAll(() => {
    mock.restore();
  });

  // TODO:: post, put ,delete 추가
  // TODO:: fresh하게 갈려면 beforeEach, afterEach 사용
});
