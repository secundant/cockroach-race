import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form/dist/types/form';
import { PropsOf, SharedHtmlAtomProps } from 'ui/types';

export interface FormProps<TFieldValues extends FieldValues>
  extends SharedHtmlAtomProps,
    PropsOf<'form'> {
  form: UseFormReturn<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  children: NonNullable<ReactNode>;
}
