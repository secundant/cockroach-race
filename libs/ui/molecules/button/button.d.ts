import { PropsOf, SharedHtmlAtomProps } from '../../types';
import { ReactNode } from 'react';

export interface ButtonProps
  extends SharedHtmlAtomProps,
    Pick<PropsOf<'button'>, 'onClick' | 'disabled' | 'type'> {
  size?: ButtonSize;
  children?: ReactNode;
  appearance?: ButtonAppearance;
}

export type ButtonSize = 'sm' | 'md';
export type ButtonAppearance = 'accent' | 'flat' | 'outline';
