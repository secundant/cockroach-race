import type { PaperProps } from './paper.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const Paper = forwardRef(
  (
    { children, className, testId, rounded = true, shadowed = true, ...props }: PaperProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        data-testid={testId}
        className={clsx('bg-white', rounded && 'rounded-2xl', shadowed && 'shadow', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
