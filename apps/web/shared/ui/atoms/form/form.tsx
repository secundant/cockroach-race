import type { FormProps } from './form.d';
import { FormProvider } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';

export function Form<TFieldValues extends FieldValues>({
  children,
  id,
  testId = id && `form-${id}`,
  form,
  onSubmit,
  onError,
  ...props
}: FormProps<TFieldValues>) {
  return (
    <form data-testid={testId} onSubmit={form.handleSubmit(onSubmit, onError)} {...props}>
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
