import { useUniversalLayoutEffect } from './use-universal-layout-effect';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-universal-layout-effect', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useUniversalLayoutEffect());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useUniversalLayoutEffect({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
