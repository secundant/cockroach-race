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
      | 'autoCapitalize'
      | 'autoComplete'
      | 'autoCorrect'
      | 'autoFocus'
    > {
  size?: InputSize;
  invalid?: boolean;
}

export type InputSize = 'sm' | 'md';
