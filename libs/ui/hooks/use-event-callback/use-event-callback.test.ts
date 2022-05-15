import { useEventCallback } from './use-event-callback';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-event-callback', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useEventCallback());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useEventCallback({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
