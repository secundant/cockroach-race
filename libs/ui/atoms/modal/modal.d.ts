import type { FunctionComponent, ReactElement } from 'react';
import React from 'react';

export interface ModalProps {
  open: boolean;
  onClose?(): void;
  children: ReactElement;
  className?: string;
  transition?: boolean;

  OverlayComponent: FunctionComponent<{ open: boolean; onClick(event: React.MouseEvent): void }>;
}
