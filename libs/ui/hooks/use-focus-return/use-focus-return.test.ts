import { useFocusReturn } from './use-focus-return';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-focus-return', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useFocusReturn());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useFocusReturn({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
