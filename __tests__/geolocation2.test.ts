import { useGeolocation } from '@application/hooks/location';
import { renderHook } from '@testing-library/react';

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
  test('현재 location(isLoading, coords, errorMessage)을 반환한다', () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.location.isLoading).toBe(false);
    expect(result.current.location.coords).toBe(undefined);
    expect(result.current.location.errorMessage).toBe('');
  });

  // 2. 값이 변경됐을 때 확인
  test('location의 coords 객체 값만 변경', () => {
    // mock data 생성해서 값 변경
    const mockPosition = { coords: { latitude: 1, longitude: 2 } };
    mockGeolocation.getCurrentPosition.mockImplementation((callback) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      callback(mockPosition);
    });
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.location.coords?.latitude).toBe(1);
    expect(result.current.location.coords?.longitude).toBe(2);
  });

  // 3. 값이 변경됐을 때 확인
  test('location의 errorMessage 값만 있고 isLoading는 false, coords는 undefined로 변경', () => {
    // mock data 생성해서 값 변경
    const mockPosition = {
      errorMessage: 'denied geolocation',
      isLoading: 'false',
      coords: undefined,
    };
    mockGeolocation.getCurrentPosition.mockImplementation((callback) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      callback(mockPosition);
    });
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.location.errorMessage).toBe('denied geolocation');
    expect(result.current.location.isLoading).toBe(false);
    expect(result.current.location.coords).toBe(undefined);
  });
});
