import { useWindowSize } from '@application/hooks/common/use_window_size';
import { renderHook } from '@testing-library/react-hooks';

describe('useWindowSize hook', () => {
  beforeAll(() => {
    // Mock window resize properties
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

  test('should return current window size', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  test('should update size on window resize', () => {
    const { result } = renderHook(() => useWindowSize());

    // Change window size
    window.innerWidth = 1024;
    window.innerHeight = 768;
    window.dispatchEvent(new Event('resize'));

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });
});
