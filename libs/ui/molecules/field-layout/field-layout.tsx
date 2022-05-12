import type { FieldLayoutProps } from './field-layout.d';
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
        <label id={htmlFor && `${htmlFor}-label`} htmlFor={htmlFor} className="block text-lg mb-3">
          {label}
        </label>
        {children}
        <div className="mt-2 h-5 text-xs">{description}</div>
      </div>
    );
  }
);
