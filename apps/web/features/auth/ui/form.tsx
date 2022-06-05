import * as model from '../model';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from 'ui/molecules';
import { PropsOf } from 'ui/types';
import { Form } from '@/shared/ui/atoms';
import { Field } from '@/shared/ui/molecules';

export const AuthForm = memo(({ className }: Pick<PropsOf<'form'>, 'className'>) => {
  const { t } = useTranslation('auth');
  const form = useForm({
    defaultValues: {
      name: '',
      password: ''
    }
  });

  return (
    <Form
      form={form}
      onSubmit={model.logInFx}
      className={clsx('space-y-4 block', className)}
      autoComplete="off"
    >
      <Field t={t} name="name" required minLength={2}>
        <Input className="w-full" />
      </Field>

      <Field t={t} name="password" required minLength={2}>
        <Input type="password" className="w-full" />
      </Field>

      <Button
        type="submit"
        appearance="accent"
        className="mx-auto"
        disabled={form.formState.isSubmitting}
      >
        {t('submit')}
      </Button>
    </Form>
  );
});
