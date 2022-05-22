import type { OverlayInvisibleProps } from './overlay-invisible.d';
import clsx from 'clsx';
import { FC } from 'react';

export const OverlayInvisible: FC<OverlayInvisibleProps> = ({
  open,
  className,
  testId,
  ...props
}) =>
  open ? (
    <div data-testid={testId} className={clsx('overlay bg-transparent', className)} {...props} />
  ) : null;
