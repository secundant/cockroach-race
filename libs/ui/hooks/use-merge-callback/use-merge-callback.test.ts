import { useMergeCallback } from './use-merge-callback';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-merge-callback', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useMergeCallback());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useMergeCallback({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
