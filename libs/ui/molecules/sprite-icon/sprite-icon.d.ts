import type { SvgIconProps } from '../../atoms';
import type { SpriteIconName } from './sprite.meta';

export interface SpriteIconProps extends Omit<SvgIconProps, 'children'> {
  name: SpriteIconName;
  fileName?: string;
}
