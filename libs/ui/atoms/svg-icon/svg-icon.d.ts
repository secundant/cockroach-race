import { ISharedHtmlAtomProps } from '../../types';
import { SVGProps } from 'react';

export interface SvgIconProps
  extends Pick<SVGProps<SVGSVGElement>, 'viewBox' | 'className' | 'children' | 'style'>,
    ISharedHtmlAtomProps {
  titleAccess?: string;
  htmlColor?: string;
  fontSize?: string | number;
  color?: string; // TODO
}
