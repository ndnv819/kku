import { useBaseQuery } from '@application/hooks/api/base/use_base_query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
function useTestHook() {
  const { data, isError, isFetching, isLoading } = useBaseQuery({
    queryKey: ['test'],
    queryFn: jest.fn(),
  });

  console.log('useTestHook', data);

  return { data, isError, isFetching, isLoading };
}

describe('[react-query]', () => {
  test('jest.fn을 통해 useBaseQuery가 제대로 작동하는지 확인', async () => {
    const { result } = renderHook(() => useTestHook(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).; //
    });
  });
});
