import { useRouter } from 'next/router';
import { memo } from 'react';
import { Button } from 'ui/molecules';

export const ChangeLanguageButton = memo(() => {
  const router = useRouter();

  return (
    <Button
      appearance="outline"
      onClick={() =>
        router.push(router.asPath, void 0, {
          locale: router.locale === 'ru' ? 'en' : 'ru'
        })
      }
    >
      {router.locale}
    </Button>
  );
});
