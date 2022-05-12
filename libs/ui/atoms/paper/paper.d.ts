import { SharedHtmlAtomProps } from '../../types';
import { ReactNode } from 'react';

export interface PaperProps extends SharedHtmlAtomProps {
  children?: ReactNode;
}
