import { SharedHtmlAtomProps } from '../../types';
import { SpriteIconName } from './sprite.meta';
import { SVGProps } from 'react';

export interface IconProps
  extends Pick<SVGProps<SVGSVGElement>, 'viewBox' | 'style'>,
    SharedHtmlAtomProps {
  name: SpriteIconName;
  fileName?: string;
}
