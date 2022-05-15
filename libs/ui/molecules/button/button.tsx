import type { ButtonAppearance, ButtonProps } from './button.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const Button = forwardRef(
  (
    {
      size = 'md',
      appearance = 'accent',
      disabled,
      children,
      className,
      testId,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        role="button"
        ref={ref}
        data-testid={testId}
        disabled={disabled}
        aria-disabled={disabled}
        className={clsx(
          'button-base focus-visible:focus-ring',
          !disabled && interactive[appearance],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

const interactive: Record<ButtonAppearance, string> = {
  flat: clsx('bg-gray-200 hover:bg-gray-400 active:bg-gray-400 text-black'),
  accent: clsx('bg-accent-500 hover:bg-accent-600 active:bg-accent-600 text-white'),
  outline: clsx('text-accent-500 border border-black bg-white hover:bg-gray-100 active:bg-gray-100')
};
const sizes = {
  sm: 'h-8 text-xs px-2',
  md: 'h-12 text-lg px-6'
};
