import useTranslation from 'next-translate/useTranslation';
import { Paper } from 'ui/atoms';

import { AuthForm } from '@/features/auth';
import { ChangeLanguageButton } from '@/features/change-language';

export default function AuthorizePage() {
  const { t } = useTranslation('auth');

  return (
    <div className="min-h-screen bg-accent-500 px-4 md:px-10 py-12 flex flex-col">
      <div className="flex justify-end mb-4 flex-grow-0">
        <ChangeLanguageButton />
      </div>
      <Paper className="flex flex-col justify-center items-center flex-1 p-4">
        <h1 className="text-xl mb-10 text-center">{t('title')}</h1>
        <AuthForm className="w-72 max-w-full" />
      </Paper>
    </div>
  );
}
