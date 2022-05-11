import type { SvgIconProps } from './svg-icon.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const SvgIcon = forwardRef(
  (
    {
      titleAccess,
      color,
      fontSize,
      htmlColor,
      className,
      children,
      style,
      viewBox,
      testId,
      ...props
    }: SvgIconProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    return (
      <svg
        className={clsx(
          'select-none transition-[fill] fill-current w-[1em] h-[1em] inline-block text-inherit',
          className
        )}
        data-testid={testId}
        ref={ref}
        viewBox={viewBox}
        focusable="false"
        color={htmlColor}
        aria-hidden={titleAccess ? undefined : true}
        role={titleAccess ? 'img' : undefined}
        {...props}
        style={{
          ...style,
          ...(fontSize ? { fontSize } : {}),
          ...(color ? { color } : {})
        }}
      >
        {children}
        {titleAccess && <title>{titleAccess}</title>}
      </svg>
    );
  }
);
