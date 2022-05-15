import type { IconProps } from './icon.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export const Icon = forwardRef(
  (
    {
      name,
      className,
      viewBox,
      testId = `sprite-icon-${name}`,
      fileName = '/sprite.svg',
      ...props
    }: IconProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => (
    <svg
      className={clsx(
        'select-none fill-current w-[1em] h-[1em] inline-block text-inherit',
        className
      )}
      data-testid={testId}
      ref={ref}
      viewBox={viewBox}
      focusable="false"
      aria-hidden={true}
      {...props}
    >
      <use xlinkHref={`${fileName}#${name}`} />
    </svg>
  )
);
