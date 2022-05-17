import { isFocusableElement } from '../../lib/dom/is-focusable-element';
import type { UseFocusReturnParams, UseFocusReturnResult } from './use-focus-return.d';
import { useEffect, useRef } from 'react';

export function useFocusReturn({ active, disabled }: UseFocusReturnParams): UseFocusReturnResult {
  const mounted = useRef(false);
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (active) {
      targetRef.current = document.activeElement ?? targetRef.current;
    } else if (!disabled) {
      const element = targetRef.current;

      if (isFocusableElement(element)) {
        element.focus();
      }
      targetRef.current = null;
    }
  }, [active]);
}
