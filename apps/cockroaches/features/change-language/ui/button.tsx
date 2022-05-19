import { useRouter } from 'next/router';
import { memo, useRef, useState } from 'react';
import { ListItem } from 'ui/atoms';
import { useEventCallback } from 'ui/hooks';
import { Button, Popover } from 'ui/molecules';

export const ChangeLanguageButton = memo(() => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const handleSelect = useEventCallback((locale: string) => {
    router.replace({ pathname: router.pathname, query: router.query }, void 0, {
      locale
    });
    setOpen(false);
  });

  return (
    <>
      <Button ref={ref} appearance="outline" onClick={() => setOpen(true)}>
        {router.locale}
      </Button>
      <Popover
        open={open}
        anchorNode={ref.current}
        onClose={() => setOpen(false)}
        className="p-2 space-y-2"
        anchorOrigin={{
          vertical: 'start',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <ListItem selected={router.locale === 'ru'} onClick={() => handleSelect('ru')}>
          Русский
        </ListItem>
        <ListItem selected={router.locale === 'en'} onClick={() => handleSelect('en')}>
          English
        </ListItem>
      </Popover>
    </>
  );
});
