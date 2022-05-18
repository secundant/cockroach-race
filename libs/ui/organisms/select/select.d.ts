import { PropsOf, SharedHtmlAtomProps } from '../../types';

export interface SelectProps
  extends SharedHtmlAtomProps,
    Pick<
      PropsOf<'input'>,
      'name' | 'disabled' | 'placeholder' | 'autoComplete' | 'onBlur' | 'onFocus'
    > {
  data: SelectOption[];
  value?: SelectValue;
  invalid?: boolean;
  onChange?(value: SelectValue): void;
}

export interface SelectOption {
  value: SelectValue;
  label: string;
  disabled?: boolean;
}

export type SelectValue = string | number;
