import { Nil } from '../../types';
import { MutableRefObject, Ref, RefCallback, useMemo } from 'react';

export function useForkRef<Instance>(
  refA: Ref<Instance> | Nil,
  refB: Ref<Instance> | Nil
): RefCallback<Instance> | null {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => (refA || refB ? mergeTernaryRefs(refA, refB) : null), [refA, refB]);
}

export const mergeTernaryRefs =
  <T>(left: Ref<T> | Nil, right: Ref<T> | Nil): RefCallback<T> =>
  (refValue: T) => {
    setRef(left, refValue);
    setRef(right, refValue);
  };

/**
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise, make sure to cleanup the previous {ref} if it changes.
 *
 * Useful if you want to expose the ref of an inner component to the public API
 * while still using it inside the component.
 * @param ref A ref callback or ref object. If anything falsy, this is a no-op.
 * @param value Ref value
 */
export function setRef<T>(
  ref: MutableRefObject<T | null> | RefCallback<T | null> | Nil,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
