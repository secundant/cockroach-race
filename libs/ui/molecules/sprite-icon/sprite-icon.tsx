import { SvgIcon } from '../../atoms';
import type { SpriteIconProps } from './sprite-icon.d';
import { ForwardedRef, forwardRef } from 'react';

export const SpriteIcon = forwardRef(
  (
    { name, fileName = '/sprite.svg', testId = `sprite-icon-${name}`, ...props }: SpriteIconProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    return (
      <SvgIcon ref={ref} testId={testId} {...props}>
        <use xlinkHref={`${fileName}#${name}`} />
      </SvgIcon>
    );
  }
);
