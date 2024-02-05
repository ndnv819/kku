import { instance, requestGet } from '@infrastructure/network';
import MockAdapter from 'axios-mock-adapter';

interface GetTest {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

describe('[Infrastructure] Network', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(instance);
  });

  describe('Reqeuset Get', () => {
    test('Get 데이터 받아오기', async () => {
      const data: GetTest = {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      };
      mock.onGet('/todos/1').reply(200, data);

      const res = await requestGet<GetTest>('/todos/1');
      expect(res).toEqual(data);
    });
  });

  afterEach(() => {
    mock.restore();
  });
});
