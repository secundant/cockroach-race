import { SharedHtmlAtomProps } from '../../types';
import React from 'react';

export interface OverlayInvisibleProps extends SharedHtmlAtomProps {
  open: boolean;
  onClick(event: React.MouseEvent): void;
}
