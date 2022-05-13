import { useTransition } from './use-transition';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-transition', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useTransition());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useTransition({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
