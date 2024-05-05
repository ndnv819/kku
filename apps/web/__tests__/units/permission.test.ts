import { usePermission } from '@application/hooks/common/use_permission';
import { renderHook, waitFor } from '@testing-library/react';

describe('[Hooks] usePermission', () => {
  const mockQuery = jest.fn();

  beforeAll(() => {
    // @ts-ignore
    // noinspection JSConstantReassignment
    global.navigator.permissions = { query: mockQuery };
  });

  test('navigator.permissions가 존재하고 사용자가 승인할 시 permissionStatus는 granted', async () => {
    mockQuery.mockResolvedValue({ state: 'granted', onchange: jest.fn() });

    const { result } = renderHook(() => usePermission('geolocation'));

    await waitFor(() =>
      expect(result.current.permissionStatus).toBe('granted'),
    );
  });

  test('navigator.permissions가 존재하고 사용자가 거부할 시 permissionStatus는 denied', async () => {
    mockQuery.mockResolvedValue({ state: 'denied', onchange: jest.fn() });

    const { result } = renderHook(() => usePermission('geolocation'));

    await waitFor(() => expect(result.current.permissionStatus).toBe('denied'));
  });

  test('navigator.permissions가 존재하지 않을경우 permissionStatus는 unsupported', async () => {
    // @ts-ignore
    // noinspection JSConstantReassignment
    delete global.navigator.permissions;

    const { result } = renderHook(() => usePermission('geolocation'));

    await waitFor(() =>
      expect(result.current.permissionStatus).toBe('unsupported'),
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
