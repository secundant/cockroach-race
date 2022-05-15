import type { InputProps } from './input.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(
  (
    { className, size = 'md', testId, invalid, disabled, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        data-testid={testId}
        aria-invalid={invalid}
        aria-disabled={disabled}
        disabled={disabled}
        className={clsx(
          'input-base indent-4 focus:input-focused',
          invalid && 'input-invalid',
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

const sizes = {
  sm: 'h-8 text-xs',
  md: 'h-13 text-sm'
};
