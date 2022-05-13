import { useForkRef } from './use-fork-ref';
import { act, renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';

describe('hooks/use-fork-ref', () => {
  test('should merge refs', () => {
    const refA = renderHook(() => useRef(0));
    const refB = renderHook(() => useRef(1));
    const { result } = renderHook(() => useForkRef(refA.result.current, refB.result.current));

    act(() => {
      result.current!(10);
    });

    expect(refA.result.current.current).toBe(10);
    expect(refB.result.current.current).toBe(10);
  });
});
