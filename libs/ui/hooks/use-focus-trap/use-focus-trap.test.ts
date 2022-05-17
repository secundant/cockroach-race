import { useFocusTrap } from './use-focus-trap';
import { renderHook, act } from '@testing-library/react-hooks';

describe('hooks/use-focus-trap', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useFocusTrap());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should increment counter', () => {
    const { result } = renderHook(() => useFocusTrap({ initialCount: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
