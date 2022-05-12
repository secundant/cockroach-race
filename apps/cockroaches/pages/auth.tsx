import useTranslation from 'next-translate/useTranslation';
import { Paper } from 'ui/atoms';
import { Button, FieldLayout, Input } from 'ui/molecules';
import { ChangeLanguageButton } from '@/features/change-language';

export default function AuthorizePage() {
  const { t } = useTranslation('auth');

  return (
    <div className="min-h-screen bg-accent-500 px-10 py-12 flex flex-col">
      <div className="flex justify-end mb-4 flex-grow-0">
        <ChangeLanguageButton />
      </div>
      <Paper className="flex flex-col justify-center items-center flex-1">
        <h1 className="text-xl mb-10">{t('title')}</h1>
        <div className="w-72 max-w-full space-y-4">
          <FieldLayout label={t('name.label')} htmlFor="name">
            <Input id="name" placeholder={t('name.placeholder')} className="w-full" />
          </FieldLayout>
          <FieldLayout label={t('password.label')} htmlFor="password">
            <Input
              id="password"
              type="password"
              placeholder={t('password.placeholder')}
              className="w-full"
            />
          </FieldLayout>
        </div>
        <Button appearance="accent">{t('submit')}</Button>
      </Paper>
    </div>
  );
}
