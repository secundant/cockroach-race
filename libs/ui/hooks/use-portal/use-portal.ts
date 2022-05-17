import { setRef } from '../use-fork-ref';
import useUniversalLayoutEffect from '../use-universal-layout-effect';
import type { UsePortalParams, UsePortalResult } from './use-portal.d';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export function usePortal({ targetNode, children, ref }: UsePortalParams): UsePortalResult {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useUniversalLayoutEffect(() => {
    const node = targetNode ?? document.body;

    setMountNode(node);
    setRef(ref, node);
    return () => setRef(ref, null);
  }, [targetNode]);

  return mountNode && createPortal(children, mountNode);
}
