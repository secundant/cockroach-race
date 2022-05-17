import type { OverlayInvisibleProps } from './overlay-invisible.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const OverlayInvisible = forwardRef(
  (
    { className, testId, open, ...props }: OverlayInvisibleProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    if (!open) return null;
    return (
      <div
        ref={ref}
        data-testid={testId}
        className={clsx('overlay bg-transparent', className)}
        {...props}
      />
    );
  }
);
