import { useGeolocation } from '@application/hooks/common/use_geolocation';
import { act, renderHook } from '@testing-library/react';

describe('useGeolocation', () => {
  // 테스트 환경은 브라우저가 아니기때문에 geolocation이 없음 따라서, mock 객체를 만들어줌
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  };

  beforeAll(() => {
    // @ts-ignore
    // noinspection JSConstantReassignment
    global.navigator.geolocation = mockGeolocation;
  });

  test('첫 진입시 isLoading은 false 이고, data와 error는 undefined다.', () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.location).toEqual({
      isLoading: false,
      data: undefined,
      error: undefined,
    });
  });

  test('getCurrentPosition가 정상작동할 시 data값은 GeolocationPosition값이 됨', () => {
    const mockPosition = { coords: { latitude: 1, longitude: 2 } };
    mockGeolocation.getCurrentPosition.mockImplementation((callback) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      callback(mockPosition);
    });

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getCurrentPosition();
    });

    expect(result.current.location).toEqual({
      isLoading: false,
      data: mockPosition,
    });
  });

  test('getCurrentPosition시 문제가 발생하고 errorCallback 자료형이 string 이라면 error값은 errorCallback이 됨', () => {
    const erroarMsg = 'Error fetching location';
    mockGeolocation.getCurrentPosition.mockImplementation(
      (success, errorCallback) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        errorCallback(erroarMsg);
      },
    );

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getCurrentPosition();
    });

    expect(result.current.location).toEqual({
      isLoading: false,
      error: erroarMsg,
    });
  });

  test('getCurrentPosition시 문제가 발생하고 errorCallback 자료형이 Error object 이라면 error값은 errorCallback.message가 됨', () => {
    const erroarMsg = new Error('Error fetching location');
    mockGeolocation.getCurrentPosition.mockImplementation(
      (success, errorCallback) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        errorCallback(erroarMsg);
      },
    );

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getCurrentPosition();
    });

    expect(result.current.location).toEqual({
      isLoading: false,
      error: erroarMsg.message,
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
