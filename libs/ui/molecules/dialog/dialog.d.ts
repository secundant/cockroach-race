import { SharedHtmlAtomProps } from '../../types';
import { ReactNode } from 'react';

export interface DialogProps extends SharedHtmlAtomProps {
  open?: boolean;
  onClose?(): void;
  children: ReactNode;
}
