import { useGeolocation } from '@application/hooks/location';
import { act, renderHook } from '@testing-library/react';

describe('[Hooks] useGeolocation', () => {
  // 윈도우 환경이 아니기 때문에 관련 메서드나 함수를 테스트 전에 직접 mock으로 만듦
  const mockGeolocation = {
    clearWatch: jest.fn(),
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  };

  beforeAll(() => {
    // @ts-ignore
    navigator.geolocation = mockGeolocation;
  });

  // 1. default 확인
  test('defalut value를 반환한다', () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.location.isLoading).toBe(false);
    expect(result.current.location.data).toBe(undefined);
    expect(result.current.location.error).toBe(undefined);
  });

  // 2-1. mock data 생성해서 값 변경
  test('location의 coords 객체 값만 변경', () => {
    const mockPosition = { coords: { latitude: 1, longitude: 2 } };
    mockGeolocation.getCurrentPosition.mockImplementation((callback) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      callback(mockPosition);
    });
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getCurrentPosition();
    });

    expect(result.current.location.data?.coords.latitude).toBe(1);
    expect(result.current.location.data?.coords.longitude).toBe(2);
  });

  // 2-2. mock data 생성해서 값 변경
  test('location의 errorMessage 값만 있고 isLoading는 false, coords는 undefined로 변경', () => {
    const errorMessage = 'denied geolocation';
    // getCurrentPosition의 스펙에 맞춰 콜백 함수 작성
    mockGeolocation.getCurrentPosition.mockImplementation(
      (successCallback, errorCallback) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        errorCallback(errorMessage);
      },
    );
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getCurrentPosition();
    });

    expect(result.current.location.error).toBe(errorMessage);
    expect(result.current.location.isLoading).toBe(false);
    expect(result.current.location.data).toBe(undefined);
  });
});
