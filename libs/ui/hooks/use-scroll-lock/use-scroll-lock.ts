import { getScrollWidth } from '../../lib/dom/get-scroll-width';
import { useEffect, useRef } from 'react';

export function useScrollLock(active = false) {
  const sheetRef = useRef<CSSStyleSheet | any | null>(null);

  const unlock = () => {
    if (!sheetRef.current) return;

    sheetRef.current.parentNode.removeChild(sheetRef.current);
    sheetRef.current = null;
  };
  const lock = () => {
    if (sheetRef.current) return;

    sheetRef.current = createScrollLockSheet();
  };

  useEffect(() => {
    if (active || window.document.body.style.overflow === 'hidden') {
      lock();
    } else {
      unlock();
    }
    return unlock;
  });
}

export function createScrollLockSheet() {
  const scrollWidth = getScrollWidth();
  const sheet = document.createElement('style');
  const head = document.head || document.getElementsByTagName('head')[0];

  sheet.setAttribute('type', 'text/css');
  sheet.appendChild(
    document.createTextNode(`body {
        --removed-scroll-width: ${scrollWidth}px;
        touch-action: none;
        overflow: hidden !important;
        position: relative !important;
        padding-right: var(--removed-scroll-width) !important;
    }`)
  );

  head.appendChild(sheet);
  return sheet;
}
