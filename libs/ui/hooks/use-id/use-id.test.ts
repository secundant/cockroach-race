import { useId } from './use-id';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-id', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useId());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useId({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
