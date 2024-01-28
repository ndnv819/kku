import { useWindowSize } from '@application/hooks/common/use_window_size';
import { act, renderHook } from '@testing-library/react';

describe('[Hooks] useWindowSize', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 600,
    });
  });

  test('현재 window size(width, height)를 반환한다', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  test('resize 이후의 변화된 window size(width, height)를 반환한다', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      // noinspection JSConstantReassignment
      window.innerWidth = 1024;
      // noinspection JSConstantReassignment
      window.innerHeight = 768;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });
});
