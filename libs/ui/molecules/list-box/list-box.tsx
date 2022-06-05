import { ListBoxItem } from '../../atoms';
import { useForkRef } from '../../hooks';
import type { ListBoxProps } from './list-box.d';
import { ListBoxValue } from './list-box.d';
import clsx from 'clsx';
import React, { ForwardedRef, forwardRef, useMemo, useRef } from 'react';

export const ListBox = forwardRef(
  <Value extends ListBoxValue>(
    {
      id,
      children,
      disabled,
      className,
      testId,
      selected = [],
      active,
      data,
      ItemComponent = ListBoxItem,
      onItemHover,
      onItemSelect,
      ...props
    }: ListBoxProps<Value>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const rootRef = useRef<HTMLDivElement>();
    const rootForkRef = useForkRef(rootRef, ref);
    const elementsRef = useRef<Record<Value, HTMLElement | null>>(
      {} as Record<Value, HTMLElement | null>
    );

    const activeData = useMemo(() => data.filter(item => !item.disabled), [data]);

    const handleRefOf = (value: Value) => (node: HTMLElement | null) => {
      elementsRef.current[value] = node;
    };

    return (
      <div
        ref={rootForkRef}
        role="listbox"
        aria-orientation="vertical"
        data-testid={testId}
        className={clsx('bg-white', className)}
        tabIndex={0}
        {...props}
      >
        {data.map((item, index) => (
          <ItemComponent
            id={`${id}-${index}`}
            ref={handleRefOf(item.value)}
            key={item.value}
            disabled={disabled || item.disabled}
            selected={selected.includes(item.value)}
            onMouseEnter={() => onItemHover?.(item, index)}
            onMouseDown={
              disabled || item.disabled
                ? void 0
                : e => {
                    e.preventDefault();
                    onItemSelect?.(item, index);
                  }
            }
          >
            {item.value}
          </ItemComponent>
        ))}
      </div>
    );
  }
);
