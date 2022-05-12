import * as model from '../model';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FieldLayout, Input } from 'ui/molecules';
import { PropsOf } from 'ui/types';

export const AuthForm = memo(({ className }: Pick<PropsOf<'form'>, 'className'>) => {
  const { t } = useTranslation('auth');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      name: '',
      password: ''
    }
  });

  return (
    <form
      onSubmit={handleSubmit(model.logInFx)}
      className={clsx('space-y-4 block', className)}
      autoComplete="off"
    >
      <FieldLayout
        label={t('name.label')}
        htmlFor="name"
        description={errors.name?.message}
        invalid={Boolean(errors.name)}
      >
        <Input
          id="name"
          placeholder={t('name.placeholder')}
          invalid={Boolean(errors.name)}
          autoComplete="off"
          className="w-full"
          {...register('name', {
            required: t('name.errors.required'),
            minLength: {
              value: 2,
              message: t('name.errors.minLength', { count: 2 })
            }
          })}
        />
      </FieldLayout>

      <FieldLayout
        label={t('password.label')}
        htmlFor="password"
        description={errors.password?.message}
        invalid={Boolean(errors.password)}
      >
        <Input
          id="password"
          type="password"
          autoComplete="off"
          placeholder={t('password.placeholder')}
          invalid={Boolean(errors.password)}
          className="w-full"
          {...register('password', {
            required: t('password.errors.required')
          })}
        />
      </FieldLayout>

      <Button type="submit" appearance="accent" className="mx-auto" disabled={isSubmitting}>
        {t('submit')}
      </Button>
    </form>
  );
});
