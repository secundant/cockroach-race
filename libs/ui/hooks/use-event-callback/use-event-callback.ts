import useUniversalLayoutEffect from '../use-universal-layout-effect';
import { UseEventCallbackParams, UseEventCallbackResult } from './use-event-callback.d';
import { useCallback, useRef } from 'react';

/**
 * Callback for user events without any revalidation
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export function useEventCallback<Args extends unknown[], Return>(
  fn: UseEventCallbackParams<Args, Return>
): UseEventCallbackResult<Args, Return> {
  const ref = useRef(fn);

  useUniversalLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: Args) => ref.current!(...args), []);
}
