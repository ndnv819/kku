import { useTestHook } from '@application/hooks/api/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import nock from 'nock';

// NOTE:: 확장자가 tsx여야 jsx 문법을 인식하고 처리할 수 있음
// ref: https://tanstack.com/query/latest/docs/framework/react/guides/testing#testing-network-calls
const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('react-query의 useQuery', () => {
  test('useQuery', async () => {
    nock('https://jsonplaceholder.typicode.com').get('/todos/1').reply(200, {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
    const { result } = renderHook(() => useTestHook(), { wrapper });

    await waitFor(() => {
      return result.current.data;
    });

    expect(result.current.data).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    }); // undefined
  });
});
