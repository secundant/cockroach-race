import { FieldProps } from './field.d';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import { cloneElement, memo } from 'react';
import { useController } from 'react-hook-form';
import { FieldLayout } from 'ui/molecules';

export const Field = memo(
  ({
    t,
    name,
    children,

    id = name,
    required = false,
    minLength,
    defaultValue,
    shouldUnregister
  }: FieldProps) => {
    const { t: commonT } = useTranslation('common');
    const {
      fieldState: { error },
      field
    } = useController({
      name,
      rules: {
        required: getRule('required', name, required, t, commonT),
        minLength: getRule('minLength', name, minLength, t, commonT, true)
      },
      defaultValue,
      shouldUnregister
    });
    const invalid = !!error;

    return (
      <FieldLayout
        label={t(`fields.${name}.label`)}
        htmlFor={id}
        invalid={invalid}
        required={required}
        description={error?.message}
      >
        {cloneElement(children, {
          id,
          invalid,
          placeholder: t(
            `fields.${name}.placeholder`,
            {},
            {
              fallback: commonT('form.placeholder.default')
            }
          ),
          ...field
        })}
      </FieldLayout>
    );
  }
);

const getRule = (
  rule: string,
  name: string,
  value: any | undefined,
  t: Translate,
  fallbackT: Translate,
  counter = false
) => {
  if (!value) return void 0;

  const query = counter ? { count: value } : {};

  return {
    value,
    message: t(`fields.${name}.errors.${rule}`, query, {
      fallback: fallbackT(`form.errors.${rule}`, query)
    })
  };
};
