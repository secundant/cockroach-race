import { PropsOf, SharedHtmlAtomProps } from '../../types';
import { ReactNode } from 'react';

export interface ListBoxItemProps
  extends SharedHtmlAtomProps,
    Pick<PropsOf<'button'>, 'onClick' | 'onMouseDown' | 'onMouseEnter'> {
  active?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}
