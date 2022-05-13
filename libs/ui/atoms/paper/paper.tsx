import type { PaperProps } from './paper.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const Paper = forwardRef(
  ({ children, className, testId, ...props }: PaperProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        data-testid={testId}
        className={clsx('bg-white rounded-2xl shadow', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
