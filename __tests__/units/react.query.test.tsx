import { useBaseQuery } from '@application/hooks/api/base/use_base_query';
import { requestGet } from '@infrastructure/network';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import nock from 'nock';

// ref: https://tanstack.com/query/latest/docs/framework/react/guides/testing#testing-network-calls
// TODO:: testing useBaseQuery, useBaseMutation
// TODO:: change axios to firestore ?
// NOTE:: 확장자가 tsx여야 jsx 문법을 인식하고 처리할 수 있음
const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
function useTestHook() {
  const { data, isError, isFetching, isLoading } = useBaseQuery({
    queryKey: ['test'],
    queryFn: () => requestGet('/todos/1'),
  });

  return { data, isError, isFetching, isLoading };
}

describe('[react-query]', () => {
  test('mocking data를 주입하여 200일 때, useBaseQuery가 올바른 data를 리턴하는지 확인', async () => {
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
