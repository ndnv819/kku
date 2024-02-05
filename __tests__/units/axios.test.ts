import {
  instance,
  requestDelete,
  requestGet,
  requestPost,
  requestPut,
} from '@infrastructure/axios';
import MockAdapter from 'axios-mock-adapter';

interface TodoType {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}

describe('[Network]', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(instance);
  });

  describe('[Request] GET', () => {
    test('mocking data를 주입해서 requestGet이 올바르게 작동하는지 확인', async () => {
      const data: TodoType = {
        userId: 1,
        id: 1,
        title: 'title',
        completed: false,
      };

      mock.onGet('/todos/1').reply(200, data);

      const res = await requestGet('/todos/1');
      expect(res).toEqual(data);
    });
  });

  describe('[Request] POST', () => {
    test('mocking data를 주입해서 requestPost가 올바르게 작동하는지 확인', async () => {
      const data: TodoType = {
        userId: 1,
        title: 'post test',
        completed: true,
      };

      mock.onPost('/todos').reply(200, data);

      const res = await requestPost('/todos', data);
      expect(res).toEqual(data);
    });
  });

  describe('[Request] PUT', () => {
    test('mocking data를 주입해서 requestPut이 올바르게 작동하는지 확인', async () => {
      const data: TodoType = {
        userId: 1,
        id: 1,
        title: 'put test',
        completed: true,
      };

      mock.onPut('/todos').reply(200, data);

      const res = await requestPut('/todos', data);
      expect(res).toEqual(data);
    });
  });

  describe('[Request] DELETE', () => {
    test('mocking data를 주입해서 requestDelete가 올바르게 작동하는지 확인', async () => {
      mock.onDelete('/todos/1').reply(200, {});

      const res = await requestDelete('/todos/1');
      expect(res).toEqual({});
    });
  });

  afterEach(() => {
    mock.restore();
  });
});
