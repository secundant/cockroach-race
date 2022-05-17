import { useScrollLock } from './use-scroll-lock';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-scroll-lock', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useScrollLock());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useScrollLock({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
