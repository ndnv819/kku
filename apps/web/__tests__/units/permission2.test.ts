import { usePermission } from '@application/hooks/common/use_permission2';
import { renderHook, waitFor } from '@testing-library/react';

describe('[Hooks] usePermissions', () => {
  // 윈도우 환경 mocking
  const mockQuery = jest.fn();

  beforeAll(() => {
    // @ts-ignore
    navigator.permissions = { query: mockQuery };
  });

  test('사용자가 위치 권한을 거절한 경우', async () => {
    mockQuery.mockResolvedValue({ state: 'denied' });

    const { result } = renderHook(() => usePermission('geolocation'));

    // useEffect는 비동기로 작동하기 때문에 순서를 보장하기 위해서 await WaitFor 사용
    await waitFor(() => {
      expect(result.current.permissionState).toBe('denied');
    });
  });

  test('오류났을 때', async () => {
    mockQuery.mockRejectedValue(new Error('Async error'));

    const { result } = renderHook(() => usePermission('geolocation'));

    // useEffect는 비동기로 작동하기 때문에 순서를 보장하기 위해서 await WaitFor 사용
    await waitFor(() => {
      expect(result.current.permissionState).toBe('error');
    });
  });
});
