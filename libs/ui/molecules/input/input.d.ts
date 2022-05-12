import { PropsOf, SharedHtmlAtomProps } from '../../types';

export interface InputProps
  extends SharedHtmlAtomProps,
    Pick<PropsOf<'input'>, 'value' | 'onChange' | 'disabled' | 'type' | 'name' | 'placeholder'> {
  size?: InputSize;
}

export type InputSize = 'sm' | 'md';
