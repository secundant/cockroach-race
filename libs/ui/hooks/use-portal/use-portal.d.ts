import { ReactElement, ReactPortal, Ref } from 'react';

export interface UsePortalParams {
  targetNode?: HTMLElement | null;
  children: ReactElement;
  ref?: Ref<any>;
}

export type UsePortalResult = ReactPortal | null;
