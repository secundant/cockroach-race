import { PropsOf, SharedHtmlAtomProps } from '../../types';
import { ReactNode } from 'react';

export interface ListItemProps extends SharedHtmlAtomProps, Pick<PropsOf<'button'>, 'onClick'> {
  children?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  autoFocus?: boolean;
}
