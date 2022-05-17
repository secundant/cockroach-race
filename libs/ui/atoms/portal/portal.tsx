import { useForkChildrenRef, useUniversalLayoutEffect } from '../../hooks';
import { setRef } from '../../hooks/use-fork-ref';
import type { PortalProps } from './portal.d';
import { cloneElement, forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal = forwardRef(({ children, targetNode, disablePortal }: PortalProps, ref) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const forkRef = useForkChildrenRef(children, ref);

  useUniversalLayoutEffect(() => {
    if (!disablePortal) {
      setMountNode(targetNode ?? document.body);
    }
  }, [targetNode, disablePortal]);

  useUniversalLayoutEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => setRef(ref, null);
    }
    return void 0;
  }, [mountNode, disablePortal]);

  if (disablePortal) {
    return cloneElement(children, {
      ref: forkRef
    });
  }
  return mountNode ? createPortal(children, mountNode) : mountNode;
});
