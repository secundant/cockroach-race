import { getTabbableDescendants } from '../../lib/dom/get-tabbable-descendants';
import { isFocusableElement } from '../../lib/dom/is-focusable-element';
import { subscribeToEvent } from '../../lib/dom/subscribe-to-event';
import { RefCallback, useCallback, useEffect, useRef } from 'react';

export function useFocusTrap(active?: boolean): RefCallback<HTMLElement | null> {
  const nodeRef = useRef<HTMLElement | null>(null);

  const handleRef = useCallback(
    (node: HTMLElement | null) => {
      if (!active) return;
      nodeRef.current = node || null;
      if (node) {
        setTimeout(() => {
          if (node.ownerDocument) {
            applyInitialFocus(node);
          } else if (process.env.NODE_ENV === 'development') {
            console.warn('Ref node is not part of the dom', node);
          }
        });
      }
    },
    [active]
  );

  useEffect(() => {
    if (!active) return;
    return subscribeToEvent(document, 'keydown', event => {
      if (event.key === 'Tab' && nodeRef.current) {
        applyTabFocus(nodeRef.current, event);
      }
    });
  }, [active]);

  return handleRef;
}

function applyInitialFocus(node: HTMLElement) {
  const autoFocus = node.querySelector('[data-autofocus]');
  const firstTabbable = getTabbableDescendants(node)[0];
  const elementToFocus = autoFocus || firstTabbable || node;

  if (isFocusableElement(elementToFocus)) {
    elementToFocus.focus();
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('Failed to find focusable element within provided node', node);
  }
}

function applyTabFocus(node: HTMLElement, event: KeyboardEvent) {
  const tabbable = getTabbableDescendants(node);

  if (!tabbable.length) {
    event.preventDefault();
    return;
  }
  const sentinelStart = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  const sentinelEnd = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  const leaving = sentinelEnd === document.activeElement || node === document.activeElement;

  if (leaving && sentinelStart) {
    event.preventDefault();
    (sentinelStart as HTMLElement).focus();
  }
}
