import type { ListBoxItemProps } from './list-box-item.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const ListBoxItem = forwardRef(
  (
    { children, className, testId, active, selected, disabled, ...props }: ListBoxItemProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        role="option"
        data-testid={testId}
        aria-disabled={disabled}
        aria-selected={selected}
        tabIndex={-1}
        className={clsx(
          'px-8 py-4 text-left rounded-lg button-base w-full justify-items-stretch',
          disabled
            ? 'cursor-default text-gray-400'
            : [
                'cursor-pointer text-black',
                selected
                  ? 'bg-accent-200 outline-none'
                  : [
                      active
                        ? 'bg-accent-200 outline-none'
                        : 'touchable bg-white hover:bg-gray-100 active:bg-gray-300 focus:bg-gray-300 focus-visible:focus-ring'
                    ]
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
