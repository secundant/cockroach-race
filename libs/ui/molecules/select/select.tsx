import { Icon } from '../../atoms';
import { useEventCallback } from '../../hooks';
import type { SelectProps } from './select.d';
import clsx from 'clsx';
import React, { ForwardedRef, forwardRef, useMemo, useState } from 'react';

export const Select = forwardRef(
  (
    {
      className,
      testId,
      data,
      value,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      ...props
    }: SelectProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [focused, setFocused] = useState(false);
    const optionByValue = useMemo(
      () => Object.fromEntries(data.map(option => [option.value, option])),
      [data]
    );
    const handleFocus = useEventCallback((e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      setFocused(true);
    });
    const handleBlur = useEventCallback((e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setFocused(false);
    });

    return (
      <div
        role="combobox"
        ref={ref}
        data-testid={testId}
        className={clsx(
          'input-base flex overflow-hidden h-13 text-sm items-center',
          focused && 'input-focused',
          className
        )}
      >
        <input
          ref={ref}
          className="flex-1 outline-none"
          readOnly
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value && optionByValue[value as any]?.label}
          {...props}
        />
        <Icon
          name="arrow-up"
          className={clsx(
            'flex items-center justify-center w-8 h-8 p-2.5 mx-2',
            'rounded-full cursor-pointer transition-colors bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-400'
          )}
        />
      </div>
    );
  }
);
