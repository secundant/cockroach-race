import { SharedHtmlAtomProps } from '../../types';
import React from 'react';

export interface OverlayBlurProps extends SharedHtmlAtomProps {
  open?: boolean;
  onClick?(event: React.MouseEvent): void;
}
