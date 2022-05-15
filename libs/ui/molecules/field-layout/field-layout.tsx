import type { FieldLayoutProps } from './field-layout.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const FieldLayout = forwardRef(
  (
    {
      children,
      testId,
      htmlFor,
      required,
      invalid,
      label,
      description,
      ...props
    }: FieldLayoutProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} data-testid={testId} {...props}>
        <label
          id={htmlFor && `${htmlFor}-label`}
          htmlFor={htmlFor}
          className="block text-base mb-2 tracking-wide"
        >
          {label}
        </label>
        {children}
        <div className={clsx('mt-2 h-5 text-xs', invalid && 'text-red-500')}>{description}</div>
      </div>
    );
  }
);
