import type { OverlayBlurProps } from './overlay-blur.d';
import clsx from 'clsx';
import { FC } from 'react';

export const OverlayBlur: FC<OverlayBlurProps> = ({ open, className, testId, ...props }) =>
  open ? (
    <div
      data-testid={testId}
      className={clsx('overlay bg-black/50 backdrop-blur-sm', className)}
      {...props}
    />
  ) : null;
