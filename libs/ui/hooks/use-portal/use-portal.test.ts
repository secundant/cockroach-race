import { usePortal } from './use-portal';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-portal', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => usePortal());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => usePortal({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
