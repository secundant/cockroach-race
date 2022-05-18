import type { ListItemProps } from './list-item.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const ListItem = forwardRef(
  (
    { children, className, testId, selected, autoFocus, disabled, ...props }: ListItemProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        role="listitem"
        data-testid={testId}
        data-autofocus={autoFocus}
        aria-disabled={disabled}
        aria-selected={selected}
        tabIndex={disabled || selected ? -1 : 0}
        className={clsx(
          'px-8 py-4 text-left rounded-lg button-base w-full justify-items-stretch',
          disabled || selected ? 'cursor-default' : 'cursor-pointer',
          disabled
            ? 'text-gray-400'
            : [
                'text-black',
                selected
                  ? 'bg-accent-200 outline-none'
                  : 'touchable bg-white hover:bg-gray-100 active:bg-gray-300 focus:bg-gray-300 focus-visible:focus-ring'
              ],
          className
        )}
        {...props}
      >
        <div className="w-full">{children}</div>
      </button>
    );
  }
);
