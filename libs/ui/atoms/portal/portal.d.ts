import { ReactElement } from 'react';

export interface PortalProps {
  disablePortal?: boolean;
  targetNode?: HTMLElement | null;
  children: ReactElement;
}
