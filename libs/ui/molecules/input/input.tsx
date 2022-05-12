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
          'transition-all rounded-lg border outline-none outline-offset-0 indent-4',
          disabled && 'border-gray-400 bg-gray-100 text-gray-400 placeholder-gray-200',
          !disabled && [
            'border-black bg-white text-black placeholder-gray-400 focus:outline-1',
            !invalid && 'border-black focus:border-accent-500 focus:outline-accent-500'
          ],
          invalid && !disabled && 'border-red-500 focus:outline-red-500',
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
