import { PropsOf, SharedHtmlAtomProps } from '../../types';

export interface InputProps
  extends SharedHtmlAtomProps,
    Pick<
      PropsOf<'input'>,
      | 'value'
      | 'onChange'
      | 'disabled'
      | 'type'
      | 'name'
      | 'placeholder'
      | 'autoComplete'
      | 'defaultValue'
    > {
  size?: InputSize;
  invalid?: boolean;
}

export type InputSize = 'sm' | 'md';
