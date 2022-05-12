import { SharedHtmlAtomProps } from '../../types';
import { SVGProps } from 'react';

export interface SvgIconProps
  extends Pick<SVGProps<SVGSVGElement>, 'viewBox' | 'className' | 'children' | 'style'>,
    SharedHtmlAtomProps {
  titleAccess?: string;
  htmlColor?: string;
  fontSize?: string | number;
  color?: string; // TODO
}
