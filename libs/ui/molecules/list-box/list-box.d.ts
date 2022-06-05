import { ListBoxItemProps } from '../../atoms';
import { SharedHtmlAtomProps } from '../../types';
import { FC, ReactNode, RefAttributes } from 'react';

export interface ListBoxProps<Value extends ListBoxValue> extends SharedHtmlAtomProps {
  id: string;
  data: Array<ListBoxItem<Value>>;
  active?: Value;
  selected?: Value[];
  disabled?: boolean;
  children?: ReactNode;
  ItemComponent?: FC<ListBoxItemProps & RefAttributes<any>>;

  onItemHover?(item: ListBoxItem<Value>, index: number): void;
  onItemSelect?(item: ListBoxItem<Value>, index: number): void;
}

export interface ListBoxItem<Value extends ListBoxValue> {
  value: Value;
  label?: ReactNode;
  disabled?: boolean;
}

export type ListBoxValue = string | number;
