import { Icon, ListItem } from '../../atoms';
import { useEventCallback } from '../../hooks';
import { Popover } from '../../molecules';
import type { SelectProps, SelectValue } from './select.d';
import clsx from 'clsx';
import React, { ForwardedRef, forwardRef, useMemo, useRef, useState } from 'react';

export const Select = forwardRef(
  (
    {
      className,
      testId,
      data,
      value,
      onChange,
      onFocus,
      onBlur,
      disabled,
      invalid,
      ...props
    }: SelectProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const optionByValue = useMemo(
      () => Object.fromEntries(data.map(option => [option.value, option])),
      [data]
    );

    const expanded = !disabled && open;
    const selected = value ? optionByValue[value] : null;

    const handleFocus = useEventCallback((e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      setFocused(true);
    });
    const handleBlur = useEventCallback((e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setFocused(false);
    });
    const handleClick = useEventCallback(() => setOpen(true));
    const handleKeyDown = useEventCallback((e: React.KeyboardEvent) => {
      if ((!disabled && e.key === 'ArrowDown') || e.key === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
        setOpen(true);
      }
    });

    const handleSelect = useEventCallback((selectedValue: SelectValue) => {
      if (!disabled && selectedValue !== selected?.value) {
        onChange?.(selectedValue);
        setOpen(false);
      }
    });

    return (
      <>
        <div
          role="combobox"
          ref={rootRef}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          data-testid={testId}
          data-invalid={invalid}
          data-disabled={disabled}
          className={clsx(
            'input-base flex overflow-hidden h-13 text-sm items-center',
            (expanded || focused) && 'input-focused',
            className
          )}
        >
          <input
            ref={ref}
            className="flex-1 outline-none"
            readOnly
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue={selected?.label}
            {...props}
          />
          <Icon
            name="arrow-up"
            className={clsx(
              'flex items-center justify-center w-8 h-8 p-2.5 mx-2',
              'rounded-full cursor-pointer transition-colors bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-400',
              !expanded ? '-scale-100' : ''
            )}
          />
        </div>
        <Popover
          open={expanded}
          anchorNode={rootRef.current}
          onClose={() => setOpen(false)}
          className="border border-black p-2 space-y-2"
          style={
            rootRef.current
              ? {
                  width: rootRef.current.clientWidth
                }
              : {}
          }
        >
          {data.map(item => (
            <ListItem
              key={item.value}
              onClick={() => handleSelect(item.value)}
              selected={item === selected}
            >
              {item.label}
            </ListItem>
          ))}
        </Popover>
      </>
    );
  }
);
